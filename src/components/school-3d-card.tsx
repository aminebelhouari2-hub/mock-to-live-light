import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

/** Separate reveal and tilt layers keep carousel transforms independent. */
export function School3DCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const scene = useRef<HTMLElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const reduced = useRef(true);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduced.current = media.matches;
      if (media.matches) {
        node.removeAttribute("data-revealed");
        surface.current?.style.removeProperty("--tilt-x");
        surface.current?.style.removeProperty("--tilt-y");
        surface.current?.removeAttribute("data-tilting");
      }
    };
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!reduced.current) node.setAttribute("data-revealed", "true");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const reset = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    surface.current?.style.removeProperty("--tilt-x");
    surface.current?.style.removeProperty("--tilt-y");
    surface.current?.removeAttribute("data-tilting");
  };
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (reduced.current || (event.pointerType !== "mouse" && event.buttons === 0)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const limit = event.pointerType === "mouse" ? 5 : 3;
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      surface.current?.style.setProperty("--tilt-x", `${-y * limit}deg`);
      surface.current?.style.setProperty("--tilt-y", `${x * limit}deg`);
      surface.current?.setAttribute("data-tilting", "true");
      frame.current = null;
    });
  };

  return <article ref={scene} className="school-3d-scene min-w-0" onPointerEnter={tilt} onPointerDown={tilt} onPointerMove={tilt} onPointerLeave={reset} onPointerUp={reset} onPointerCancel={reset}>
    <div className="school-3d-reveal">
      <div ref={surface} className={`school-3d-card ${className}`}>{children}</div>
    </div>
  </article>;
}

export function SchoolHeroGeometry() {
  return <div className="school-hero-geometry" aria-hidden="true">
    {[0, 1, 2].map(index => <div key={index} className={`school-cube-float school-cube-float-${index}`}>
      <div className="school-cube">{["front", "back", "left", "right", "top", "bottom"].map(face => <span key={face} className={`school-cube-${face}`} />)}</div>
    </div>)}
  </div>;
}