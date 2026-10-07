import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BookA, Calculator, Languages, Palette, BookOpen, Music, RotateCcw, Wrench, FlaskConical,
  Smile, GraduationCap, Puzzle, MapPin, Phone, Mail, Facebook, Instagram, Menu, X,
  ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Users, Quote, MessageCircle, UserRound,
} from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import {
  activities, contact, gallery, images, schedule, subjects, teachers, testimonials, ui,
  type IconKey, type Lang, type L,
} from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salaouandji School | صلوانجي سكول — مدرسة خاصة بسيدي سعيد، تلمسان" },
      { name: "description", content: "صلوانجي سكول مدرسة خاصة في سيدي سعيد، تلمسان: أقسام تحضيرية، ورشات لغة إنجليزية وأنشطة تربوية. التسجيل مفتوح للموسم 2025/2026." },
      { property: "og:title", content: "Salaouandji School | صلوانجي سكول — تلمسان" },
      { property: "og:description", content: "مدرسة خاصة في سيدي سعيد، تلمسان — تعلّم، تطوّر، وابدأ رحلتك نحو النجاح." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_DZ" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ICONS: Record<IconKey, typeof BookA> = {
  letters: BookA, numbers: Calculator, english: Languages, arts: Palette, stories: BookOpen, music: Music,
  review: RotateCcw, workshop: Wrench, science: FlaskConical, kids: Smile, exam: GraduationCap, games: Puzzle,
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [menu, setMenu] = useState(false);
  const [lb, setLb] = useState<number | null>(null);
  const t = ui[lang];
  const p = (x: L) => x[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(p(contact.waMessage))}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const mapHref = contact.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;
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
      if (e.key === "ArrowRight") setLb((i) => (i! + (dir === "rtl" ? -1 : 1) + n) % n);
      if (e.key === "ArrowLeft") setLb((i) => (i! + (dir === "rtl" ? 1 : -1) + n) % n);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [lb, dir]);

  const navs: [string, string][] = [
    ["#about", t.nav.about], ["#subjects", t.nav.subjects], ["#teachers", t.nav.teachers], ["#activities", t.nav.activities],
    ["#gallery", t.nav.gallery], ["#schedule", t.nav.schedule], ["#contact", t.nav.contact],
  ];

  const LangSwitch = () => (
    <div className="flex rounded-full bg-sand p-1" role="group" aria-label="Language">
      {(["ar", "fr"] as Lang[]).map((c) => (
        <button key={c} onClick={() => setLang(c)} aria-pressed={lang === c}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${lang === c ? "bg-forest text-cream" : "text-forest/70 hover:text-forest"}`}>
          {c === "ar" ? "ع" : "FR"}
        </button>
      ))}
    </div>
  );

  return (
    <div dir={dir} className="relative overflow-x-hidden bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:p-3">Skip</a>

      {/* WhatsApp */}
      <a href={wa} target="_blank" rel="noopener" aria-label={t.ctaWhatsapp}
        className="wa-float fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-soft">
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-forest/10 bg-cream/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img src={logo.url} alt="Salaouandji School" width={44} height={44} className="h-11 w-11 shrink-0 rounded-xl object-contain" />
            <div className="min-w-0">
              <div className="truncate font-display text-[15px] font-bold leading-tight text-forest" dir="ltr">SALAOUANDJI <span className="text-primary">SCHOOL</span></div>
              <div className="truncate text-[11.5px] text-forest/60">{t.tagline}</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {navs.map(([h, l]) => <a key={h} href={h} className="text-sm font-medium text-forest/70 transition hover:text-forest">{l}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><LangSwitch /></div>
            <a href="#register" className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 md:inline-block">{t.nav.register}</a>
            <button onClick={() => setMenu(true)} aria-label={t.menu} className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-forest lg:hidden"><Menu /></button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={() => setMenu(false)} />
          <div className="absolute inset-y-0 end-0 flex w-[82%] max-w-sm flex-col gap-2 bg-cream p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <LangSwitch />
              <button onClick={() => setMenu(false)} aria-label={t.close} className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand"><X /></button>
            </div>
            {[...navs, ["#register", t.nav.register] as [string, string]].map(([h, l]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="rounded-xl px-4 py-3 text-lg font-semibold text-forest hover:bg-sand">{l}</a>
            ))}
            <a href={wa} target="_blank" rel="noopener" className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-whatsapp py-3.5 font-bold text-primary-foreground"><MessageCircle className="h-5 w-5" />{t.ctaWhatsapp}</a>
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
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />{t.heroBadge}
              </span>
              <h1 className="text-[2.35rem] font-bold leading-[1.2] text-forest sm:text-5xl lg:text-[3.6rem]">
                {t.heroTitle[0]}<br /><span className="text-primary">{t.heroTitle[1]}</span>
              </h1>
              <p className="max-w-[56ch] text-[17px] leading-[1.95] text-forest/75">{t.heroText}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#register" className="rounded-2xl bg-primary px-7 py-4 text-center text-base font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5">{t.ctaRegister}</a>
                <a href={wa} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl border-2 border-forest/15 bg-card px-7 py-4 text-base font-bold text-forest transition hover:border-whatsapp">
                  <MessageCircle className="h-5 w-5 text-whatsapp" />{t.ctaWhatsapp}
                </a>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm font-medium text-forest/70">
                {t.heroPoints.map((x) => <li key={x} className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />{x}</li>)}
              </ul>
            </div>
            <div className="reveal relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-3 -z-10 rotate-[-3deg] rounded-[2.5rem] bg-primary/90" />
              <img src={images.hero} alt={t.sample} width={1600} height={1104} fetchPriority="high" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft sm:aspect-[5/4]" />
              <div className="glass absolute -bottom-6 start-4 flex items-center gap-3 rounded-2xl p-3 pe-5 shadow-soft sm:start-[-1.5rem]">
                <img src={logo.url} alt="" width={48} height={48} className="h-12 w-12 rounded-xl object-contain" />
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
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-semibold text-cream">
                SALAOUANDJI SCHOOL — صلوانجي سكول <span className="text-primary">✦</span>
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
              <p>{t.aboutP1}</p><p>{t.aboutP2}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
              {t.pillars.map((x, i) => {
                const I = [ShieldCheck, Sparkles, Users][i];
                return (
                  <div key={x.t} className="reveal rounded-3xl border border-cream/10 bg-cream/5 p-6 backdrop-blur">
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
                <article key={s.icon} className="lift reveal group rounded-3xl border border-forest/10 bg-card p-7 shadow-soft">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-peach text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><I className="h-7 w-7" /></div>
                  <h3 className="mb-2 text-lg font-semibold text-forest">{p(s.title)}</h3>
                  <p className="text-[15px] leading-7 text-forest/70">{p(s.desc)}</p>
                </article>
              );
            })}
          </div>
        </Section>

        {/* Teachers */}
        <section id="teachers" className="bg-shell">
          <Inner label={t.teachersLabel} title={t.teachersTitle} note={t.teachersNote}>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {teachers.map((x, i) => (
                <div key={i} className="reveal rounded-3xl bg-card p-5 text-center shadow-soft">
                  <div className="mx-auto mb-4 flex aspect-square w-full max-w-[150px] items-center justify-center overflow-hidden rounded-full bg-sand">
                    {x.photo ? <img src={x.photo} alt={p(x.name)} loading="lazy" className="h-full w-full object-cover" /> : <UserRound className="h-14 w-14 text-forest/30" />}
                  </div>
                  <div className="font-semibold text-forest">{p(x.name)}</div>
                  <div className="mt-1 text-sm text-forest/60">{p(x.role)}</div>
                </div>
              ))}
            </div>
          </Inner>
        </section>

        {/* Activities */}
        <Section id="activities" label={t.activitiesLabel} title={t.activitiesTitle}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => {
              const I = ICONS[a.icon];
              return (
                <article key={a.icon} className="lift reveal overflow-hidden rounded-3xl bg-card shadow-soft">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={a.image} alt={p(a.title)} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                    <span className="glass absolute end-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold text-forest">{t.sample}</span>
                    <span className="absolute -bottom-6 start-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><I className="h-6 w-6" /></span>
                  </div>
                  <div className="p-6 pt-9">
                    <h3 className="mb-2 text-lg font-semibold text-forest">{p(a.title)}</h3>
                    <p className="text-[15px] leading-7 text-forest/70">{p(a.desc)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* Gallery */}
        <section id="gallery" className="bg-forest text-cream">
          <Inner dark label={t.galleryLabel} title={t.galleryTitle} note={t.galleryNote}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setLb(i)} aria-label={p(g.alt)}
                  className={`reveal group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <img src={g.src} alt={p(g.alt)} loading="lazy" className="aspect-square h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute bottom-3 start-3 text-start text-sm font-semibold opacity-0 transition group-hover:opacity-100">{p(g.alt)}</span>
                </button>
              ))}
            </div>
          </Inner>
        </section>

        {/* Schedule */}
        <Section id="schedule" label={t.scheduleLabel} title={t.scheduleTitle} note={t.scheduleNote}>
          <div className="reveal overflow-x-auto rounded-3xl border border-forest/10 bg-card shadow-soft">
            <table className="w-full min-w-[640px] border-collapse text-center text-sm">
              <thead>
                <tr className="bg-forest text-cream">
                  <th className="p-4 text-start font-semibold">{t.time}</th>
                  {schedule.days.map((d) => <th key={d.fr} className="p-4 font-semibold">{p(d)}</th>)}
                </tr>
              </thead>
              <tbody>
                {schedule.slots.map((s) => (
                  <tr key={s.time} className="border-t border-forest/10">
                    <td className="whitespace-nowrap p-4 text-start font-semibold text-forest" dir="ltr">{s.time}</td>
                    {s.cells.map((c, i) => (
                      <td key={i} className="p-2">
                        {c && <span className="block rounded-xl bg-shell px-2 py-2.5 font-medium text-forest">{p(schedule.labels[c])}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Testimonials */}
        <section className="bg-shell">
          <Inner label={t.testimonialsLabel} title={t.testimonialsTitle} note={t.testimonialsNote}>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((x, i) => (
                <figure key={i} className="reveal rounded-3xl border border-dashed border-forest/20 bg-card p-7">
                  <Quote className="mb-4 h-8 w-8 text-primary" />
                  <blockquote className="leading-8 text-forest/80">{p(x.quote)}</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-forest/60">— {p(x.author)}</figcaption>
                </figure>
              ))}
            </div>
          </Inner>
        </section>

        {/* Registration */}
        <section id="register" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="reveal relative overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
            <div className="bg-dots absolute inset-0 opacity-60" />
            <div className="float-c absolute -end-16 -top-16 h-64 w-64 rounded-full bg-cream/15" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <Eyebrow light>{t.regLabel}</Eyebrow>
                <h2 className="mb-4 text-3xl font-bold leading-snug sm:text-4xl">{t.regTitle}</h2>
                <p className="mb-8 max-w-xl leading-8 opacity-95">{t.regText}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href={wa} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl bg-forest px-7 py-4 font-bold text-cream transition hover:-translate-y-0.5"><MessageCircle className="h-5 w-5" />{t.ctaWhatsapp}</a>
                  <a href={`tel:${contact.phoneTel}`} className="flex items-center justify-center gap-2 rounded-2xl bg-cream px-7 py-4 font-bold text-forest"><Phone className="h-5 w-5" />{t.regCall} <span dir="ltr">{contact.phoneDisplay}</span></a>
                </div>
              </div>
              <ol className="grid gap-3">
                {t.regSteps.map((s, i) => (
                  <li key={s.t} className="flex items-center gap-4 rounded-2xl bg-cream/15 p-4 backdrop-blur">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream font-display text-lg font-bold text-primary">{i + 1}</span>
                    <div><div className="font-semibold">{s.t}</div><div className="text-sm opacity-85">{s.d}</div></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Contact & map */}
        <section id="contact" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
          <Head label={t.contactLabel} title={t.contactTitle} />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="grid gap-4">
              <Info icon={MapPin} label={t.addressLabel}><span className="font-semibold text-forest">{p(contact.address)}</span></Info>
              <Info icon={Phone} label={t.phoneLabel}><a href={`tel:${contact.phoneTel}`} dir="ltr" className="font-semibold text-forest">{contact.phoneDisplay}</a></Info>
              <Info icon={Mail} label={t.emailLabel}><a href={`mailto:${contact.email}`} className="break-all font-semibold text-forest">{contact.email}</a></Info>
            </div>
            <div className="reveal overflow-hidden rounded-3xl border border-forest/10 bg-card shadow-soft">
              <iframe title="Map — Sidi Saïd, Tlemcen" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full border-0 lg:h-[26rem]" />
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-forest/60">{t.mapNote}</p>
                <a href={mapHref} target="_blank" rel="noopener" className="shrink-0 rounded-xl bg-forest px-4 py-2.5 text-center text-sm font-semibold text-cream">{t.openMap}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-night text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src={logo.url} alt="" width={44} height={44} className="h-11 w-11 rounded-xl bg-cream object-contain" />
              <span className="font-display font-bold" dir="ltr">SALAOUANDJI <span className="text-primary">SCHOOL</span></span>
            </div>
            <p className="max-w-md text-sm leading-7 text-cream/65">{t.footerAbout}</p>
            <div className="mt-5 flex gap-3" aria-label={t.follow}>
              <Social href={contact.social.facebook} label="Facebook"><Facebook className="h-5 w-5" /></Social>
              {contact.social.instagram && <Social href={contact.social.instagram} label="Instagram"><Instagram className="h-5 w-5" /></Social>}
              <Social href={wa} label="WhatsApp"><MessageCircle className="h-5 w-5" /></Social>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary">{t.footerLinks}</h3>
            <ul className="grid gap-2 text-sm text-cream/70">{navs.map(([h, l]) => <li key={h}><a href={h} className="hover:text-cream">{l}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary">{t.footerContact}</h3>
            <ul className="grid gap-3 text-sm text-cream/70">
              <li>{p(contact.address)}</li>
              <li><a href={`tel:${contact.phoneTel}`} dir="ltr" className="hover:text-cream">{contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${contact.email}`} className="break-all hover:text-cream">{contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">{t.rights}</div>
      </footer>

      {/* Lightbox */}
      {lb !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 p-4 backdrop-blur" role="dialog" aria-modal="true" onClick={() => setLb(null)}>
          <button aria-label={t.close} className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream" onClick={() => setLb(null)}><X /></button>
          <button aria-label={t.prev} className="absolute start-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream"
            onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + gallery.length) % gallery.length); }}>{dir === "rtl" ? <ChevronRight /> : <ChevronLeft />}</button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lb].src} alt={p(gallery[lb].alt)} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-cream/80">{p(gallery[lb].alt)} · {t.sample}</figcaption>
          </figure>
          <button aria-label={t.next} className="absolute end-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream"
            onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % gallery.length); }}>{dir === "rtl" ? <ChevronLeft /> : <ChevronRight />}</button>
        </div>
      )}
    </div>
  );
}

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <div className={`mb-3 inline-flex items-center gap-2 text-[13px] font-bold ${light ? "text-primary-foreground" : "text-primary"}`}><span className="h-px w-6 bg-current" />{children}</div>;
}
function Head({ label, title, note, dark }: { label: string; title: string; note?: string; dark?: boolean }) {
  return (
    <div className="reveal mx-auto mb-12 max-w-2xl text-center">
      <Eyebrow>{label}</Eyebrow>
      <h2 className={`text-3xl font-bold leading-snug sm:text-4xl ${dark ? "text-cream" : "text-forest"}`}>{title}</h2>
      {note && <p className={`mt-4 text-sm ${dark ? "text-cream/60" : "text-forest/55"}`}>{note}</p>}
    </div>
  );
}
function Inner(props: { label: string; title: string; note?: string; dark?: boolean; children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><Head {...props} />{props.children}</div>;
}
function Section({ id, ...props }: { id: string; label: string; title: string; note?: string; children: ReactNode }) {
  return <section id={id}><Inner {...props} /></section>;
}
function Info({ icon: I, label, children }: { icon: typeof MapPin; label: string; children: ReactNode }) {
  return (
    <div className="reveal flex items-start gap-4 rounded-3xl bg-shell p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-primary"><I className="h-5 w-5" /></span>
      <div className="min-w-0"><div className="mb-1 text-xs font-semibold text-forest/55">{label}</div>{children}</div>
    </div>
  );
}
function Social({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/10 transition hover:bg-primary">{children}</a>;
}

// keep ref import used for potential future use
void useRef;
