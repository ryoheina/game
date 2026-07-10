import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { AssetImg } from "@/components/asset-img";
import type { ImgKey } from "@/lib/assets";
import { Particles, Fog } from "./fx";

function FullBleedVideo({
  src,
  className = "",
  videoClassName = "",
  eager = false,
  controls = false,
}: {
  src: string;
  className?: string;
  videoClassName?: string;
  eager?: boolean;
  controls?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);

  useEffect(() => {
    if (shouldLoad || eager) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, shouldLoad]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden bg-black ${className}`}>
      {shouldLoad && (
        <video
          className={`h-full w-full object-cover ${videoClassName}`}
          src={src}
          autoPlay={!controls}
          muted
          loop={!controls}
          playsInline
          controls={controls}
          preload={eager ? "auto" : "metadata"}
        />
      )}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!titleRef.current) return;

    // Cinematic title entrance
    gsap.fromTo(
      titleRef.current.querySelectorAll("span"),
      { opacity: 0, y: 50, filter: "blur(20px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden sm:min-h-[720px]">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <FullBleedVideo src="/hero3.mp4" videoClassName="object-[18%_center]" eager />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 18%, rgba(175, 210, 255, 0.16), transparent 28%), radial-gradient(circle at 84% 18%, rgba(255, 220, 145, 0.12), transparent 26%)",
          }}
        />
        <div className="absolute inset-0 rounded-[50%]" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.18)" }} />
      </motion.div>

      <Fog className="z-[1]" opacity={0.16} />
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 24% 28%, rgba(144, 189, 255, 0.12), transparent 34%), radial-gradient(circle at 76% 20%, rgba(255, 225, 180, 0.08), transparent 30%)",
        }}
      />
      <Particles count={25} color="arcane" className="z-[4]" />

      <motion.div
        style={{ opacity }}
        className="relative z-[20] mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-24 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full glass px-4 py-2 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-[0_0_28px_rgba(255,255,255,0.14)]">
            <span className="h-2 w-2 rounded-full bg-[color:var(--gold)] shadow-lg shadow-[color:var(--gold)]" style={{ animation: "shimmer 2s ease-in-out infinite" }} />
            <span className="text-xs uppercase tracking-[0.35em] text-[rgba(255,255,255,0.85)]">Chapter I · The Awakening</span>
          </div>
          <h1 ref={titleRef} className="display text-5xl leading-[0.92] text-white sm:text-6xl md:text-8xl font-black drop-shadow-[0_0_45px_rgba(255,255,255,0.2)]">
            <span className="block text-white">Legends</span>
            <span className="block text-white">of</span>
            <span className="block text-white">Eternity</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-[rgba(255,255,255,0.85)] sm:mt-8 md:text-xl leading-relaxed font-light drop-shadow-[0_0_20px_rgba(0,0,0,0.24)]">
            A next-generation 3D multiplayer fantasy RPG. Forge alliances, wield forbidden magic, and stand against the tide of eternal darkness.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#characters"
              className="relative inline-flex items-center justify-center rounded-full bg-[#0c1d48]/90 px-6 py-4 text-xs uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(106,151,255,0.25)] border border-[#6e9cff]/50 transition-all duration-500 hover:bg-[#10255e]/95 hover:shadow-[0_0_45px_rgba(106,151,255,0.42)] sm:px-10 sm:text-sm sm:tracking-[0.25em]"
            >
              Explore Characters
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.5em] text-white/40 animate-pulse">
          scroll
          <div className="mx-auto mt-2 h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Story() {
  return (
    <section id="story" className="relative py-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">Prologue</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-6 text-5xl leading-tight text-white md:text-7xl">
            When the last star fell,<br />
            <span className="text-gradient-arcane">the realms bled light.</span>
          </h2>
        </Reveal>
        <div className="mt-16 space-y-10 text-lg leading-relaxed text-white/70 md:text-xl">
          <Reveal delay={0.1}>
            <p>
              Azrael, the Chosen, was born of storm and prophecy — a blade forged to hold back the endless night.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              At his side, <span className="text-white">Lucas</span> — the Light Guardian, brother in all but blood, whose shield has never wavered.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Above them, <span className="text-gradient-gold">Elysia</span>, Goddess of Harmony, weaves the thread that binds destiny to hope.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p>
              And beneath the world, <span className="text-[color:var(--ember)]">Zerevok</span> stirs — the Soul Devourer, hunger given form.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="display text-2xl italic text-white md:text-3xl">
              "The war of light and shadow is not a story. It is a choice — and it is yours."
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type Character = {
  name: string;
  title: string;
  asset: ImgKey;
  color: "arcane" | "gold" | "ember";
  power: number;
  description: string;
  abilities: string[];
};

const characters: Character[] = [
  {
    name: "Azrael",
    title: "The Chosen · Champion of Light and Shadow",
    asset: "azrael",
    color: "arcane",
    power: 98,
    description:
      "Born from destiny, forged in darkness. Azrael wields Heaven's Requiem — a blade that can cleave both light and shadow.",
    abilities: ["Luminous Slash", "Shadow Burst", "Celestial Shield", "Dark Vortex", "Ragnarok Strike"],
  },
  {
    name: "Lucas",
    title: "The Light Guardian · Loyal Brother in Arms",
    asset: "lucas",
    color: "gold",
    power: 88,
    description:
      "\"I may not be the strongest in might, but I will always stand by your side.\" Support, defender, unbroken light.",
    abilities: ["Radiant Shield", "Healing Ray", "Light's Embrace", "Beacon of Hope", "Divine Strike"],
  },
  {
    name: "Elysia",
    title: "Goddess of Harmony · The Balance",
    asset: "elysia",
    color: "gold",
    power: 100,
    description:
      "She sees beyond the veil of light and darkness. Her wisdom heals, her power unites, her grace redeems.",
    abilities: ["Celestial Bloom", "Divine Presence", "Weave of Fate", "Aegis of Harmony", "Rebirth"],
  },
  {
    name: "Zerevok",
    title: "The Soul Devourer · End of All Light",
    asset: "zerevok",
    color: "ember",
    power: 96,
    description:
      "Born from the void of darkness, Zerevok feeds on souls and spreads despair. None who face him survive.",
    abilities: ["Soul Reaper", "Dark Eruption", "Void Chains", "Nightmare Swarm", "Realm Collapse"],
  },
];

const characterVideos: Record<Character["name"], string> = {
  Azrael: "/hero3.mp4",
  Lucas: "/hero1.mp4",
  Elysia: "/hero2.mp4",
  Zerevok: "/hero4.mp4",
};

export function Characters({ onOpen }: { onOpen: (c: Character) => void }) {
  return (
    <section id="characters" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)] drop-shadow-[0_0_10px_rgba(255,179,0,0.6)]">Cast</span>
            <h2 className="display mt-4 text-5xl text-white md:text-6xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Champions & Fallen</h2>
            <p className="mt-4 max-w-xl text-white/60 leading-relaxed">
              Four souls at the heart of the eternal war. Click any card to see the full dossier.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {characters.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <button
                onClick={() => onOpen(c)}
                className="group relative block h-[420px] w-full overflow-hidden rounded-2xl text-left glass transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(74,20,140,0.6)] focus:outline-none focus:ring-2 focus:ring-[color:var(--arcane)] backdrop-blur-xl border border-white/10 hover:border-white/30 sm:h-[500px] lg:h-[520px]"
              >
                <FullBleedVideo
                  src={characterVideos[c.name]}
                  videoClassName="transition-all duration-[1800ms] group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Cinematic lighting overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black via-black/40 transition-all duration-500" />
                
                {/* Character-specific glow effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      c.color === "ember"
                        ? "radial-gradient(60% 40% at 50% 100%, oklch(0.66 0.22 40 / 0.6), transparent 70%)"
                        : c.color === "gold"
                          ? "radial-gradient(60% 40% at 50% 100%, oklch(0.82 0.14 88 / 0.6), transparent 70%)"
                          : "radial-gradient(60% 40% at 50% 100%, oklch(0.72 0.19 245 / 0.7), transparent 70%)",
                  }}
                />

                {/* Cinematic edge glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{
                    boxShadow: `inset 0 0 40px ${
                      c.color === "ember" ? "rgba(220, 20, 60, 0.3)" :
                      c.color === "gold" ? "rgba(255, 179, 0, 0.3)" :
                      "rgba(74, 20, 140, 0.3)"
                    }`
                  }}
                />
                
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <div className="text-[10px] uppercase tracking-[0.35em] text-white/60 group-hover:text-white/80 transition-colors">{c.title.split(" · ")[0]}</div>
                  <h3 className="display mt-2 text-3xl text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all">{c.name}</h3>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10 group-hover:bg-white/20">
                      <div
                        className="h-full transition-all duration-1000 rounded-full shadow-lg"
                        style={{
                          width: `${c.power}%`,
                          background:
                            c.color === "ember"
                              ? "linear-gradient(90deg, oklch(0.66 0.22 40), oklch(0.8 0.2 30))"
                              : c.color === "gold"
                                ? "linear-gradient(90deg, oklch(0.82 0.14 88), oklch(0.95 0.12 95))"
                                : "linear-gradient(90deg, oklch(0.5 0.2 245), oklch(0.85 0.15 220))",
                          boxShadow:
                            c.color === "ember"
                              ? "0 0 20px rgba(220, 20, 60, 0.8)"
                              : c.color === "gold"
                                ? "0 0 20px rgba(255, 179, 0, 0.8)"
                                : "0 0 20px rgba(74, 20, 140, 0.8)",
                        }}
                      />
                    </div>
                    <span className="text-xs text-white/70 group-hover:text-white transition-colors">{c.power}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CharacterModal({ c, onClose }: { c: Character | null; onClose: () => void }) {
  useEffect(() => {
    if (!c) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [c, onClose]);

  if (!c) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl glass md:grid-cols-2"
      >
        <div className="relative h-72 md:h-auto">
          <FullBleedVideo src={characterVideos[c.name]} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
        </div>
        <div className="relative overflow-auto p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full glass text-white/70 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
          <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]">{c.title}</div>
          <h3 className="display mt-3 text-5xl text-white">{c.name}</h3>
          <p className="mt-6 text-white/70">{c.description}</p>
          <div className="mt-8">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">Abilities</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.abilities.map((a) => (
                <span key={a} className="rounded-full glass px-3 py-1.5 text-xs text-white/80">{a}</span>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">Power Level</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.power}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, var(--arcane), var(--gold))" }}
                />
              </div>
              <span className="text-sm text-white/80">{c.power}/100</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function World() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const facets = [
    { title: "Kingdoms of Aldreth", copy: "Iron banners, cathedral spires, and the last free crown." },
    { title: "Shattered Ruins", copy: "Where forgotten gods sleep beneath collapsed stars." },
    { title: "The Ashen Mountains", copy: "Peaks kissed by dragonfire, home to the wandering exiles." },
    { title: "Whisperwood", copy: "Living forests that remember every promise ever broken." },
  ];

  return (
    <section id="world" ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y }} className="absolute inset-0">
        <AssetImg asset="background" alt="" aria-hidden className="h-[120%] w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>
      <Fog opacity={0.5} />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">The Realm</span>
          <h2 className="display mt-4 text-5xl text-white md:text-6xl">A world that breathes</h2>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {facets.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl glass p-6 transition hover:scale-[1.02] hover:glow-blue">
                <div className="display text-2xl text-white">{f.title}</div>
                <p className="mt-3 text-sm text-white/60">{f.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Battle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.15, 1.25]);
  const rot = useTransform(scrollYProgress, [0, 1], [-0.6, 0.6]);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 90);
    }, 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden">
      <motion.div style={{ scale, rotate: rot }} className="absolute inset-0">
        <FullBleedVideo src="/background1.mp4" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/20" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-100"
        style={{
          opacity: flash ? 0.35 : 0,
          background:
            "radial-gradient(60% 40% at 60% 30%, rgba(255,255,255,0.18), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <Particles count={30} color="ember" />
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-4 pb-20 sm:px-6 sm:pb-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--ember)]">The Siege</span>
            <h2 className="display mt-4 text-4xl text-white sm:text-5xl md:text-7xl">Fifty against fifty thousand.</h2>
            <p className="mt-6 text-white/70 md:text-lg">
              Real-time massed combat. Elemental storms. Guild-level tactics. Every clash is remembered by the realm.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function BattleToFeaturesBreak() {
  return (
    <section
      aria-hidden
      className="relative isolate min-h-[28svh] overflow-hidden bg-background sm:min-h-[34svh]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#120606] to-background" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-px w-[min(74rem,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f06a3d]/35 to-transparent shadow-[0_0_42px_rgba(240,80,45,0.28)]" />
      <div className="absolute left-1/2 top-[calc(50%+18px)] h-px w-[min(56rem,64vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Particles count={18} color="ember" className="opacity-70" />
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <FullBleedVideo src="/background2.mp4" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/5 to-background/50" />
    </section>
  );
}

const stack = [
  "Unity", "Unreal Engine", "Photon", "Mirror",
  "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
  "Redis", "AWS", "Azure", "Google Cloud",
];

export function Technology() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">Under the hood</span>
          <h2 className="display mt-4 text-5xl text-white md:text-6xl">A modern arcane stack.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stack.map((s, i) => (
            <Reveal key={s} delay={(i % 6) * 0.05}>
              <div className="rounded-xl glass px-4 py-6 text-sm text-white/80 transition hover:text-white hover:glow-blue">
                {s}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Download({ onDownload, status }: { onDownload: () => void; status: "idle" | "loading" | "done" }) {
  const started = status === "done";

  return (
    <section id="download" className="relative isolate overflow-hidden py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255, 220, 140, 0.16), transparent 22%), radial-gradient(circle at 50% 58%, rgba(76, 142, 255, 0.16), transparent 34%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">Get the build</span>
          <h2 className="display mt-4 text-5xl text-white md:text-6xl">Download the game</h2>
          <p className="mt-4 text-white/60">
            Click the sword to begin your Legends of Eternity download.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <div className="grid gap-6 sm:grid-cols-4">
              {[
                ["Version", "v0.1.0-alpha"],
                ["Size", "~128 MB"],
                ["Released", "Jul 10, 2026"],
                ["Downloads", "Live counter"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{k}</div>
                  <div className="mt-1 text-white">{v}</div>
                </div>
              ))}
            </div>

            <div className="relative mx-auto mt-12 grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-[color:var(--gold)]/30"
                  animate={
                    started
                      ? { scale: [0.72, 1.28], opacity: [0.75, 0] }
                      : { scale: [0.88, 1], opacity: [0.25, 0.5, 0.25] }
                  }
                  transition={{
                    duration: started ? 1.1 : 3.2,
                    repeat: Infinity,
                    delay: ring * 0.22,
                    ease: "easeOut",
                  }}
                />
              ))}
              <motion.button
                onClick={onDownload}
                disabled={status === "loading"}
                aria-label="Download Legends of Eternity"
                className="group relative grid h-40 w-40 place-items-center rounded-full border border-[#f5d88a]/50 bg-black/45 shadow-[0_0_70px_rgba(255,214,120,0.22)] backdrop-blur-xl transition disabled:opacity-70 sm:h-52 sm:w-52"
                whileHover={{ scale: 1.06, rotate: -2 }}
                whileTap={{ scale: 0.94, rotate: 6 }}
                animate={
                  started
                    ? {
                        scale: [1, 1.18, 1],
                        boxShadow: [
                          "0 0 50px rgba(255,214,120,0.28)",
                          "0 0 120px rgba(255,214,120,0.72)",
                          "0 0 60px rgba(120,170,255,0.44)",
                        ],
                      }
                    : { y: [0, -8, 0] }
                }
                transition={{ duration: started ? 0.9 : 3, repeat: started ? 0 : Infinity, ease: "easeInOut" }}
              >
                <span className="absolute inset-3 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
                <motion.img
                  src="/favicon.ico"
                  alt=""
                  className="relative h-24 w-24 object-contain drop-shadow-[0_0_28px_rgba(255,226,150,0.75)] sm:h-32 sm:w-32"
                  draggable={false}
                  animate={started ? { rotate: [0, -12, 12, 0], scale: [1, 1.18, 1] } : { rotate: [0, -4, 0, 4, 0] }}
                  transition={{ duration: started ? 0.85 : 4, repeat: started ? 0 : Infinity, ease: "easeInOut" }}
                />
              </motion.button>
            </div>

            <div className="mt-8 text-xs uppercase tracking-[0.32em] text-white/50">
              {status === "loading" ? "Preparing..." : "Legends of Eternity"}
            </div>
            {started && (
              <motion.p
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mx-auto mt-4 max-w-md rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-5 py-3 text-sm text-[#ffe7a3] shadow-[0_0_40px_rgba(255,214,120,0.16)]"
              >
                You have already started.
              </motion.p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalVideo() {
  return (
    <section id="final-video" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_60px_rgba(120,160,255,0.18)]">
            <FullBleedVideo src="/Final.mp4" controls />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact({ onSubmit }: { onSubmit: (d: { name: string; email: string; message: string }) => Promise<void> }) {
  const [state, setState] = useState({ name: "", email: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">Send a raven</span>
            <h2 className="display mt-4 text-5xl text-white md:text-6xl">Speak with the studio.</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setErr(null);
              try {
                await onSubmit(state);
                setDone(true);
                setState({ name: "", email: "", message: "" });
              } catch (e: unknown) {
                setErr(e instanceof Error ? e.message : "Something went wrong.");
              } finally {
                setBusy(false);
              }
            }}
            className="mt-10 space-y-4 rounded-2xl glass p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required maxLength={120}
                value={state.name}
                onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                placeholder="Your name"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
              />
              <input
                required type="email" maxLength={200}
                value={state.email}
                onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                placeholder="Your email"
                className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
              />
            </div>
            <textarea
              required rows={5} maxLength={5000}
              value={state.message}
              onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
              placeholder="Your message"
              className="w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm">
                {done && <span className="text-[color:var(--gold)]">✓ Message sent to the studio.</span>}
                {err && <span className="text-[color:var(--ember)]">{err}</span>}
              </div>
              <button
                disabled={busy}
                className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.3em] text-black transition hover:scale-[1.02] disabled:opacity-60"
              >
                {busy ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-md glass glow-blue"
            style={{ animation: "shimmer 3s ease-in-out infinite" }}
          >
            <span className="display text-gradient-gold text-lg">L</span>
          </span>
          <div className="display text-sm tracking-[0.35em] text-white/80">LEGENDS OF ETERNITY</div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/50">
          <a href="#" className="hover:text-white">Discord</a>
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">YouTube</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
        <div className="text-xs text-white/40">© 2026 Legends of Eternity</div>
      </div>
    </footer>
  );
}
