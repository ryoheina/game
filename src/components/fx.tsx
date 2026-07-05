import { useEffect, useRef, useState } from "react";

export function Particles({ count = 40, color = "arcane" }: { count?: number; color?: "arcane" | "ember" | "gold" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const items = Array.from({ length: count });
  const colors = {
    arcane: "oklch(0.72 0.19 245)",
    ember: "oklch(0.66 0.22 40)",
    gold: "oklch(0.82 0.14 88)",
  };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const dur = 10 + Math.random() * 18;
        const blur = Math.random() > 0.6 ? "blur(1px)" : "none";
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              bottom: "-10vh",
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: 999,
              background: colors[color],
              boxShadow: `0 0 ${8 + size * 4}px ${colors[color]}`,
              filter: blur,
              animation: `drift ${dur}s linear ${delay}s infinite`,
              opacity: 0.7,
            }}
          />
        );
      })}
    </div>
  );
}

export function Fog({ opacity = 0.35 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(60% 40% at 30% 80%, oklch(0.72 0.19 245 / 0.25), transparent 70%), radial-gradient(50% 30% at 80% 20%, oklch(0.82 0.14 88 / 0.15), transparent 70%)",
        mixBlendMode: "screen",
        opacity,
        animation: "floatSlow 14s ease-in-out infinite",
      }}
    />
  );
}

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden md:block"
      style={{
        width: 600,
        height: 600,
        background:
          "radial-gradient(closest-side, oklch(0.72 0.19 245 / 0.18), transparent 70%)",
        mixBlendMode: "screen",
        filter: "blur(8px)",
        willChange: "transform",
      }}
    />
  );
}
