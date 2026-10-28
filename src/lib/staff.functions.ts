import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { staffInputSchema, staffRoles } from "@/lib/school-management";

export const createStaffAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => staffInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed, error: permissionError } = await context.supabase.rpc("school_permission", { permission: "users" });
    if (permissionError || !allowed) throw new Error("ليس لديك صلاحية إدارة الحسابات");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({ email: data.email, password: data.password, email_confirm: true, app_metadata: { school_admin_created: true } });
    if (error || !created.user) throw new Error("تعذّر إنشاء الحساب؛ تحقق من البريد وكلمة المرور أو وجود حساب سابق.");
    const id = created.user.id;
    const { error: staffError } = await supabaseAdmin.from("staff_accounts").insert({ user_id: id, display_name: data.display_name, role: data.role });
    if (staffError) { await supabaseAdmin.auth.admin.deleteUser(id); throw new Error("تعذّر حفظ صلاحيات الحساب"); }
    if (data.role === "admin") {
      const { error: roleError } = await supabaseAdmin.from("user_roles").insert({ user_id: id, role: "admin" });
      if (roleError) { await supabaseAdmin.auth.admin.deleteUser(id); await supabaseAdmin.from("staff_accounts").delete().eq("user_id", id); throw new Error("تعذّر حفظ صلاحيات الإدارة"); }
    }
    return { success: true };
  });

export const updateStaffAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ user_id: z.string().uuid(), active: z.boolean(), role: z.enum(staffRoles) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed, error } = await context.supabase.rpc("school_permission", { permission: "users" });
    if (error || !allowed) throw new Error("ليس لديك صلاحية إدارة الحسابات");
    if (data.user_id === context.userId) throw new Error("لا يمكنك تعديل صلاحيات حسابك الحالي");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.role === "admin") {
      const { error: roleError } = await supabaseAdmin.from("user_roles").upsert({ user_id: data.user_id, role: "admin" }, { onConflict: "user_id,role" });
      if (roleError) throw new Error("تعذّر تغيير الصلاحيات");
    }
    const { error: updateError } = await supabaseAdmin.from("staff_accounts").update({ active: data.active, role: data.role }).eq("user_id", data.user_id);
    if (updateError) throw new Error("تعذّر تحديث الحساب");
    return { success: true };
  });

export const removeStaffAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ user_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed, error } = await context.supabase.rpc("school_permission", { permission: "users" });
    if (error || !allowed || data.user_id === context.userId) throw new Error("حذف هذا الحساب غير مسموح");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(data.user_id);
    if (deleteError) throw new Error("تعذّر حذف الحساب");
    await supabaseAdmin.from("staff_accounts").delete().eq("user_id", data.user_id);
    return { success: true };
  });