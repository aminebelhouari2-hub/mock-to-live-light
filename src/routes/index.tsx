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
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SchoolOccasions } from "@/components/school-occasions";
import { Button } from "@/components/ui/button";
import { getAcademicYear } from "@/content/academic-year";
export { getAcademicYear } from "@/content/academic-year";
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
  supportPhotos,
  occasionTitle,
  serviceSeo,
  supportCourses,
  supportUi,
  translateSupport,
  ui,
  type IconKey,
  type Lang,
  type L,
} from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => {
    const academicYear = getAcademicYear();
    return ({
    meta: [
      { name: "keywords", content: serviceSeo.map(item => item.keywords).join("، ") },
      {
        title:
          "Salaouandji School | صلوانجي سكول — مدرسة خاصة بسيدي سعيد، تلمسان",
      },
      { name: "description", content: serviceSeo.map(item => item.description).join(" ") + ` التسجيل للموسم ${academicYear}.` },
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
  });
  },
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

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting &&
            (entry.target.classList.add("in"), io.unobserve(entry.target))
        ),
      { threshold: 0.12 }
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

function LogoDivider() {
  return <div aria-hidden="true" className="overflow-hidden border-y border-primary/25 bg-forest py-3"><div className="marquee-track">{Array.from({ length: 10 }, (_, i) => <span key={i} className="flex items-center gap-10 whitespace-nowrap text-xs font-semibold text-cream">SALAOUANDJI SCHOOL<img src={logo.url} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" /></span>)}</div></div>;
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
    <>
    <LogoDivider />
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow>{label}</Eyebrow>
          <h2 className="text-3xl font-bold text-forest sm:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
    </>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [menu, setMenu] = useState(false);
  const [academicYear, setAcademicYear] = useState(() => getAcademicYear());
  const [lb, setLb] = useState<number | null>(null);

  const t = ui[lang];
  const st = supportUi[lang];
  const activeImage = lb === null ? undefined : gallery[lb];
  const seasonText = (text: string) => text.replaceAll("{academicYear}", academicYear);

  useEffect(() => {
    const refresh = () => setAcademicYear(getAcademicYear());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, []);
  const p = (x: L) => x[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    p(contact.waMessage)
  )}`;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.mapQuery
  )}&output=embed`;

  const mapHref =
    contact.mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      contact.mapQuery
    )}`;

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
        setLb((i) => ((i ?? 0) + (dir === "rtl" ? -1 : 1) + n) % n);
      }
      if (e.key === "ArrowLeft") {
        setLb((i) => ((i ?? 0) + (dir === "rtl" ? 1 : -1) + n) % n);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb, dir]);

  const supportLabel = st.title;

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
    <div
      className="flex rounded-full bg-sand p-1"
      role="group"
      aria-label="Language"
    >
      {(["ar", "fr", "en"] as Lang[]).map((c) => (
        <Button variant="ghost"
          key={c}
          onClick={() => setLang(c)}
          aria-pressed={lang === c}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
            lang === c
              ? "bg-forest text-cream"
              : "text-forest/70 hover:text-forest"
          }`}
        >
          {c === "ar" ? "ع" : c.toUpperCase()}
        </Button>
      ))}
    </div>
  );

  return (
    <div
      dir={dir}
      className="relative overflow-x-hidden bg-background text-foreground"
    >
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
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 xl:flex xl:justify-between lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src={logo.url}
              alt="Salaouandji School"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div
                className="truncate font-display text-[15px] font-bold leading-tight text-forest"
                dir="ltr"
              >
                SALAOUANDJI <span className="text-primary">SCHOOL</span>
              </div>
              <div className="truncate text-[11.5px] text-forest/60">
                {t.tagline}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-3 xl:flex" aria-label="Main">
            {navs.map(([h, l]) => (
              <a
                key={h}
                href={h}
                className="whitespace-nowrap text-xs font-medium text-forest/70 transition hover:text-forest"
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
            <Button variant="ghost"
              onClick={() => setMenu(true)}
              aria-label={t.menu}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-forest xl:hidden"
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menu && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={() => setMenu(false)}
          />
          <div className="absolute inset-y-0 end-0 flex w-[82%] max-w-sm flex-col gap-2 bg-cream p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <LangSwitch />
              <Button variant="ghost"
                onClick={() => setMenu(false)}
                aria-label={t.close}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand"
              >
                <X />
              </Button>
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

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-24 lg:pt-16">
            <div className="reveal flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-peach px-4 py-2 text-[13px] font-bold text-forest">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                {seasonText(t.heroBadge)}
              </span>

              <h1 className="text-[2.35rem] font-bold leading-[1.2] text-forest sm:text-5xl lg:text-[3.6rem]">
                {t.heroTitle[0]}
                <br />
                <span className="text-primary">{t.heroTitle[1]}</span>
              </h1>

              <p className="max-w-[56ch] text-[17px] leading-[1.95] text-forest/75">
                {t.heroText}
              </p>

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
                alt={lang === "ar" ? "قاعة الدراسة في المدرسة" : lang === "fr" ? "Salle de classe de l’école" : "School classroom"}
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
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs text-forest/60">
                    {t.addressLabel}
                  </div>
                  <div className="text-sm font-bold text-forest">
                    Sidi Saïd, Tlemcen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div
          className="overflow-hidden border-y-2 border-primary bg-forest py-3.5"
          aria-hidden
        >
          <div className="marquee-track">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-semibold text-cream"
              >
                SALAOUANDJI SCHOOL — صلوانجي سكول
                <img src={logo.url} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full border border-primary/40 object-cover" />
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <section id="about" className="bg-dots relative bg-forest text-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="reveal">
              <Eyebrow>{t.aboutLabel}</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug sm:text-4xl">
                {t.aboutTitle}
              </h2>
            </div>
            <div className="reveal space-y-4 text-[16.5px] leading-[2] text-cream/80">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
              {t.pillars.map((x, i) => {
                const I = [ShieldCheck, Sparkles, Users][i] ?? ShieldCheck;
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
                  <h3 className="mb-2 text-lg font-semibold text-forest">
                    {p(s.title)}
                  </h3>
                  <p className="text-[15px] leading-7 text-forest/70">
                    {p(s.desc)}
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        <LogoDivider />
        {/* Support Courses */}
        <section id="support" className="relative bg-shell py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="reveal mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <div className="min-w-0">
                <Eyebrow>{st.year} <bdi>{academicYear}</bdi></Eyebrow>
                <h2 className="text-3xl font-bold text-forest sm:text-4xl">{st.title}</h2>
                <p className="mt-3 text-sm font-medium text-forest/70">{lang === "ar" ? "دروس الدعم في سيدي سعيد، تلمسان" : lang === "fr" ? "Soutien scolaire à Sidi Saïd, Tlemcen" : "School support in Sidi Saïd, Tlemcen"}</p>
              </div>
              <p className="max-w-xl text-base leading-8 text-forest/75">{st.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {supportCourses.map((course, index) => {
                const LevelIcon: LucideIcon = [BookOpen, School, GraduationCap][index] ?? BookOpen;
                return (
                  <article key={course.shortLevel} className="lift reveal flex min-w-0 flex-col rounded-lg border border-forest/10 border-t-4 border-t-primary bg-card shadow-soft overflow-hidden">
                    <img src={supportPhotos[index]?.src} alt={supportPhotos[index]?.alt[lang]} loading="lazy" width={640} height={480} className="aspect-[4/3] w-full object-cover" />
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <span className="w-fit rounded-full border border-primary/25 bg-peach px-4 py-1.5 font-display text-sm font-bold text-forest" dir="ltr">{course.shortLevel}</span>
                      <LevelIcon className="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold leading-snug text-forest">{translateSupport(course.level, lang)}</h3>
                    <p className="mb-6 mt-3 text-sm leading-7 text-forest/70">{translateSupport(course.description, lang)}</p>
                    <h4 className="mb-3 text-sm font-semibold text-forest">{st.subjects}</h4>
                    <ul className="mb-8 flex flex-wrap gap-2">
                      {course.subjects.map((subject) => <li key={subject} className="max-w-full rounded-md border border-forest/10 bg-shell px-3 py-1.5 text-xs font-medium leading-6 text-forest">{translateSupport(subject, lang)}</li>)}
                    </ul>
                    <Button asChild className="mt-auto h-auto w-full whitespace-normal py-3.5 font-bold">
                      <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle />{st.cta}<ArrowUpRight /></a>
                    </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Teachers */}
        <Section id="teachers" label={t.teachersLabel} title={t.teachersTitle}>
          {t.teachersNote && <p className="mb-8 text-center text-sm text-forest/70">{t.teachersNote}</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachers.map((m) => (
              <div
                key={m.name.ar}
                className="reveal group overflow-hidden rounded-3xl border border-forest/10 bg-card shadow-soft"
              >
                <div className="aspect-square overflow-hidden bg-sand">
                  {m.photo ? <img src={m.photo} alt={p(m.name)} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid h-full place-items-center"><Users className="h-16 w-16 text-forest/30" aria-hidden="true" /></div>}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-forest">{p(m.name)}</h3>
                  <p className="text-xs font-bold text-primary">{p(m.role)}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Activities */}
        <Section id="activities" label={t.activitiesLabel} title={t.activitiesTitle} className="bg-sand/40">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((act) => (
              <div
                key={act.title.ar}
                className="reveal rounded-3xl border border-forest/10 bg-card p-6 shadow-soft"
              >
                <img src={act.image} alt={lang === "ar" ? (act.icon === "kids" ? "نشاط ترفيهي للأطفال" : act.icon === "workshop" ? "ألعاب تعليمية" : act.icon === "review" || act.icon === "exam" ? "حصة دروس الدعم" : "قاعة التعلّم") : (act.icon === "kids" ? "Children’s celebration" : act.icon === "workshop" ? "Learning games" : act.icon === "review" || act.icon === "exam" ? "Support lesson" : "Learning classroom")} loading="lazy" width={640} height={480} className="mb-5 aspect-[4/3] w-full rounded-lg object-cover" />
                <h3 className="mb-2 text-xl font-bold text-forest">{p(act.title)}</h3>
                <p className="text-sm leading-relaxed text-forest/70">{p(act.desc)}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Gallery */}
        <Section id="gallery" label={t.galleryLabel} title={t.galleryTitle}>
          {t.galleryNote && <p className="mb-8 text-center text-sm text-forest/70">{t.galleryNote}</p>}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img, index) => (
              <Button variant="ghost"
                key={index}
                aria-label={p(img.alt)}
                onClick={() => setLb(index)}
                className="reveal group relative h-auto w-full aspect-[4/3] cursor-pointer overflow-hidden rounded-lg bg-sand p-0"
              >
                <img
                  src={img.src}
                  alt={p(img.alt)}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="absolute bottom-4 start-4 end-4 text-xs font-bold text-cream opacity-0 transition group-hover:opacity-100">
                  {p(img.alt)}
                </p>
              </Button>
            ))}
          </div>
        </Section>

        {/* Lightbox Modal */}
        {lb !== null && activeImage && (
          <div role="dialog" aria-modal="true" aria-label={t.galleryLabel} className="fixed inset-0 z-50 flex items-center justify-center bg-forest/90 p-4 backdrop-blur-md">
            <Button variant="ghost"
              aria-label={t.close}
              onClick={() => setLb(null)}
              className="absolute top-6 end-6 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button variant="ghost"
              aria-label={t.prev}
              onClick={() => setLb((lb - 1 + gallery.length) % gallery.length)}
              className="absolute bottom-6 start-6 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="max-w-4xl max-h-[80vh] text-center">
              <img
                src={activeImage.src}
                alt={p(activeImage.alt)}
                className="mx-auto max-h-[70vh] max-w-full rounded-lg object-contain shadow-soft"
              />
              <p className="mt-4 text-sm font-medium text-cream">{p(activeImage.alt)}</p>
            </div>

            <Button variant="ghost"
              aria-label={t.next}
              onClick={() => setLb((lb + 1) % gallery.length)}
              className="absolute bottom-6 end-6 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}

        <Section id="occasions" label={t.galleryLabel} title={p(occasionTitle)} className="bg-shell"><SchoolOccasions lang={lang} /></Section>

        {/* Schedule */}
        <Section id="schedule" label={t.scheduleLabel} title={t.scheduleTitle} className="bg-shell">
          <p className="mb-8 text-center text-sm text-forest/70">{t.scheduleNote}</p>
          <div className="hidden overflow-x-auto rounded-lg border border-forest/10 bg-card md:block">
            <table className="w-full text-start text-sm">
              <thead className="bg-forest text-cream"><tr><th scope="col" className="p-4 text-start">{t.time}</th>{schedule.days.map(day => <th scope="col" key={day.ar} className="p-4 text-start">{p(day)}</th>)}</tr></thead>
              <tbody>{schedule.slots.map(slot => <tr key={slot.time} className="border-t border-forest/10"><th scope="row" className="whitespace-nowrap p-4 text-start font-medium"><bdi>{slot.time}</bdi></th>{slot.cells.map((cell, i) => <td key={i} className="p-4">{schedule.labels[cell] ? p(schedule.labels[cell]) : "—"}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:hidden">{schedule.days.map((day, i) => <article key={day.ar} className="rounded-lg border border-forest/10 bg-card p-5"><h3 className="mb-4 font-bold text-forest">{p(day)}</h3><ul className="space-y-3">{schedule.slots.map(slot => { const label = schedule.labels[slot.cells[i] ?? ""]; return <li key={slot.time} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm"><span>{label ? p(label) : "—"}</span><bdi className="text-xs text-forest/65">{slot.time}</bdi></li>; })}</ul></article>)}</div>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials" label={t.testimonialsLabel} title={t.testimonialsTitle}>
          <p className="mb-8 text-center text-sm text-forest/70">{t.testimonialsNote}</p>
          <div className="grid gap-6 md:grid-cols-3">{testimonials.map(item => <figure key={item.author.ar} className="reveal rounded-lg border border-forest/10 bg-card p-7 shadow-soft"><MessageCircle className="mb-5 h-7 w-7 text-primary" aria-hidden="true" /><blockquote className="mb-6 text-base leading-8 text-forest/75">{p(item.quote)}</blockquote><figcaption className="text-sm font-bold text-forest">{p(item.author)}</figcaption></figure>)}</div>
        </Section>

        <LogoDivider />
        {/* Registration */}
        <section id="register" className="bg-shell py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div className="reveal min-w-0">
              <Eyebrow>{t.regLabel}</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug text-forest sm:text-4xl">{seasonText(t.regTitle)}</h2>
              <p className="mb-8 mt-5 text-base leading-8 text-forest/75">{t.regText}</p>
              <ol className="space-y-6">{t.regSteps.map((step, i) => <li key={step.t} className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-peach text-sm font-bold text-forest">{i + 1}</span><div className="min-w-0"><h3 className="font-bold text-forest">{step.t}</h3><p className="mt-1 text-sm text-forest/70">{step.d}</p></div></li>)}</ol>
              <Button asChild variant="outline" className="mt-8 h-auto py-3"><a href={`tel:${contact.phoneTel}`}><Phone />{t.regCall}</a></Button>
            </div>
            <div className="reveal rounded-lg border border-forest/10 bg-card p-6 shadow-soft sm:p-8">
              <h3 className="mb-6 text-2xl font-bold text-forest">{t.nav.register}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const text = `${p(contact.waMessage)}\n${st.name}: ${String(data.get("parentName") ?? "")}\n${st.phone}: ${String(data.get("phone") ?? "")}\n${st.level}: ${String(data.get("level") ?? "")}\n${st.year}: ${academicYear}`;
                window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
              }} className="space-y-5">
                <div><label htmlFor="parent-name" className="mb-2 block text-sm font-semibold text-forest">{st.name}</label><input id="parent-name" name="parentName" autoComplete="name" required className="w-full rounded-md border border-forest/15 bg-card p-3.5 text-sm text-forest" /></div>
                <div><label htmlFor="parent-phone" className="mb-2 block text-sm font-semibold text-forest">{st.phone}</label><input id="parent-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" required className="w-full rounded-md border border-forest/15 bg-card p-3.5 text-sm text-forest" /></div>
                <div><label htmlFor="school-level" className="mb-2 block text-sm font-semibold text-forest">{st.level}</label><select id="school-level" name="level" className="w-full rounded-md border border-forest/15 bg-card p-3.5 text-sm text-forest"><option>{t.heroPoints[0]}</option>{supportCourses.map(c => <option key={c.shortLevel}>{translateSupport(c.level, lang)}</option>)}</select></div>
                <Button type="submit" className="h-auto w-full whitespace-normal py-4 font-bold"><MessageCircle />{t.ctaRegister}</Button>
              </form>
            </div>
          </div>
        </section>

        <LogoDivider />
        {/* Contact */}
        <section id="contact" className="bg-forest py-20 text-cream lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div className="reveal min-w-0">
              <Eyebrow>{t.contactLabel}</Eyebrow>
              <h2 className="mb-8 text-3xl font-bold leading-snug sm:text-4xl">{t.contactTitle}</h2>
              <address className="space-y-6 not-italic">
                <div className="flex gap-4"><MapPin className="h-6 w-6 shrink-0 text-primary" /><div className="min-w-0"><p className="mb-1 text-xs text-cream/65">{t.addressLabel}</p><p className="text-sm font-semibold leading-7">{p(contact.address)}</p></div></div>
                <div className="flex gap-4"><Phone className="h-6 w-6 shrink-0 text-primary" /><div className="min-w-0"><p className="mb-1 text-xs text-cream/65">{t.phoneLabel}</p><a href={`tel:${contact.phoneTel}`} className="text-sm font-semibold hover:text-primary"><bdi>{contact.phoneDisplay}</bdi></a></div></div>
                <div className="flex gap-4"><Mail className="h-6 w-6 shrink-0 text-primary" /><div className="min-w-0"><p className="mb-1 text-xs text-cream/65">{t.emailLabel}</p><a href={`mailto:${contact.email}`} className="break-all text-sm font-semibold hover:text-primary" dir="ltr">{contact.email}</a></div></div>
              </address>
              <div className="mt-8 flex gap-3" aria-label={t.follow}>
                <Button asChild variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-primary"><a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a></Button>
                <Button asChild variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-primary"><a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a></Button>
                <Button asChild variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-primary"><a href={contact.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Music /></a></Button>
                <Button asChild variant="ghost" size="icon" className="text-cream hover:bg-cream/10 hover:text-primary"><a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle /></a></Button>
              </div>
            </div>
            <div className="reveal min-w-0">
              <iframe src={mapSrc} title={t.contactLabel} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-lg border border-cream/20 bg-shell" />
              <p className="mt-4 text-xs leading-6 text-cream/70">{t.mapNote}</p>
              <Button asChild variant="ghost" className="mt-2 text-cream hover:bg-cream/10 hover:text-primary"><a href={mapHref} target="_blank" rel="noopener noreferrer"><MapPin />{t.openMap}<ArrowUpRight /></a></Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-forest/10 bg-cream py-10 text-sm text-forest/70">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="min-w-0"><a href="#top" className="flex items-center gap-3 font-display font-bold text-forest"><img src={logo.url} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" /><span dir="ltr">SALAOUANDJI SCHOOL</span></a><p className="mt-4 max-w-md leading-7">{t.footerAbout}</p></div>
            <div><h3 className="mb-4 font-bold text-forest">{t.footerLinks}</h3><nav className="grid grid-cols-2 gap-3">{[...navs, ["#register", t.nav.register] as [string, string]].map(([href,label]) => <a key={href} href={href} className="hover:text-primary">{label}</a>)}</nav></div>
          </div>
          <p className="mt-8 border-t border-forest/10 pt-6 text-center text-xs">© {new Date().getFullYear()} Salaouandji School — {lang === "ar" ? "جميع الحقوق محفوظة" : lang === "fr" ? "Tous droits réservés" : "All rights reserved"}</p>
        </div>
      </footer>
    </div>
  );
}