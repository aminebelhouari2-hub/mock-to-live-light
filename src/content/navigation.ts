import { ui, supportUi, type L } from "@/content/site";

export const schoolNavigation = [
  { to: "/", label: { ar: "الرئيسية", fr: "Accueil", en: "Home" } },
  { to: "/about", label: { ar: ui.ar.nav.about, fr: ui.fr.nav.about, en: ui.en.nav.about } },
  { to: "/subjects", label: { ar: ui.ar.nav.subjects, fr: ui.fr.nav.subjects, en: ui.en.nav.subjects } },
  { to: "/support", label: { ar: supportUi.ar.title, fr: supportUi.fr.title, en: supportUi.en.title } },
  { to: "/teachers", label: { ar: ui.ar.nav.teachers, fr: ui.fr.nav.teachers, en: ui.en.nav.teachers } },
  { to: "/activities", label: { ar: ui.ar.nav.activities, fr: ui.fr.nav.activities, en: ui.en.nav.activities } },
  { to: "/gallery", label: { ar: ui.ar.nav.gallery, fr: ui.fr.nav.gallery, en: ui.en.nav.gallery } },
  { to: "/schedule", label: { ar: ui.ar.nav.schedule, fr: ui.fr.nav.schedule, en: ui.en.nav.schedule } },
  { to: "/registration", label: { ar: ui.ar.nav.register, fr: ui.fr.nav.register, en: ui.en.nav.register } },
  { to: "/faq", label: { ar: "الأسئلة الشائعة", fr: "FAQ", en: "FAQ" } },
  { to: "/contact", label: { ar: "التواصل والموقع", fr: "Contact", en: "Contact & location" } },
] as const satisfies ReadonlyArray<{ to: string; label: L }>;

export type SchoolPageKey = "home" | "about" | "subjects" | "support" | "teachers" | "activities" | "gallery" | "schedule" | "registration" | "faq" | "contact";