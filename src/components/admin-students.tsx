import { useEffect, useState } from "react";
import { Plus, Search, Phone, MessageCircle, Pencil, Trash2, Download, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registrationStatusLabels, type RegistrationStatus } from "@/lib/registrations";
import { studentSchema } from "@/lib/school-management";
import { getAcademicYear } from "@/content/academic-year";
import { supportCourses } from "@/content/site";

type Student = Tables<"registrations">;
const emptyStudent = () => ({ first_name: "", last_name: "", parent_name: "", phone: "", level: "روضة / تحضيري", academic_year: getAcademicYear(), birth_date: null as string | null, age: null as number | null, group_name: "", admin_notes: "", status: "new" as RegistrationStatus, source: "manual" as "manual" | "website" });
export function AdminStudents({ canDelete }: { canDelete: boolean }) {
  const [rows, setRows] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [draft, setDraft] = useState<ReturnType<typeof emptyStudent> | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function load() { const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false }); if (error) setMessage("تعذّر تحميل التلاميذ"); else setRows(data ?? []); }
  useEffect(() => { void load(); }, []);
  const filtered = rows.filter(r => (!filter || r.status === filter) && `${r.first_name} ${r.last_name} ${r.parent_name} ${r.phone} ${r.level}`.toLowerCase().includes(search.toLowerCase()));
  async function save(e: React.FormEvent) {
    e.preventDefault(); if (!draft) return;
    const parsed = studentSchema.safeParse(draft);
    if (!parsed.success) return setMessage("تحقق من بيانات التلميذ ورقم الهاتف والسن");
    setBusy(true);
    const result = id ? await supabase.from("registrations").update(parsed.data).eq("id", id) : await supabase.from("registrations").insert(parsed.data);
    setBusy(false);
    if (result.error) return setMessage("تعذّر حفظ الملف؛ لم تُحفظ التغييرات");
    setDraft(null); setMessage("تم حفظ ملف التلميذ"); await load();
  }
  async function remove(row: Student) { if (!confirm("حذف ملف التلميذ نهائيًا؟")) return; const { error } = await supabase.from("registrations").delete().eq("id", row.id); if (error) setMessage("تعذّر الحذف"); else await load(); }
  function exportCsv() {
    const fields = ["first_name", "last_name", "parent_name", "phone", "level", "status", "academic_year"] as const;
    const text = "\ufeff" + [fields.join(","), ...filtered.map(row => fields.map(k => `"${String(row[k] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = "school-students.csv"; a.click(); URL.revokeObjectURL(url);
  }
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">التلاميذ والتسجيلات</h2><p className="mt-1 text-sm text-muted-foreground">{rows.length} ملف · {rows.filter(r => r.source === "website").length} من الموقع</p></div><div className="flex gap-2"><Button variant="outline" onClick={exportCsv}><Download />تصدير</Button><Button onClick={() => { setId(null); setDraft(emptyStudent()); setMessage(""); }}><Plus />إضافة تلميذ</Button></div></div>
    <div className="flex flex-wrap gap-3"><div className="relative min-w-0 flex-1"><Search className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="بحث التلاميذ" placeholder="الاسم، ولي الأمر، الهاتف أو المستوى" value={search} onChange={e => setSearch(e.target.value)} className="ps-9" /></div><select aria-label="تصفية الحالة" className="rounded-md border border-input bg-card p-2 text-sm" value={filter} onChange={e => setFilter(e.target.value)}><option value="">جميع الحالات</option>{Object.entries(registrationStatusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>
    {message && <p role="status" className="text-sm">{message}</p>}
    <div className="overflow-x-auto rounded-lg border border-border bg-card"><table className="w-full min-w-[760px] text-start text-sm"><thead className="bg-muted"><tr>{["التلميذ", "ولي الأمر", "المستوى / الفوج", "الحالة", "المصدر", "إجراءات"].map(x => <th key={x} className="p-4 text-start font-medium">{x}</th>)}</tr></thead><tbody>{filtered.map(row => <tr key={row.id} className="border-t border-border"><td className="p-4"><p className="font-semibold">{`${row.first_name} ${row.last_name}`.trim() || "بيانات التلميذ غير مكتملة"}</p><p className="mt-1 text-xs text-muted-foreground">{row.age !== null ? `${row.age} سنة · ` : ""}{row.academic_year}</p></td><td className="p-4">{row.parent_name}<p dir="ltr" className="mt-1 text-start text-xs text-muted-foreground">{row.phone}</p></td><td className="p-4">{row.level}<p className="mt-1 text-xs text-muted-foreground">{row.group_name || "—"}</p></td><td className="p-4"><span className="rounded-md bg-secondary px-2 py-1 text-secondary-foreground">{registrationStatusLabels[row.status as RegistrationStatus] ?? row.status}</span></td><td className="p-4 text-muted-foreground">{row.source === "website" ? "الموقع" : "يدوي"}</td><td className="p-4"><div className="flex gap-1"><Button variant="ghost" size="icon" title="تعديل ملف التلميذ" onClick={() => { setId(row.id); setDraft({ ...emptyStudent(), ...row, status: row.status as RegistrationStatus, source: row.source === "website" ? "website" : "manual", academic_year: row.academic_year ?? getAcademicYear(), admin_notes: row.admin_notes ?? "" }); }}><Pencil /></Button><Button asChild variant="ghost" size="icon" title="اتصال"><a href={`tel:${row.phone}`}><Phone /></a></Button><Button asChild variant="ghost" size="icon" title="واتساب"><a href={`https://wa.me/${row.phone.replace(/\D/g, "").replace(/^0/, "213")}`} target="_blank" rel="noopener noreferrer"><MessageCircle /></a></Button>{canDelete && <Button variant="ghost" size="icon" title="حذف التلميذ" onClick={() => remove(row)}><Trash2 /></Button>}</div></td></tr>)}</tbody></table>{!filtered.length && <p className="p-10 text-center text-muted-foreground">لا توجد ملفات مطابقة</p>}</div>
    {draft && <div className="fixed inset-0 z-50 overflow-y-auto bg-forest/40 p-4 backdrop-blur-sm"><form onSubmit={save} className="mx-auto my-8 max-w-2xl space-y-5 rounded-lg border border-border bg-card p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">{id ? "تعديل ملف التلميذ" : "تلميذ جديد"}</h2><Button variant="ghost" size="icon" type="button" aria-label="إغلاق ملف التلميذ" onClick={() => setDraft(null)}><X /></Button></div><div className="grid gap-4 sm:grid-cols-2">{([{ key: "first_name", label: "اسم التلميذ" }, { key: "last_name", label: "لقب التلميذ" }, { key: "parent_name", label: "اسم ولقب ولي الأمر" }, { key: "phone", label: "رقم الهاتف" }, { key: "group_name", label: "الفوج" }, { key: "academic_year", label: "الموسم الدراسي" }] as const).map(field => <div key={field.key}><Label htmlFor={`student-${field.key}`}>{field.label}</Label><Input id={`student-${field.key}`} value={draft[field.key]} required={field.key !== "group_name"} onChange={e => setDraft({ ...draft, [field.key]: e.target.value })} className="mt-2" /></div>)}<div><Label htmlFor="student-birth">تاريخ الميلاد</Label><Input id="student-birth" type="date" value={draft.birth_date ?? ""} onChange={e => setDraft({ ...draft, birth_date: e.target.value || null })} className="mt-2" /></div><div><Label htmlFor="student-age">السن</Label><Input id="student-age" type="number" min={0} max={100} value={draft.age ?? ""} onChange={e => setDraft({ ...draft, age: e.target.value ? Number(e.target.value) : null })} className="mt-2" /></div><div><Label htmlFor="student-level">المستوى الدراسي</Label><select id="student-level" value={draft.level} onChange={e => setDraft({ ...draft, level: e.target.value })} className="mt-2 w-full rounded-md border border-input bg-card p-2"><option>روضة / تحضيري</option>{supportCourses.map(c => <option key={c.shortLevel}>{c.level}</option>)}{!["روضة / تحضيري", ...supportCourses.map(c => c.level)].includes(draft.level) && <option>{draft.level}</option>}</select></div><div><Label htmlFor="student-status">حالة التسجيل</Label><select id="student-status" value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as RegistrationStatus })} className="mt-2 w-full rounded-md border border-input bg-card p-2">{Object.entries(registrationStatusLabels).map(([k, label]) => <option key={k} value={k}>{label}</option>)}</select></div></div><div><Label htmlFor="student-notes">ملاحظات الإدارة</Label><Textarea id="student-notes" className="mt-2" value={draft.admin_notes ?? ""} onChange={e => setDraft({ ...draft, admin_notes: e.target.value })} /></div>{message && <p role="status">{message}</p>}<Button type="submit" disabled={busy}><Save />{busy ? "جارٍ الحفظ…" : "حفظ ملف التلميذ"}</Button></form></div>}
  </div>;
}