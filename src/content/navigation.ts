import { type L } from "@/content/site";

export const schoolNavigation = [
  { to: "/", label: { ar: "الرئيسية", fr: "Accueil", en: "Home" } },
  { to: "/about", label: { ar: "اكتشف مدرستنا", fr: "Découvrez notre école", en: "Discover our school" } },
  { to: "/subjects", label: { ar: "عالم التعلّم", fr: "Univers d’apprentissage", en: "World of learning" } },
  { to: "/support", label: { ar: "الدعم والتميّز", fr: "Soutien et excellence", en: "Support & excellence" } },
  { to: "/teachers", label: { ar: "فريقنا التربوي", fr: "Notre équipe pédagogique", en: "Our educational team" } },
  { to: "/activities", label: { ar: "أنشطة واكتشافات", fr: "Activités et découvertes", en: "Activities & discoveries" } },
  { to: "/gallery", label: { ar: "لحظات من مدرستنا", fr: "Instants de notre école", en: "Moments from our school" } },
  { to: "/schedule", label: { ar: "برنامجنا الدراسي", fr: "Notre programme scolaire", en: "Our school schedule" } },
  { to: "/registration", label: { ar: "انضم إلينا", fr: "Rejoignez-nous", en: "Join us" } },
  { to: "/faq", label: { ar: "دليل الأولياء", fr: "Guide des parents", en: "Parents’ guide" } },
  { to: "/contact", label: { ar: "تواصل معنا", fr: "Contactez-nous", en: "Contact us" } },
  { to: "/founder", label: { ar: "إدارة المدرسة", fr: "Direction de l’école", en: "School leadership" } },
] as const satisfies ReadonlyArray<{ to: string; label: L }>;

export type SchoolPageKey = "home" | "about" | "subjects" | "support" | "teachers" | "activities" | "gallery" | "schedule" | "registration" | "faq" | "contact" | "founder";

export function schoolPageLabel(page: SchoolPageKey): L {
  return schoolNavigation.find(item => item.to === (page === "home" ? "/" : `/${page}`))?.label ?? schoolNavigation[0].label;
}

export const schoolFooterGroups = [
  { label: { ar: "اكتشف المدرسة", fr: "Découvrez l’école", en: "Discover the school" }, paths: ["/", "/about", "/teachers", "/gallery", "/founder"] },
  { label: { ar: "فضاء التعلّم", fr: "Espace d’apprentissage", en: "Learning space" }, paths: ["/subjects", "/support", "/activities", "/schedule", "/faq"] },
  { label: { ar: "التسجيل والتواصل", fr: "Inscription et contact", en: "Registration & contact" }, paths: ["/registration", "/contact"] },
] as const;