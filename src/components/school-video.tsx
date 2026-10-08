import { useEffect, useRef } from "react";

export function SchoolVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !document.hidden && !motion.matches) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = (entry?.intersectionRatio ?? 0) >= 0.6;
      update();
    }, { threshold: [0, 0.6] });
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
      video.pause();
    };
  }, []);
  return <video ref={ref} src={src} aria-label={label} muted loop playsInline controls preload="metadata" className="aspect-video max-h-[65vh] w-full rounded-lg bg-forest object-contain" />;
}