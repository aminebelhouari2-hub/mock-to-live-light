import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { occasionPhotos, occasionTitle, ui, type Lang } from "@/content/site";

export function SchoolOccasions({ lang }: { lang: Lang }) {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const update = () => setSelected(api.selectedScrollSnap());
    update();
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);
  useEffect(() => {
    if (!api || paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => { if (!document.hidden) api.scrollNext(); }, 4500);
    return () => window.clearInterval(timer);
  }, [api, paused, interacting, reducedMotion]);
  return (
    <Carousel key={lang} setApi={setApi} opts={{ loop: true, direction: lang === "ar" ? "rtl" : "ltr", align: "start" }} aria-label={occasionTitle[lang]}
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }}>
      <CarouselContent className="ml-0 gap-4">
        {occasionPhotos.map(photo => <CarouselItem key={photo.src} className="basis-full pl-0 sm:basis-[calc(50%-8px)] lg:basis-[calc(33.333%-11px)]">
          <img src={photo.src} alt={photo.alt[lang]} loading="lazy" width={768} height={1024} className="aspect-[3/4] w-full rounded-lg bg-sand object-contain" />
        </CarouselItem>)}
      </CarouselContent>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button size="icon" variant="outline" aria-label={ui[lang].prev} onClick={() => api?.scrollPrev()}><ChevronLeft /></Button>
        <span className="text-sm tabular-nums text-forest/70" dir="ltr">{selected + 1} / {occasionPhotos.length}</span>
        {!reducedMotion && <Button size="icon" variant="outline" aria-label={paused ? (lang === "ar" ? "تشغيل العرض" : "Play slideshow") : (lang === "ar" ? "إيقاف العرض" : "Pause slideshow")} onClick={() => setPaused(v => !v)}>{paused ? <Play /> : <Pause />}</Button>}
        <Button size="icon" variant="outline" aria-label={ui[lang].next} onClick={() => api?.scrollNext()}><ChevronRight /></Button>
      </div>
    </Carousel>
  );
}