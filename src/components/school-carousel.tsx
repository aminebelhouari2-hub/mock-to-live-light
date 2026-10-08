import { Children, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ui, type Lang } from "@/content/site";

export function SchoolCarousel({ lang, label, children, single = false, autoAdvance = true, className = "" }: {
  lang: Lang; label: string; children: ReactNode; single?: boolean; autoAdvance?: boolean; className?: string;
}) {
  const slides = Children.toArray(children);
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(slides.length);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.15 });
    observer.observe(root);
    return () => observer.disconnect();
  }, [root]);
  useEffect(() => {
    if (!api) return;
    const update = () => { setSelected(api.selectedScrollSnap()); setCount(api.scrollSnapList().length); };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  useEffect(() => {
    if (!api || !autoAdvance || paused || interacting || reducedMotion || !visible || count < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) { if (api.canScrollNext()) api.scrollNext(); else api.scrollTo(0); }
    }, 4500);
    return () => window.clearInterval(timer);
  }, [api, autoAdvance, paused, interacting, reducedMotion, visible, count]);
  const playLabel = lang === "ar" ? "تشغيل العرض" : lang === "fr" ? "Lire le diaporama" : "Play slideshow";
  const pauseLabel = lang === "ar" ? "إيقاف العرض" : lang === "fr" ? "Mettre en pause" : "Pause slideshow";
  return <Carousel ref={setRoot} key={lang} setApi={setApi} dir={lang === "ar" ? "rtl" : "ltr"}
    opts={{ loop: true, direction: lang === "ar" ? "rtl" : "ltr", align: "start" }}
    aria-label={label} className={`min-w-0 ${className}`}
    onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
    onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }}>
    <CarouselContent className="ml-0 items-stretch gap-5 py-1">
      {slides.map((slide, index) => <CarouselItem key={index} className={single ? "flex basis-full flex-col pl-0 [&>*]:w-full" : "flex basis-[92%] flex-col pl-0 sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)] [&>*]:w-full [&>*]:flex-1"}>{slide}</CarouselItem>)}
    </CarouselContent>
    <div className="mt-5 flex items-center justify-center gap-3" aria-live="off">
      <Button size="icon" variant="outline" title={ui[lang].prev} aria-label={ui[lang].prev} onClick={() => { if (api?.canScrollPrev()) api.scrollPrev(); else api?.scrollTo(count - 1); }}>{lang === "ar" ? <ChevronRight /> : <ChevronLeft />}</Button>
      <span className="min-w-12 text-center text-xs tabular-nums text-forest/70" dir="ltr">{selected + 1} / {count}</span>
      {!reducedMotion && autoAdvance && count > 1 && <Button size="icon" variant="outline" title={paused ? playLabel : pauseLabel} aria-label={paused ? playLabel : pauseLabel} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play /> : <Pause />}</Button>}
      <Button size="icon" variant="outline" title={ui[lang].next} aria-label={ui[lang].next} onClick={() => { if (api?.canScrollNext()) api.scrollNext(); else api?.scrollTo(0); }}>{lang === "ar" ? <ChevronLeft /> : <ChevronRight />}</Button>
    </div>
  </Carousel>;
}