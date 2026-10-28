import { useCallback, useEffect, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { primaryDays, primarySchedule, primaryScheduleSubjects } from "@/content/site";
import { fetchScheduleSlots, mergeSchedule, signGalleryRows, type DayKey, type GalleryRow } from "@/lib/school-cms";

export function AdminGallery() {
  const [items, setItems] = useState<(GalleryRow & { url: string })[]>([]);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const { data } = await supabase.from("gallery_photos").select("id, path, caption, created_at").order("created_at", { ascending: false });
    setItems(await signGalleryRows(data ?? []));
  }, []);
  useEffect(() => { load(); }, [load]);

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const file = (form.elements.namedItem("photo") as HTMLInputElement).files?.[0];
    if (!file) return;
    setBusy(true);
    const path = `${crypto.randomUUID()}.${file.name.split(".").pop() ?? "jpg"}`;
    const { error } = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
    if (error) { setBusy(false); alert("تعذّر رفع الصورة"); return; }
    const { error: saveError } = await supabase.from("gallery_photos").insert({ path, url: path, caption: caption.trim() });
    if (saveError) { await supabase.storage.from("gallery").remove([path]); setBusy(false); alert("تعذّر حفظ الصورة"); return; }
    setBusy(false); setCaption(""); form.reset(); load();
  }
  async function remove(r: GalleryRow) {
    if (!confirm("حذف هذه الصورة؟")) return;
    const { error } = await supabase.from("gallery_photos").delete().eq("id", r.id);
    if (error) { alert("تعذّر حذف الصورة"); return; }
    await supabase.storage.from("gallery").remove([r.path]);
    setItems(list => list.filter(x => x.id !== r.id));
  }

  return (
    <div className="space-y-4">
      <form onSubmit={upload} className="school-glass space-y-3 p-5">
        <Input name="photo" type="file" accept="image/*" required />
        <Input placeholder="وصف الصورة (مثال: حفل توزيع الشهادات)" value={caption} onChange={e => setCaption(e.target.value)} />
        <Button type="submit" disabled={busy}><Upload />{busy ? "جارٍ الرفع..." : "إضافة إلى المعرض"}</Button>
      </form>
      {!items.length && <p className="school-glass p-6 text-forest/70">لم تُضف صور من اللوحة بعد. الصور الأصلية للموقع تبقى ظاهرة.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(r => (
          <figure key={r.id} className="school-glass overflow-hidden p-0">
            <img src={r.url} alt={r.caption} className="aspect-[4/3] w-full object-cover" />
            <figcaption className="flex items-center justify-between gap-2 p-3 text-sm">
              <span className="min-w-0 truncate">{r.caption || "—"}</span>
              <Button variant="ghost" size="sm" onClick={() => remove(r)}><Trash2 />حذف</Button>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const dayKeys = Object.keys(primaryDays) as DayKey[];
const keyOf = (ar?: string) => dayKeys.find(k => primaryDays[k].ar === ar) ?? "";

export function AdminSchedule() {
  const [cells, setCells] = useState<Record<string, { day: string; time: string }>>({});
  const [saved, setSaved] = useState("");
  useEffect(() => {
    fetchScheduleSlots().then(slots => {
      const next: Record<string, { day: string; time: string }> = {};
      mergeSchedule(primarySchedule, slots).forEach(row => row.lessons.forEach((l, i) => { next[`${row.year}-${i}`] = { day: keyOf(l?.day.ar), time: l?.time ?? "" }; }));
      setCells(next);
    });
  }, []);
  const set = (k: string, patch: Partial<{ day: string; time: string }>) => setCells(c => ({ ...c, [k]: { day: "", time: "", ...c[k], ...patch } }));

  async function save() {
    const rows = Object.entries(cells).map(([k, v]) => {
      const [year = 0, subject_index = 0] = k.split("-").map(Number);
      const ok = v.day && v.time;
      return { year, subject_index, day: ok ? v.day : null, time: ok ? v.time : null, updated_at: new Date().toISOString() };
    });
    const { error } = await supabase.from("schedule_slots").upsert(rows, { onConflict: "year,subject_index" });
    setSaved(error ? "تعذّر الحفظ" : "تم حفظ البرنامج وظهر في الموقع");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-forest/70">اختر اليوم والساعة لكل حصة. اترك اليوم فارغًا لإظهار «—».</p>
      {primarySchedule.map(row => (
        <section key={row.year} className="school-glass space-y-3 p-5">
          <h3 className="font-bold">{row.label.ar}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {primaryScheduleSubjects.map((subject, i) => {
              const k = `${row.year}-${i}`; const c = cells[k] ?? { day: "", time: "" };
              return (
                <div key={k} className="space-y-1">
                  <p className="text-sm font-semibold">{subject}</p>
                  <div className="flex gap-2">
                    <select aria-label={`يوم ${subject}`} value={c.day} onChange={e => set(k, { day: e.target.value })} className="min-w-0 flex-1 rounded-md border border-forest/15 bg-card p-2 text-sm">
                      <option value="">—</option>
                      {dayKeys.map(d => <option key={d} value={d}>{primaryDays[d].ar}</option>)}
                    </select>
                    <Input aria-label={`ساعة ${subject}`} type="time" dir="ltr" value={c.time} onChange={e => set(k, { time: e.target.value })} className="w-28" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <div className="flex items-center gap-3"><Button onClick={save}>حفظ البرنامج</Button>{saved && <span className="text-sm">{saved}</span>}</div>
    </div>
  );
}
