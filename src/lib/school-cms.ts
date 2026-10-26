import { supabase } from "@/integrations/supabase/client";
import { primaryDays, type PrimaryLesson, type SchoolPhoto } from "@/content/site";

export type DayKey = keyof typeof primaryDays;
export interface ScheduleSlot { year: number; subject_index: number; day: string | null; time: string | null }
export interface GalleryRow { id: string; path: string; caption: string; created_at: string }

/** Apply dashboard edits over the local timetable; a slot with no day/time clears the lesson. */
export function mergeSchedule<T extends { year: number; lessons: (PrimaryLesson | null)[] }>(rows: T[], slots: ScheduleSlot[]): T[] {
  return rows.map(row => ({
    ...row,
    lessons: row.lessons.map((lesson, i) => {
      const s = slots.find(x => x.year === row.year && x.subject_index === i);
      if (!s) return lesson;
      if (!s.day || !s.time || !(s.day in primaryDays)) return null;
      return { day: primaryDays[s.day as DayKey], time: s.time };
    }),
  }));
}

export async function fetchScheduleSlots(): Promise<ScheduleSlot[]> {
  const { data } = await supabase.from("schedule_slots").select("year, subject_index, day, time");
  return data ?? [];
}

export async function signGalleryRows(rows: GalleryRow[]) {
  if (!rows.length) return [];
  const { data } = await supabase.storage.from("gallery").createSignedUrls(rows.map(r => r.path), 60 * 60 * 24);
  return rows.map((r, i) => ({ ...r, url: data?.[i]?.signedUrl ?? "" })).filter(r => r.url);
}

export async function fetchGalleryPhotos(): Promise<SchoolPhoto[]> {
  const { data } = await supabase.from("gallery_photos").select("id, path, caption, created_at").order("created_at", { ascending: false });
  const signed = await signGalleryRows(data ?? []);
  return signed.map(r => ({ src: r.url, alt: { ar: r.caption || "صورة من صلوانجي سكول", fr: r.caption || "Photo de Salaouandji School", en: r.caption || "Salaouandji School photo" } }));
}
