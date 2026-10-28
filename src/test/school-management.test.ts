import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { canManage, studentSchema, staffInputSchema } from "@/lib/school-management";
import { mergeDocument, validTheme } from "@/lib/school-documents";

describe("school staff permissions", () => {
  it("allows only administration to manage staff accounts", () => {
    expect(canManage("admin", "users")).toBe(true);
    expect(canManage("assistant", "users")).toBe(false);
    expect(canManage("teacher", "users")).toBe(false);
    expect(canManage(null, "users")).toBe(false);
  });
  it("allows assistants to manage student records", () => {
    expect(canManage("assistant", "students")).toBe(true);
    expect(canManage("teacher", "students")).toBe(false);
  });
  it("allows teachers to manage lessons without editing public content", () => {
    expect(canManage("teacher", "schedule")).toBe(true);
    expect(canManage("teacher", "content")).toBe(false);
  });
  it("validates staff creation roles", () => {
    expect(staffInputSchema.safeParse({ email: "staff@example.com", password: "long-passphrase-123", display_name: "Teacher", role: "teacher" }).success).toBe(true);
    expect(staffInputSchema.safeParse({ email: "staff@example.com", password: "long-passphrase-123", display_name: "Teacher", role: "owner" }).success).toBe(false);
  });
});
describe("student records", () => {
  const student = { first_name: "أمين", last_name: "بلحواري", parent_name: "ولي الأمر", phone: "0556000000", level: "المستوى الابتدائي", academic_year: "2026/2027", birth_date: null, age: 8, group_name: "", admin_notes: null, status: "new", source: "manual" };
  it("accepts a complete manual student record", () => { expect(studentSchema.parse(student).first_name).toBe("أمين"); });
  it("accepts website registrations with the same student fields", () => { expect(studentSchema.parse({ ...student, source: "website" }).source).toBe("website"); });
  it("rejects negative student ages", () => { expect(studentSchema.safeParse({ ...student, age: -1 }).success).toBe(false); });
  it("accepts enrolled status and rejects unsupported states", () => { expect(studentSchema.safeParse({ ...student, status: "active" }).success).toBe(true); expect(studentSchema.safeParse({ ...student, status: "invalid" }).success).toBe(false); });
});
describe("managed school content", () => {
  it("preserves defaults for absent fields", () => { expect(mergeDocument({ ar: "عربي", en: "English" }, { ar: "جديد" })).toEqual({ ar: "جديد", en: "English" }); });
  it("allows explicit removal and adding collection items", () => { expect(mergeDocument([{ title: "old" }], [])).toEqual([]); expect(mergeDocument([{ title: "old" }], [{ title: "one" }, { title: "two" }])).toHaveLength(2); });
  it("rejects executable media URLs", () => { expect(mergeDocument({ src: "https://example.com/photo.jpg" }, { src: "javascript:alert(1)" }).src).toBe("https://example.com/photo.jpg"); });
  it("accepts valid theme colors and rejects CSS injection", () => { expect(validTheme({ primary: "#112233" }).primary).toBe("#112233"); expect(validTheme({ primary: "red;display:none" }).primary).toBe("#F58220"); });
});