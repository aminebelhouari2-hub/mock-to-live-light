import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  GraduationCap, Languages, Palette, BookOpen, Brush, BookText, Puzzle, Music,
  MapPin, Phone, Mail, Facebook, School,
} from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { T, type Lang } from "@/lib/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Salaouandji School | صلوانجي سكول - مدرسة تحضيرية بتلمسان" },
      { name: "description", content: "صلوانجي سكول مدرسة خاصة في حي سيدي سعيد بتلمسان، تقدم أقسامًا تحضيرية وورشات لغة إنجليزية وأنشطة تربوية للأطفال." },
      { property: "og:title", content: "Salaouandji School | صلوانجي سكول" },
      { property: "og:description", content: "مدرسة تحضيرية خاصة في سيدي سعيد، تلمسان — تعلّم، تطوّر، وابدأ رحلتك نحو النجاح." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_DZ" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "tel:+213556057176";
const EMAIL = "mailto:hibasalaouandji@gmail.com";

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    const raw = (navigator.language || "ar").toLowerCase();
    setLang(raw.startsWith("fr") ? "fr" : raw.startsWith("en") ? "en" : "ar");
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  const t = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  const services = [
    { icon: GraduationCap, title: t.svc1Title, desc: t.svc1Desc, bg: "bg-secondary" },
    { icon: Languages, title: t.svc2Title, desc: t.svc2Desc, bg: "bg-sand" },
    { icon: Palette, title: t.svc3Title, desc: t.svc3Desc, bg: "bg-secondary" },
  ];
  const gallery = [
    { icon: BookOpen, title: t.g1Title, desc: t.g1Desc, bg: "bg-forest text-primary" },
    { icon: Languages, title: t.g2Title, desc: t.g2Desc, bg: "bg-primary text-primary-foreground" },
    { icon: Brush, title: t.g3Title, desc: t.g3Desc, bg: "bg-secondary text-forest" },
    { icon: BookText, title: t.g4Title, desc: t.g4Desc, bg: "bg-secondary text-forest" },
    { icon: Puzzle, title: t.g5Title, desc: t.g5Desc, bg: "bg-forest text-primary" },
    { icon: Music, title: t.g6Title, desc: t.g6Desc, bg: "bg-primary text-primary-foreground" },
  ];
  const navs: [string, string][] = [
    ["#about", t.navAbout], ["#services", t.navServices], ["#gallery", t.navGallery],
    ["#registration", t.navRegistration], ["#contact", t.navContact],
  ];

  const Marquee = ({ text }: { text: string }) => (
    <div className="overflow-hidden border-y-[3px] border-primary bg-forest py-4">
      <div className="marquee-track">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex flex-none items-center gap-3.5">
            <img src={logo.url} alt="" className="h-7 w-7 object-contain" />
            <span className="whitespace-nowrap text-sm font-extrabold tracking-wide text-cream">{text}</span>
            <span className="text-lg text-primary">•</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div dir={dir} className="relative overflow-x-hidden bg-background text-foreground">
      <a href={`https://wa.me/213556057176?text=${encodeURIComponent(decodeURIComponent(t.waText))}`} target="_blank" rel="noopener" aria-label={t.waLabel}
        className="wa-float fixed bottom-6 end-6 z-50 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-whatsapp">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.05-1.33A10 10 0 1012 2z" className="fill-whatsapp" /><path d="M17.3 14.2c-.3-.15-1.73-.85-2-.95-.27-.1-.47-.15-.67.15s-.76.95-.93 1.15c-.17.2-.34.22-.63.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.73-.7 1.98-1.39.24-.68.24-1.26.17-1.39-.07-.12-.27-.2-.57-.35z" className="fill-primary-foreground" /></svg>
      </a>

      <header className="sticky top-0 z-20 border-b border-forest/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-5 py-3.5 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo.url} alt="شعار صلوانجي سكول" className="h-[50px] w-[50px] object-contain" />
            <div>
              <div className="text-lg font-black leading-tight text-forest">SALAOUANDJI <span className="text-primary">SCHOOL</span></div>
              <div className="text-[11.5px] opacity-60">{t.headerTagline}</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {navs.map(([h, l]) => (
              <a key={h} href={h} className="text-[14.5px] font-medium opacity-80 hover:opacity-100">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5 rounded-full bg-sand p-[3px]">
              {(["ar", "fr", "en"] as Lang[]).map((c) => (
                <button key={c} onClick={() => setLang(c)}
                  className={`rounded-full px-[11px] py-1.5 text-xs font-extrabold ${lang === c ? "bg-primary text-primary-foreground" : "opacity-60"}`}>
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
            <a href={PHONE} dir="ltr" className="whitespace-nowrap rounded-[10px] bg-primary px-[18px] py-2.5 text-[13.5px] font-bold text-primary-foreground">0556 05 71 76</a>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="float-a absolute end-[6%] top-[60px] h-[120px] w-[120px] rounded-full bg-secondary opacity-60" />
        <div className="float-b absolute bottom-2.5 start-[4%] h-[90px] w-[90px] rounded-[28px] bg-peach opacity-70" />
        <div className="float-c absolute start-[46%] top-[40%] h-[60px] w-[60px] rounded-full bg-primary opacity-[.12]" />
        <div className="relative z-[1] mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-5 py-14 md:px-8">
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-[22px]">
            <div className="self-start rounded-full bg-peach px-4 py-2 text-[13px] font-bold text-primary">{t.heroBadge}</div>
            <h1 className="text-4xl font-black leading-[1.22] text-forest md:text-5xl">{t.heroTitle}</h1>
            <p className="max-w-[52ch] text-[17.5px] leading-[1.9] opacity-80">{t.heroText}</p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <a href="#registration" className="rounded-xl bg-primary px-[30px] py-[15px] text-base font-bold text-primary-foreground hover:bg-primary/90">{t.heroCta1}</a>
              <a href="#contact" className="rounded-xl border-2 border-forest/20 px-[30px] py-[15px] text-base font-bold hover:opacity-85">{t.heroCta2}</a>
            </div>
          </div>
          <div className="flex min-w-[260px] flex-[1_1_320px] justify-center">
            <div className="relative w-full max-w-[360px]">
              <div className="absolute -inset-[18px] -rotate-[5deg] rounded-[32px] bg-secondary" />
              <img src={logo.url} alt="شعار صلوانجي سكول" className="relative z-[1] block w-full drop-shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <Marquee text={t.marqueeText} />

      <section id="about" className="bg-forest text-cream">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-12 px-5 py-14 md:px-8">
          <div className="min-w-[240px] flex-[1_1_260px]">
            <div className="mb-2.5 text-[13px] font-bold tracking-wide text-primary">{t.aboutLabel}</div>
            <h2 className="text-[30px] font-extrabold leading-[1.35]">{t.aboutTitle}</h2>
          </div>
          <div className="min-w-[260px] flex-[1.3_1_320px] text-base leading-loose opacity-90">
            <p className="mb-3.5">{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1240px] px-5 py-20 md:px-8">
        <SectionHead label={t.servicesLabel} title={t.servicesTitle} sub={t.servicesSubtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map(({ icon: I, title, desc, bg }) => (
            <div key={title} className={`lift rounded-[20px] p-[30px] ${bg}`}>
              <div className="mb-[18px] flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-primary text-primary-foreground"><I size={26} /></div>
              <h3 className="mb-2.5 text-lg font-extrabold text-forest">{title}</h3>
              <p className="text-[14.5px] leading-[1.85] opacity-80">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="bg-shell">
        <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8">
          <SectionHead label={t.galleryLabel} title={t.galleryTitle} sub={t.gallerySubtitle} />
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map(({ icon: I, title, desc, bg }) => (
              <div key={title} className="lift overflow-hidden rounded-[18px] bg-card">
                <div className={`flex h-32 items-center justify-center ${bg}`}><I size={48} /></div>
                <div className="px-5 py-[18px]">
                  <h4 className="mb-1.5 text-[15.5px] font-extrabold text-forest">{title}</h4>
                  <p className="text-[13.5px] leading-[1.7] opacity-70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee text={t.heroTitlePlain} />

      <section id="registration" className="mx-auto mb-20 mt-16 max-w-[1240px] px-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl bg-primary p-8 md:p-11">
          <div className="min-w-[240px] flex-[1_1_320px] text-primary-foreground">
            <h2 className="mb-2.5 text-2xl font-extrabold">{t.regTitle}</h2>
            <p className="text-[15px] leading-[1.8] opacity-90">{t.regText}</p>
          </div>
          <a href={PHONE} className="flex-none rounded-xl bg-card px-[30px] py-[15px] text-[15.5px] font-extrabold text-forest">{t.regCta}</a>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1240px] px-5 pb-20 md:px-8">
        <div className="flex flex-wrap gap-[22px]">
          <ContactCard icon={MapPin} label={t.contactAddressLabel}><div className="text-[15px] font-semibold leading-[1.7] text-forest">{t.contactAddress}</div></ContactCard>
          <ContactCard icon={Phone} label={t.contactPhoneLabel}><a href={PHONE} dir="ltr" className="inline-block text-[15px] font-semibold text-forest">0556 05 71 76</a></ContactCard>
          <ContactCard icon={Mail} label={t.contactEmailLabel}><a href={EMAIL} className="break-all text-sm font-semibold text-forest">hibasalaouandji@gmail.com</a></ContactCard>
          <ContactCard icon={Facebook} label={t.contactFbLabel}><div className="text-[14.5px] font-semibold text-forest">Salaouandji School | Tlemcen</div></ContactCard>
        </div>
      </section>

      <footer className="bg-night text-cream">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-5 py-[30px] md:px-8">
          <div className="flex items-center gap-2.5">
            <img src={logo.url} alt="" className="h-7 w-7 object-contain" />
            <div className="text-[13.5px] opacity-65">{t.footerCopy}</div>
          </div>
          <div className="flex gap-5 text-[13.5px] opacity-70">
            <a href={PHONE} dir="ltr">0556 05 71 76</a>
            <a href={EMAIL}>{t.footerWriteUs}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div className="mx-auto mb-11 max-w-[620px] text-center">
      <div className="mb-2.5 text-[13px] font-bold tracking-wide text-primary">{label}</div>
      <h2 className="mb-3.5 text-[32px] font-extrabold text-forest">{title}</h2>
      <p className="text-[15.5px] leading-[1.8] opacity-70">{sub}</p>
    </div>
  );
}

function ContactCard({ icon: I, label, children }: { icon: typeof School; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-[220px] flex-[1_1_220px] rounded-[18px] bg-secondary p-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] bg-forest text-primary"><I size={20} /></div>
      <div className="mb-1.5 text-[12.5px] font-bold opacity-60">{label}</div>
      {children}
    </div>
  );
}
