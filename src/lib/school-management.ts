import { z } from "zod";

export const staffRoles = ["admin", "assistant", "teacher"] as const;
export type StaffRole = typeof staffRoles[number];
export type Permission = "users" | "students" | "content" | "schedule";
export const roleLabels: Record<StaffRole, string> = { admin: "مدير / مسؤول", assistant: "مساعد إداري", teacher: "أستاذ" };
export function canManage(role: StaffRole | null, permission: Permission) {
  return role === "admin" || (role === "assistant" && permission !== "users") || (role === "teacher" && permission === "schedule");
}
export const studentSchema = z.object({
  first_name: z.string().trim().max(120), last_name: z.string().trim().max(120),
  parent_name: z.string().trim().min(1).max(120), phone: z.string().trim().min(1).max(30),
  level: z.string().trim().min(1).max(120), academic_year: z.string().max(20),
  birth_date: z.string().nullable(), age: z.number().int().min(0).max(100).nullable(),
  group_name: z.string().max(120), admin_notes: z.string().max(3000).nullable(),
  status: z.enum(["new", "contacted", "confirmed", "active", "waiting", "cancelled"]),
  source: z.enum(["website", "manual"]),
});
export const staffInputSchema = z.object({ email: z.string().email(), password: z.string().min(12).max(128), display_name: z.string().trim().min(1).max(120), role: z.enum(staffRoles) });