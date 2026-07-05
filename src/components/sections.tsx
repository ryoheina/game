import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { IMG } from "@/lib/assets";
import { Particles, Fog } from "./fx";

export function Hero({ onDownload }: { onDownload: () => void }) {
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
    <section ref={ref} className="relative isolate h-[100vh] min-h-[720px] w-full overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={IMG.azrael}
          alt="Azrael, the Chosen"
          className="h-full w-full object-cover"
          style={{ objectPosition: "18% center", animation: "slowZoom 30s ease-in-out infinite alternate", transform: "scale(1.35)", transformOrigin: "20% center" }}
        />
        {/* Cinematic color grading overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 rounded-[50%] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.9)" }} />
      </motion.div>

      <Fog />
      <Particles count={50} color="arcane" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-2 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500">
            <span className="h-2 w-2 rounded-full bg-[color:var(--gold)] shadow-lg shadow-[color:var(--gold)]" style={{ animation: "shimmer 2s ease-in-out infinite" }} />
            <span className="text-xs uppercase tracking-[0.35em] text-white/70">Chapter I · The Awakening</span>
          </div>
          <h1 ref={titleRef} className="display text-6xl leading-[0.95] text-white md:text-8xl font-black">
            <span className="block text-gradient-arcane drop-shadow-[0_0_30px_rgba(74,20,140,0.8)]">Legends</span>
            <span className="block text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">of</span>
            <span className="block text-gradient-gold drop-shadow-[0_0_30px_rgba(255,179,0,0.8)]">Eternity</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70 md:text-xl leading-relaxed font-light">
            A next-generation 3D multiplayer fantasy RPG. Forge alliances, wield forbidden magic, and stand against the tide of eternal darkness.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="group relative rounded-full bg-gradient-to-r from-white to-gray-100 px-8 py-4 text-sm uppercase tracking-[0.25em] text-black font-bold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">Download Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 group-hover:animate-pulse" />
            </button>
            <a
              href="#characters"
              className="rounded-full glass px-8 py-4 text-sm uppercase tracking-[0.25em] text-white/90 transition-all duration-500 hover:text-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(74,20,140,0.4)] border border-white/20 hover:border-white/40 backdrop-blur-xl"
            >
              Explore Characters
            </a>
            <a
              href="#story"
              className="rounded-full px-8 py-4 text-sm uppercase tracking-[0.25em] text-white/70 transition-all duration-500 hover:text-white hover:bg-white/5"
            >
              ▶ Watch Trailer
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
  img: string;
  color: "arcane" | "gold" | "ember";
  power: number;
  description: string;
  abilities: string[];
};

const characters: Character[] = [
  {
    name: "Azrael",
    title: "The Chosen · Champion of Light and Shadow",
    img: IMG.azrael,
    color: "arcane",
    power: 98,
    description:
      "Born from destiny, forged in darkness. Azrael wields Heaven's Requiem — a blade that can cleave both light and shadow.",
    abilities: ["Luminous Slash", "Shadow Burst", "Celestial Shield", "Dark Vortex", "Ragnarok Strike"],
  },
  {
    name: "Lucas",
    title: "The Light Guardian · Loyal Brother in Arms",
    img: IMG.lucas,
    color: "gold",
    power: 88,
    description:
      "\"I may not be the strongest in might, but I will always stand by your side.\" Support, defender, unbroken light.",
    abilities: ["Radiant Shield", "Healing Ray", "Light's Embrace", "Beacon of Hope", "Divine Strike"],
  },
  {
    name: "Elysia",
    title: "Goddess of Harmony · The Balance",
    img: IMG.elysia,
    color: "gold",
    power: 100,
    description:
      "She sees beyond the veil of light and darkness. Her wisdom heals, her power unites, her grace redeems.",
    abilities: ["Celestial Bloom", "Divine Presence", "Weave of Fate", "Aegis of Harmony", "Rebirth"],
  },
  {
    name: "Zerevok",
    title: "The Soul Devourer · End of All Light",
    img: IMG.zerevok,
    color: "ember",
    power: 96,
    description:
      "Born from the void of darkness, Zerevok feeds on souls and spreads despair. None who face him survive.",
    abilities: ["Soul Reaper", "Dark Eruption", "Void Chains", "Nightmare Swarm", "Realm Collapse"],
  },
];

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <button
                onClick={() => onOpen(c)}
                className="group relative block h-[520px] w-full overflow-hidden rounded-2xl text-left glass transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(74,20,140,0.6)] focus:outline-none focus:ring-2 focus:ring-[color:var(--arcane)] backdrop-blur-xl border border-white/10 hover:border-white/30"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] group-hover:scale-110 group-hover:brightness-110"
                  style={{ objectPosition: c.name === "Elysia" ? "50% 20%" : "50% 15%" }}
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
          <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
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
        <img src={IMG.background} alt="" aria-hidden className="h-[120%] w-full object-cover opacity-40" />
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
    <section ref={ref} className="relative isolate h-[100vh] min-h-[600px] w-full overflow-hidden">
      <motion.div style={{ scale, rotate: rot }} className="absolute inset-0">
        <img src={IMG.background} alt="Battle of Aldreth" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-black/30 to-background" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-100"
        style={{
          opacity: flash ? 1 : 0,
          background:
            "radial-gradient(60% 40% at 60% 30%, oklch(0.95 0.15 245 / 0.6), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <Particles count={30} color="ember" />
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-6 pb-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--ember)]">The Siege</span>
            <h2 className="display mt-4 text-5xl text-white md:text-7xl">Fifty against fifty thousand.</h2>
            <p className="mt-6 text-white/70 md:text-lg">
              Real-time massed combat. Elemental storms. Guild-level tactics. Every clash is remembered by the realm.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const featureList = [
  ["Real-Time Multiplayer", "Sub-40ms authoritative netcode."],
  ["Cloud Hosting", "Global regions, zero-config scaling."],
  ["Dedicated Servers", "Bare-metal for tournament play."],
  ["Character Progression", "Deep skill trees, no dead ends."],
  ["Magic System", "Nine schools, infinite combinations."],
  ["Boss Battles", "Cinematic raid encounters."],
  ["Guild System", "Sieges, alliances, betrayals."],
  ["PvP Arenas", "Ranked, seasonal, cosmetic-only."],
  ["PvE Dungeons", "Procedurally-woven story dungeons."],
  ["Achievements", "Legacy meta across all seasons."],
  ["Leaderboards", "Global, regional, guild-wide."],
  ["Secure Backend", "End-to-end signed player state."],
  ["Cross Platform", "PC, console, and cloud clients."],
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">Systems</span>
          <h2 className="display mt-4 text-5xl text-white md:text-6xl">Built for legends.</h2>
        </Reveal>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 6) * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition hover:glow-blue">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: "radial-gradient(closest-side, oklch(0.72 0.19 245 / 0.35), transparent)" }}
                />
                <div className="display text-xl text-white">{t}</div>
                <p className="mt-2 text-sm text-white/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
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
  return (
    <section id="download" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]">Get the build</span>
          <h2 className="display mt-4 text-5xl text-white md:text-6xl">Download the project</h2>
          <p className="mt-4 text-white/60">
            Delivered by our secure edge. Every download is logged for the studio.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-3xl glass p-10">
            <div className="grid gap-6 sm:grid-cols-4">
              {[
                ["Version", "v0.1.0-alpha"],
                ["Size", "~2.4 GB"],
                ["Released", "Jul 05, 2026"],
                ["Downloads", "Live counter"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{k}</div>
                  <div className="mt-1 text-white">{v}</div>
                </div>
              ))}
            </div>
            <button
              onClick={onDownload}
              disabled={status === "loading"}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[color:var(--arcane)] to-[color:var(--gold)] px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:scale-[1.02] glow-blue disabled:opacity-70"
            >
              {status === "loading" ? "Preparing…" : status === "done" ? "✓ Started" : "Download Project"}
            </button>
            {status === "done" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-white/60"
              >
                Your download will begin momentarily. Thank you for supporting the project.
              </motion.p>
            )}
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
