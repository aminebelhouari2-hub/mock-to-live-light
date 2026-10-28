import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, GraduationCap, FileText, Images, CalendarDays, Megaphone, Users, Palette, ExternalLink, LogOut, Menu, X, ArrowUpLeft, Trash2, Plus, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { canManage, roleLabels, type Permission, type StaffRole } from "@/lib/school-management";
import { AdminStudents } from "@/components/admin-students";
import { AdminEditor, AdminTheme } from "@/components/admin-editor";
import { AdminStaff } from "@/components/admin-staff";
import { AdminGallery, AdminSchedule } from "@/components/admin-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import logo from "@/assets/optimized/logo.jpg.asset.json";
import { cdn } from "@/lib/cdn";
import { getAcademicYear } from "@/content/academic-year";

const sections = [
  { key: "overview", label: "نظرة عامة", icon: LayoutDashboard, permission: null },
  { key: "students", label: "التلاميذ والتسجيلات", icon: GraduationCap, permission: "students" },
  { key: "content", label: "محتوى الموقع", icon: FileText, permission: "content" },
  { key: "gallery", label: "مكتبة الصور", icon: Images, permission: "content" },
  { key: "schedule", label: "برنامج الحصص", icon: CalendarDays, permission: "schedule" },
  { key: "news", label: "الإعلانات", icon: Megaphone, permission: "content" },
  { key: "staff", label: "المستخدمون والصلاحيات", icon: Users, permission: "users" },
  { key: "theme", label: "هوية الموقع", icon: Palette, permission: "users" },
] as const;
type SectionKey = typeof sections[number]["key"];
export function AdminWorkspace() {
  const navigate = useNavigate(); const queryClient = useQueryClient();
  const [staff, setStaff] = useState<Tables<"staff_accounts"> | null>(null);
  const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  const [active, setActive] = useState<SectionKey>("overview"); const [menu, setMenu] = useState(false);
  const [counts, setCounts] = useState({ students: 0, new: 0, active: 0, announcements: 0 });
  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user.user) { if (mounted) { setError("تعذّر التحقق من الحساب"); setLoading(false); } return; }
      const { data, error: staffError } = await supabase.from("staff_accounts").select("*").eq("user_id", user.user.id).maybeSingle();
      if (!mounted) return;
      if (staffError) setError("تعذّر تحميل صلاحيات الحساب؛ أعد المحاولة");
      setStaff(data?.active ? data : null); setLoading(false);
      if (data?.active && canManage(data.role as StaffRole, "students")) {
        const [all, fresh, enrolled, news] = await Promise.all([
          supabase.from("registrations").select("id", { count: "exact", head: true }),
          supabase.from("registrations").select("id", { count: "exact", head: true }).eq("status", "new"),
          supabase.from("registrations").select("id", { count: "exact", head: true }).eq("status", "active"),
          supabase.from("announcements").select("id", { count: "exact", head: true }),
        ]);
        if (mounted) setCounts({ students: all.count ?? 0, new: fresh.count ?? 0, active: enrolled.count ?? 0, announcements: news.count ?? 0 });
      }
    }
    void load(); return () => { mounted = false; };
  }, []);
  const role = staff?.role as StaffRole | undefined;
  const allowed = sections.filter(s => !s.permission || canManage(role ?? null, s.permission as Permission));
  async function signOut() { await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true }); }
  function open(key: SectionKey) { setActive(key); setMenu(false); }
  const current = allowed.find(s => s.key === active);
  return <main dir="rtl" className="admin-workspace min-h-screen bg-muted text-foreground">
    {loading ? <div className="grid min-h-screen place-items-center"><p role="status">جارٍ تحميل لوحة المدرسة…</p></div> : !staff ? <div className="mx-auto max-w-lg space-y-5 p-10"><ShieldCheck className="h-10 w-10 text-primary" /><h1 className="text-2xl font-bold">الدخول غير متاح</h1><p>{error || "هذا الحساب غير معتمد أو موقوف. تواصل مع إدارة المدرسة."}</p><Button onClick={signOut}><LogOut />خروج</Button></div> : <>
      {menu && <div className="fixed inset-0 z-40 bg-forest/40 lg:hidden" onClick={() => setMenu(false)} />}
      <aside className={`fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-e border-border bg-card transition-transform lg:translate-x-0 ${menu ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center gap-3 border-b border-border p-5"><img src={cdn(logo.url)} alt="SALAOUANDJI SCHOOL" className="h-10 w-10 rounded-full object-cover" /><div className="min-w-0"><p className="text-sm font-bold" dir="ltr">SALAOUANDJI</p><p className="text-xs text-muted-foreground">مساحة إدارة المدرسة</p></div><Button variant="ghost" size="icon" className="ms-auto lg:hidden" aria-label="إغلاق القائمة" onClick={() => setMenu(false)}><X /></Button></div>
        <nav aria-label="إدارة المدرسة" className="flex-1 space-y-1 overflow-y-auto p-3">{allowed.map(s => <Button key={s.key} variant="ghost" onClick={() => open(s.key)} aria-current={active === s.key ? "page" : undefined} className={`h-11 w-full justify-start gap-3 rounded-md text-sm ${active === s.key ? "bg-secondary font-semibold text-secondary-foreground" : "text-muted-foreground"}`}><s.icon className="h-4 w-4" />{s.label}</Button>)}</nav>
        <div className="space-y-3 border-t border-border p-4"><Button asChild variant="outline" className="w-full"><Link to="/"><ExternalLink />عرض الموقع</Link></Button><div className="flex items-center justify-between gap-2"><div className="min-w-0"><p className="truncate text-sm font-semibold">{staff.display_name}</p><p className="text-xs text-muted-foreground">{roleLabels[staff.role as StaffRole]}</p></div><Button variant="ghost" size="icon" title="تسجيل الخروج" onClick={signOut}><LogOut /></Button></div></div>
      </aside>
      <div className="min-w-0 lg:ms-64"><header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="فتح قائمة الإدارة" onClick={() => setMenu(true)}><Menu /></Button><div><p className="text-xs text-muted-foreground">إدارة المدرسة / {current?.label}</p><h1 className="mt-1 text-lg font-bold">{current?.label}</h1></div></div><span className="rounded-md border border-border px-3 py-1.5 text-xs" dir="ltr">{getAcademicYear()}</span></header>
        <div className="mx-auto max-w-7xl p-5 sm:p-8">
          {active === "overview" && <div className="space-y-8"><div><p className="mb-2 text-sm text-muted-foreground">مرحبًا، {staff.display_name}</p><h2 className="text-2xl font-bold">مدرستك، في مكان واحد</h2></div>{canManage(role ?? null, "students") && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{ label: "ملفات التلاميذ", value: counts.students, icon: GraduationCap }, { label: "طلبات جديدة", value: counts.new, icon: Users }, { label: "تلاميذ متمدرسون", value: counts.active, icon: ShieldCheck }, { label: "الإعلانات", value: counts.announcements, icon: Megaphone }].map(item => <article key={item.label} className="rounded-lg border border-border bg-card p-5"><div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{item.label}</p><item.icon className="h-5 w-5 text-primary" /></div><p className="mt-5 text-3xl font-bold">{item.value}</p></article>)}</div>}<section><h3 className="mb-4 font-semibold">الوصول السريع</h3><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{allowed.filter(s => s.key !== "overview").map(s => <Button key={s.key} variant="outline" onClick={() => open(s.key)} className="h-auto justify-between gap-4 whitespace-normal bg-card p-5"><span className="flex items-center gap-3"><s.icon className="h-5 w-5 text-primary" />{s.label}</span><ArrowUpLeft className="h-4 w-4 text-muted-foreground" /></Button>)}</div></section></div>}
          {active === "students" && canManage(role ?? null, "students") && <AdminStudents canDelete={canManage(role ?? null, "users")} />}
          {active === "content" && canManage(role ?? null, "content") && <AdminEditor />}
          {active === "gallery" && canManage(role ?? null, "content") && <AdminGallery />}
          {active === "schedule" && canManage(role ?? null, "schedule") && <AdminSchedule />}
          {active === "news" && canManage(role ?? null, "content") && <AdminAnnouncements />}
          {active === "staff" && canManage(role ?? null, "users") && <AdminStaff selfId={staff.user_id} />}
          {active === "theme" && canManage(role ?? null, "users") && <AdminTheme />}
        </div>
      </div>
    </>}
  </main>;
}

function AdminAnnouncements() {
  const [rows, setRows] = useState<Tables<"announcements">[]>([]); const [message, setMessage] = useState("");
  async function load() { const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false }); if (error) setMessage("تعذّر تحميل الإعلانات"); else setRows(data ?? []); }
  useEffect(() => { void load(); }, []);
  async function add(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const form = e.currentTarget; const values = new FormData(form); const { error } = await supabase.from("announcements").insert({ title: String(values.get("title")).trim(), body: String(values.get("body")).trim() }); if (error) return setMessage("تعذّر نشر الإعلان"); form.reset(); setMessage("تم نشر الإعلان"); await load(); }
  async function update(row: Tables<"announcements">, patch: Partial<Tables<"announcements">>) { const { error } = await supabase.from("announcements").update(patch).eq("id", row.id); if (error) setMessage("تعذّر حفظ الإعلان"); else await load(); }
  async function remove(id: string) { if (!confirm("حذف الإعلان؟")) return; const { error } = await supabase.from("announcements").delete().eq("id", id); if (error) setMessage("تعذّر الحذف"); else await load(); }
  return <div className="space-y-6"><h2 className="text-xl font-bold">الإعلانات</h2><form onSubmit={add} className="max-w-2xl space-y-3 border-y border-border py-5"><Input name="title" aria-label="عنوان الإعلان" placeholder="عنوان الإعلان" required /><Textarea name="body" aria-label="نص الإعلان" placeholder="نص الإعلان" /><Button type="submit"><Plus />نشر الإعلان</Button></form>{message && <p role="status">{message}</p>}{rows.map(row => <article key={row.id} className="space-y-3 rounded-lg border border-border bg-card p-5"><Input aria-label="تعديل عنوان الإعلان" defaultValue={row.title} onBlur={e => e.target.value.trim() && e.target.value !== row.title && void update(row, { title: e.target.value })} /><Textarea aria-label="تعديل نص الإعلان" defaultValue={row.body} onBlur={e => e.target.value !== row.body && void update(row, { body: e.target.value })} /><div className="flex items-center justify-between"><label className="flex items-center gap-2 text-sm"><Switch checked={row.published} onCheckedChange={published => update(row, { published })} />منشور في الموقع</label><Button variant="ghost" size="icon" title="حذف الإعلان" onClick={() => remove(row.id)}><Trash2 /></Button></div></article>)}</div>;
}