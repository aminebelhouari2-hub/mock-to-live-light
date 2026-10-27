import * as site from "@/content/site";
import { founder } from "@/content/founder";
import { getSchoolFaq } from "@/content/faq";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export const documentDefaults = {
  copy: site.ui, subjects: site.subjects, stages: site.teachingStages,
  teachers: site.teachers.filter(t => t.name.ar === "مربية روضة"), activities: site.activities,
  support: site.supportCourses, supportPhotos: site.supportPhotos,
  gallery: site.gallery, nurseryPhotos: site.nurseryPhotos, homepagePhotos: site.homepagePhotos,
  eventPhotos: site.eventPhotos, videos: site.schoolVideos, founder,
  testimonials: site.testimonials, contact: site.contact,
  faq: getSchoolFaq("ar").map((item, index) => ({ id: item.id, question: { ar: item.question, fr: getSchoolFaq("fr")[index]?.question ?? "", en: getSchoolFaq("en")[index]?.question ?? "" }, answer: { ar: item.answer, fr: getSchoolFaq("fr")[index]?.answer ?? "", en: getSchoolFaq("en")[index]?.answer ?? "" } })),
};
export type DocumentKey = keyof typeof documentDefaults;
export type SchoolDocuments = typeof documentDefaults;
export const documentLabels: Record<DocumentKey, string> = { copy: "نصوص جميع الصفحات", subjects: "مواد التحضيري", stages: "المواد والأساتذة حسب الطور", teachers: "بطاقات الفريق التربوي", activities: "الأنشطة", support: "دروس الدعم", supportPhotos: "صور دروس الدعم", gallery: "صور المعرض الأصلية", nurseryPhotos: "صور الروضة", homepagePhotos: "صور الرئيسية", eventPhotos: "التكريمات والمناسبات", videos: "الفيديوهات", founder: "إدارة المدرسة", testimonials: "تعليقات الأولياء", contact: "بيانات التواصل", faq: "دليل الأولياء" };
export function safeMediaUrl(value: string) { return value.startsWith("/__l5e/") || /^https:\/\//i.test(value); }
export function mergeDocument<T>(fallback: T, value: unknown): T {
  if (Array.isArray(fallback)) {
    if (!Array.isArray(value)) return fallback;
    return value.map((item, i) => mergeDocument(fallback[i] ?? fallback[0], item)) as T;
  }
  if (fallback && typeof fallback === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
    const output: Record<string, unknown> = {};
    for (const [key, original] of Object.entries(fallback)) {
      const next = (value as Record<string, unknown>)[key];
      output[key] = ["src", "image", "photo"].includes(key) && typeof next === "string" && !safeMediaUrl(next) ? original : mergeDocument(original, next);
    }
    return output as T;
  }
  return typeof value === typeof fallback ? value as T : fallback;
}
export async function fetchSchoolDocuments() {
  const { data, error } = await supabase.from("school_documents").select("key,content");
  if (error) throw error;
  const next = { ...documentDefaults };
  for (const row of data ?? []) {
    if (row.key in documentDefaults) {
      const key = row.key as DocumentKey;
      Object.assign(next, { [key]: mergeDocument(documentDefaults[key], row.content) });
    }
  }
  return next;
}
export const toJson = (value: unknown): Json => JSON.parse(JSON.stringify(value));
export const themeDefaults = { primary: "#F58220", end: "#E06D10", foreground: "#302c28", background: "#ffffff" };
export function validTheme(value: unknown) {
  const next = { ...themeDefaults };
  if (value && typeof value === "object") for (const key of Object.keys(next) as (keyof typeof next)[]) {
    const color = (value as Record<string, unknown>)[key];
    if (typeof color === "string" && /^#[0-9a-f]{6}$/i.test(color)) next[key] = color;
  }
  return next;
}