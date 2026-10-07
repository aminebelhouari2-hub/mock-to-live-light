import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookA,
  Calculator,
  Languages,
  Palette,
  BookOpen,
  Music,
  RotateCcw,
  Wrench,
  FlaskConical,
  Smile,
  GraduationCap,
  Puzzle,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Users,
  MessageCircle,
  School,
  CheckCircle2,
} from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import {
  activities,
  contact,
  gallery,
  images,
  schedule,
  subjects,
  teachers,
  testimonials,
  ui,
  type IconKey,
  type Lang,
  type L,
} from "@/content/site";

export function getAcademicYear(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const startYear = month >= 8 ? year : year - 1;
  return `${startYear}/${startYear + 1}`;
}

const academicYear = getAcademicYear();

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Salaouandji School | صلوانجي سكول — مدرسة خاصة بسيدي سعيد، تلمسان",
      },
      {
        name: "description",
        content: `صلوانجي سكول مدرسة خاصة في سيدي سعيد، تلمسان: أقسام تحضيرية، دروس دعم للثالثة ابتدائي والمتوسط والثانوي، ورشات لغة وأنشطة تربوية. التسجيل مفتوح للموسم ${academicYear}.`,
      },
      {
        property: "og:title",
        content: "Salaouandji School | صلوانجي سكول — تلمسان",
      },
      {
        property: "og:description",
        content: `مدرسة خاصة في سيدي سعيد، تلمسان — تعلّم، تطوّر، وابدأ رحلتك نحو النجاح خلال الموسم الدراسي ${academicYear}.`,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "ar_DZ",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Index,
});

const ICONS: Record<IconKey, typeof BookA> = {
  letters: BookA,
  numbers: Calculator,
  english: Languages,
  arts: Palette,
  stories: BookOpen,
  music: Music,
  review: RotateCcw,
  workshop: Wrench,
  science: FlaskConical,
  kids: Smile,
  exam: GraduationCap,
  games: Puzzle,
};

type SupportCourse = {
  level: string;
  shortLevel: string;
  description: {
    ar: string;
    fr: string;
  };
  subjects: {
    ar: string;
    fr: string;
  }[];
};

const supportCourses: SupportCourse[] = [
  {
    level: "الثالثة ابتدائي",
    shortLevel: "3AP",
    description: {
      ar: "مرافقة تربوية تساعد التلميذ على تثبيت المكتسبات وفهم الدروس بشكل أفضل.",
      fr: "Un accompagnement pédagogique pour consolider les acquis et mieux comprendre les cours.",
    },
    subjects: [
      { ar: "اللغة العربية", fr: "Arabe" },
      { ar: "الرياضيات", fr: "Mathématiques" },
      { ar: "اللغة الفرنسية", fr: "Français" },
      { ar: "اللغة الإنجليزية", fr: "Anglais" },
      { ar: "التربية الإسلامية", fr: "Éducation islamique" },
    ],
  },
  {
    level: "الثالثة متوسط",
    shortLevel: "3AM",
    description: {
      ar: "دروس دعم ومراجعة منظمة لسد الثغرات ورفع مستوى التلميذ في مختلف المواد.",
      fr: "Des cours de soutien structurés pour combler les lacunes et améliorer le niveau scolaire.",
    },
    subjects: [
      { ar: "اللغة العربية", fr: "Arabe" },
      { ar: "الرياضيات", fr: "Mathématiques" },
      { ar: "اللغة الفرنسية", fr: "Français" },
      { ar: "اللغة الإنجليزية", fr: "Anglais" },
      { ar: "العلوم الفيزيائية", fr: "Sciences physiques" },
      { ar: "علوم الطبيعة والحياة", fr: "Sciences naturelles" },
      { ar: "التاريخ والجغرافيا", fr: "Histoire & Géographie" },
    ],
  },
  {
    level: "الثالثة ثانوي",
    shortLevel: "3AS",
    description: {
      ar: "تحضير منهجي ومرافقة موجهة نحو شهادة البكالوريا مع التركيز على الفهم والمنهجية.",
      fr: "Une préparation méthodique au baccalauréat avec un accompagnement axé sur la compréhension et la méthode.",
    },
    subjects: [
      { ar: "الرياضيات", fr: "Mathématiques" },
      { ar: "العلوم الطبيعية", fr: "Sciences naturelles" },
      { ar: "العلوم الفيزيائية", fr: "Sciences physiques" },
      { ar: "اللغة العربية", fr: "Arabe" },
      { ar: "اللغة الفرنسية", fr: "Français" },
      { ar: "اللغة الإنجليزية", fr: "Anglais" },
      { ar: "الفلسفة", fr: "Philosophie" },
      { ar: "التاريخ والجغرافيا", fr: "Histoire & Géographie" },
    ],
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && (entry.target.classList.add("in"), io.unobserve(entry.target)),
        ),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-block rounded-full bg-peach px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-forest">
      {children}
    </span>
  );
}

function Section({
  id,
  label,
  title,
  children,
  className = "",
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="text-3xl font-bold text-forest sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [menu, setMenu] = useState(false);
  const [lb, setLb] = useState<number | null>(null);

  const t = ui[lang];
  const p = (x: L) => x[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(p(contact.waMessage))}`;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.mapQuery,
  )}&output=embed`;

  const mapHref =
    contact.mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    if (lb === null) return;
    const n = gallery.length;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") {
        setLb((i) => (i! + (dir === "rtl" ? -1 : 1) + n) % n);
      }
      if (e.key === "ArrowLeft") {
        setLb((i) => (i! + (dir === "rtl" ? 1 : -1) + n) % n);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb, dir]);

  const supportLabel = lang === "ar" ? "دروس الدعم" : "Cours de soutien";

  const navs: [string, string][] = [
    ["#about", t.nav.about],
    ["#subjects", t.nav.subjects],
    ["#support", supportLabel],
    ["#teachers", t.nav.teachers],
    ["#activities", t.nav.activities],
    ["#gallery", t.nav.gallery],
    ["#schedule", t.nav.schedule],
    ["#contact", t.nav.contact],
  ];

  const LangSwitch = () => (
    <div className="flex rounded-full bg-sand p-1" role="group" aria-label="Language">
      {(["ar", "fr"] as Lang[]).map((c) => (
        <button
          key={c}
          onClick={() => setLang(c)}
          aria-pressed={lang === c}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            lang === c ? "bg-forest text-cream" : "text-forest/70 hover:text-forest"
          }`}
        >
          {c === "ar" ? "ع" : "FR"}
        </button>
      ))}
    </div>
  );

  return (
    <div dir={dir} className="relative overflow-x-hidden bg-background text-foreground">
      {/* WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noopener"
        aria-label={t.ctaWhatsapp}
        className="wa-float fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-soft"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-forest/10 bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src={logo.url}
              alt="Salaouandji School"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-xl object-contain"
            />
            <div className="min-w-0">
              <div
                className="truncate font-display text-[15px] font-bold leading-tight text-forest"
                dir="ltr"
              >
                SALAOUANDJI <span className="text-primary">SCHOOL</span>
              </div>
              <div className="truncate text-[11.5px] text-forest/60">{t.tagline}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
            {navs.map(([h, l]) => (
              <a
                key={h}
                href={h}
                className="text-sm font-medium text-forest/70 transition hover:text-forest"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitch />
            </div>
            <a
              href="#register"
              className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 md:inline-block"
            >
              {t.nav.register}
            </a>
            <button
              onClick={() => setMenu(true)}
              aria-label={t.menu}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-forest lg:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={() => setMenu(false)}
          />
          <div className="absolute inset-y-0 end-0 flex w-[82%] max-w-sm flex-col gap-2 bg-cream p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <LangSwitch />
              <button
                onClick={() => setMenu(false)}
                aria-label={t.close}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand"
              >
                <X />
              </button>
            </div>
            {[...navs, ["#register", t.nav.register] as [string, string]].map(([h, l]) => (
              <a
                key={h}
                href={h}
                onClick={() => setMenu(false)}
                className="rounded-xl px-4 py-3 text-lg font-semibold text-forest hover:bg-sand"
              >
                {l}
              </a>
            ))}
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 font-bold text-primary-foreground"
            >
              <MessageCircle className="h-5 w-5" />
              {t.ctaWhatsapp}
            </a>
          </div>
        </div>
      )}

      <main id="main">
        {/* Hero */}
        <section id="top" className="relative isolate overflow-hidden">
          <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          <div className="float-a absolute -top-10 end-[8%] -z-10 h-56 w-56 rounded-full bg-peach blur-2xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-24 lg:pt-16">
            <div className="reveal flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-peach px-4 py-2 text-[13px] font-bold text-forest">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                {lang === "ar"
                  ? `السنة الدراسية ${academicYear}`
                  : `Année scolaire ${academicYear}`}
              </span>

              <h1 className="text-[2.35rem] font-bold leading-[1.2] text-forest sm:text-5xl lg:text-[3.6rem]">
                {t.heroTitle[0]}
                <br />
                <span className="text-primary">{t.heroTitle[1]}</span>
              </h1>

              <p className="max-w-[56ch] text-[17px] leading-[1.95] text-forest/75">{t.heroText}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#register"
                  className="rounded-2xl bg-primary px-7 py-4 text-center text-base font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
                >
                  {t.ctaRegister}
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-forest/15 bg-card px-7 py-4 text-base font-bold text-forest transition hover:border-whatsapp"
                >
                  <MessageCircle className="h-5 w-5 text-whatsapp" />
                  {t.ctaWhatsapp}
                </a>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm font-medium text-forest/70">
                {t.heroPoints.map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-3 -z-10 rotate-[-3deg] rounded-[2.5rem] bg-primary/90" />
              <img
                src={images.hero}
                alt={t.sample}
                width={1600}
                height={1104}
                fetchPriority="high"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft sm:aspect-[5/4]"
              />
              <div className="glass absolute -bottom-6 start-4 flex items-center gap-3 rounded-2xl p-3 pe-5 shadow-soft sm:start-[-1.5rem]">
                <img
                  src={logo.url}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-contain"
                />
                <div>
                  <div className="text-xs text-forest/60">{t.addressLabel}</div>
                  <div className="text-sm font-bold text-forest">Sidi Saïd, Tlemcen</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y-2 border-primary bg-forest py-3.5" aria-hidden>
          <div className="marquee-track">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-semibold text-cream"
              >
                SALAOUANDJI SCHOOL — صلوانجي سكول
                <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <section id="about" className="bg-dots relative bg-forest text-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="reveal">
              <Eyebrow>{t.aboutLabel}</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug sm:text-4xl">{t.aboutTitle}</h2>
            </div>
            <div className="reveal space-y-4 text-[16.5px] leading-[2] text-cream/80">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
              {t.pillars.map((x, i) => {
                const I = [ShieldCheck, Sparkles, Users][i];
                return (
                  <div
                    key={x.t}
                    className="reveal rounded-3xl border border-cream/10 bg-cream/5 p-6 backdrop-blur"
                  >
                    <I className="mb-4 h-7 w-7 text-primary" />
                    <h3 className="mb-2 text-lg font-semibold">{x.t}</h3>
                    <p className="text-sm leading-7 text-cream/70">{x.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Subjects */}
        <Section id="subjects" label={t.subjectsLabel} title={t.subjectsTitle}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => {
              const I = ICONS[s.icon];
              return (
                <article
                  key={s.icon}
                  className="lift reveal group rounded-3xl border border-forest/10 bg-card p-7 shadow-soft"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <I className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-forest">{p(s.title)}</h3>
                  <p className="text-[15px] leading-7 text-forest/70">{p(s.desc)}</p>
                </article>
              );
            })}
          </div>
        </Section>

        {/* Support Courses */}
        <section id="support" className="relative overflow-hidden bg-shell py-20 lg:py-28">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="reveal mx-auto mb-12 max-w-3xl text-center">
              <Eyebrow>
                {lang === "ar" ? "الموسم الدراسي الحالي" : "Saison scolaire actuelle"}
              </Eyebrow>

              <div className="mb-4 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-peach px-4 py-2 text-xs font-bold text-forest">
                  <School className="h-4 w-4 text-primary" />
                  {academicYear}
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-snug text-forest sm:text-4xl">
                {lang === "ar"
                  ? "دروس الدعم لمختلف الأطوار"
                  : "Cours de soutien pour différents niveaux"}
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {supportCourses.map((course) => (
                <div
                  key={course.level}
                  className="reveal flex flex-col rounded-3xl border border-forest/10 bg-card p-8 shadow-soft"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-xl bg-peach px-3 py-1 text-xs font-bold text-forest">
                      {course.shortLevel}
                    </span>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-forest">{course.level}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-forest/70">
                    {course.description[lang]}
                  </p>
                  <div className="mt-auto border-t border-forest/10 pt-6">
                    <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-forest/60">
                      {lang === "ar" ? "المواد المتاحة:" : "Matières disponibles:"}
                    </h4>
                    <ul className="space-y-2.5">
                      {course.subjects.map((sub) => (
                        <li
                          key={sub.ar}
                          className="flex items-center gap-2.5 text-sm font-medium text-forest"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {sub[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teachers */}
        <Section id="teachers" label={t.teachersLabel} title={t.teachersTitle}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((m) => (
              <div
                key={m.name}
                className="reveal group overflow-hidden rounded-3xl border border-forest/10 bg-card shadow-soft"
              >
                <div className="aspect-square overflow-hidden bg-sand">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-forest">{m.name}</h3>
                  <p className="text-xs font-bold text-primary">{p(m.role)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-forest/70">{p(m.bio)}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Activities */}
        <Section
          id="activities"
          label={t.activitiesLabel}
          title={t.activitiesTitle}
          className="bg-sand/40"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((act) => (
              <div
                key={act.title.ar}
                className="reveal rounded-3xl border border-forest/10 bg-card p-6 shadow-soft"
              >
                <h3 className="mb-2 text-xl font-bold text-forest">{p(act.title)}</h3>
                <p className="text-sm leading-relaxed text-forest/70">{p(act.desc)}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Gallery */}
        <Section id="gallery" label={t.galleryLabel} title={t.galleryTitle}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img, index) => (
              <div
                key={index}
                onClick={() => setLb(index)}
                className="reveal group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-sand"
              >
                <img
                  src={img.url}
                  alt={p(img.caption)}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="absolute bottom-4 start-4 end-4 text-xs font-bold text-cream opacity-0 transition group-hover:opacity-100">
                  {p(img.caption)}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Lightbox Modal */}
        {lb !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/90 p-4 backdrop-blur-md">
            <button
              onClick={() => setLb(null)}
              className="absolute top-6 end-6 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={() => setLb((lb - 1 + gallery.length) % gallery.length)}
              className="absolute start-6 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="max-w-4xl max-h-[80vh] text-center">
              <img
                src={gallery[lb].url}
                alt={p(gallery[lb].caption)}
                className="max-h-[70vh] rounded-2xl object-contain mx-auto shadow-2xl"
              />
              <p className="mt-4 text-sm font-medium text-cream">{p(gallery[lb].caption)}</p>
            </div>

            <button
              onClick={() => setLb((lb + 1) % gallery.length)}
              className="absolute end-6 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Contact & Registration */}
        <section id="contact" className="py-20 lg:py-28 bg-forest text-cream">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="reveal space-y-6">
                <Eyebrow>{t.contactLabel}</Eyebrow>
                <h2 className="text-3xl font-bold sm:text-4xl">{t.contactTitle}</h2>
                <p className="text-cream/80 text-base leading-relaxed">{t.contactText}</p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-cream/60">{t.addressLabel}</div>
                      <div className="text-sm font-bold">{contact.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-cream/60">{t.phoneLabel}</div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sm font-bold dir-ltr hover:text-primary"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form / Map Embed */}
              <div id="register" className="reveal rounded-3xl bg-card p-8 text-forest shadow-soft">
                <h3 className="mb-6 text-2xl font-bold">{t.nav.register}</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.open(wa, "_blank");
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase">{t.formName}</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-forest/15 p-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase">{t.formPhone}</label>
                    <input
                      type="tel"
                      required
                      className="w-full rounded-xl border border-forest/15 p-3.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase">{t.formLevel}</label>
                    <select className="w-full rounded-xl border border-forest/15 p-3.5 text-sm focus:border-primary focus:outline-none">
                      {supportCourses.map((c) => (
                        <option key={c.level}>{c.level}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-glow transition hover:bg-primary/90"
                  >
                    {t.ctaRegister}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-forest/10 bg-cream py-8 text-center text-xs text-forest/60">
        <div className="mx-auto max-w-7xl px-5">
          <p>© {new Date().getFullYear()} Salaouandji School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
