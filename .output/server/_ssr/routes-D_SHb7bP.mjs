import { a as __toESM } from "../_runtime.mjs";
import { a as performance_default, i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as MouseGlow, r as Particles, t as Fog } from "./fx-CW4x6DdP.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ensureVisitorSession } from "./visitor-session-CAw0UShx.mjs";
import { n as submitContact } from "./analytics.functions-DtJsHYe4.mjs";
import { n as ChevronLeft, t as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_SHb7bP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		href: "#story",
		label: "Story"
	},
	{
		href: "#characters",
		label: "Characters"
	},
	{
		href: "#world",
		label: "World"
	},
	{
		href: "#features",
		label: "Features"
	},
	{
		href: "#download",
		label: "Download"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "group flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-9 w-9 place-items-center rounded-md glass glow-blue",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display text-gradient-gold text-lg",
						children: "L"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "display text-sm tracking-[0.35em] text-white/80 group-hover:text-white",
					children: "LEGENDS OF ETERNITY"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: `hidden items-center gap-1 rounded-full px-2 py-1 md:flex ${scrolled ? "glass" : ""}`,
				children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: it.href,
					className: "rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white",
					children: it.label
				}, it.href))
			})]
		})
	});
}
var azrael_png_asset_default = {
	version: 1,
	asset_id: "d25da4f4-c48e-4aa6-aafc-aae001964652",
	project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
	url: "/__l5e/assets-v1/d25da4f4-c48e-4aa6-aafc-aae001964652/azrael.png",
	r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/d25da4f4-c48e-4aa6-aafc-aae001964652/azrael.png",
	original_filename: "azrael.png",
	size: 2682758,
	content_type: "image/png",
	created_at: "2026-07-05T20:44:30Z"
};
var background_png_asset_default = {
	version: 1,
	asset_id: "5ab0fb45-87a3-4874-afde-22203a9dd8c3",
	project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
	url: "/__l5e/assets-v1/5ab0fb45-87a3-4874-afde-22203a9dd8c3/background.png",
	r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/5ab0fb45-87a3-4874-afde-22203a9dd8c3/background.png",
	original_filename: "background.png",
	size: 2827878,
	content_type: "image/png",
	created_at: "2026-07-05T20:44:44Z"
};
var elysia_png_asset_default = {
	version: 1,
	asset_id: "5f320de6-7a8d-46f9-aca3-150116e95d68",
	project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
	url: "/__l5e/assets-v1/5f320de6-7a8d-46f9-aca3-150116e95d68/elysia.png",
	r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/5f320de6-7a8d-46f9-aca3-150116e95d68/elysia.png",
	original_filename: "elysia.png",
	size: 3135347,
	content_type: "image/png",
	created_at: "2026-07-05T20:44:48Z"
};
var lucas_png_asset_default = {
	version: 1,
	asset_id: "430dab87-0f2e-442b-99a3-08e6a804bdc1",
	project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
	url: "/__l5e/assets-v1/430dab87-0f2e-442b-99a3-08e6a804bdc1/lucas.png",
	r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/430dab87-0f2e-442b-99a3-08e6a804bdc1/lucas.png",
	original_filename: "lucas.png",
	size: 2667846,
	content_type: "image/png",
	created_at: "2026-07-05T20:44:52Z"
};
var zerevok_png_asset_default = {
	version: 1,
	asset_id: "6bf527d3-19d5-4046-92f9-59cc8dde1648",
	project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
	url: "/__l5e/assets-v1/6bf527d3-19d5-4046-92f9-59cc8dde1648/zerevok.png",
	r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/6bf527d3-19d5-4046-92f9-59cc8dde1648/zerevok.png",
	original_filename: "zerevok.png",
	size: 2346791,
	content_type: "image/png",
	created_at: "2026-07-05T20:44:55Z"
};
var LOCAL = {
	azrael: "/AZRAEL.png",
	background: "/Background.png",
	elysia: "/ELYSIA.png",
	lucas: "/LUCAS.png",
	zerevok: "/ZEREVOK.png"
};
var CDN = {
	azrael: azrael_png_asset_default.url,
	background: background_png_asset_default.url,
	elysia: elysia_png_asset_default.url,
	lucas: lucas_png_asset_default.url,
	zerevok: zerevok_png_asset_default.url
};
({ ...LOCAL });
function assetSources(key) {
	return {
		local: LOCAL[key],
		cdn: CDN[key]
	};
}
function AssetImg({ asset, onError, loading = "lazy", decoding = "async", ...props }) {
	const { local, cdn } = assetSources(asset);
	const [src, setSrc] = (0, import_react.useState)(local);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		...props,
		src,
		loading,
		decoding,
		onError: (e) => {
			if (src !== cdn) setSrc(cdn);
			onError?.(e);
		}
	});
}
function FullBleedVideo({ src, className = "", videoClassName = "", eager = false, controls = false }) {
	const ref = (0, import_react.useRef)(null);
	const [shouldLoad, setShouldLoad] = (0, import_react.useState)(eager);
	(0, import_react.useEffect)(() => {
		if (shouldLoad || eager) return;
		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry?.isIntersecting) return;
			setShouldLoad(true);
			observer.disconnect();
		}, { rootMargin: "200px 0px" });
		observer.observe(node);
		return () => observer.disconnect();
	}, [eager, shouldLoad]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `absolute inset-0 overflow-hidden bg-black ${className}`,
		children: shouldLoad && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: `h-full w-full object-cover ${videoClassName}`,
			src,
			autoPlay: !controls,
			muted: true,
			defaultMuted: true,
			loop: !controls,
			playsInline: true,
			controls,
			preload: eager ? "auto" : "none"
		})
	});
}
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const titleRef = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	(0, import_react.useEffect)(() => {
		if (!titleRef.current) return;
		gsapWithCSS.fromTo(titleRef.current.querySelectorAll("span"), {
			opacity: 0,
			y: 50,
			filter: "blur(20px)"
		}, {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			duration: 1.5,
			stagger: .2,
			ease: "power4.out",
			delay: .3
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden sm:min-h-[720px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y,
					scale
				},
				className: "absolute inset-0 z-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullBleedVideo, {
						src: "/hero3.mp4",
						videoClassName: "object-[18%_center]",
						eager: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { backgroundImage: "radial-gradient(circle at 18% 18%, rgba(175, 210, 255, 0.16), transparent 28%), radial-gradient(circle at 84% 18%, rgba(255, 220, 145, 0.12), transparent 26%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 rounded-[50%]",
						style: { boxShadow: "inset 0 0 120px rgba(0,0,0,0.18)" }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fog, {
				className: "z-[1]",
				opacity: .16
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-[3]",
				style: { backgroundImage: "radial-gradient(circle at 24% 28%, rgba(144, 189, 255, 0.12), transparent 34%), radial-gradient(circle at 76% 20%, rgba(255, 225, 180, 0.08), transparent 30%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {
				count: 25,
				color: "arcane",
				className: "z-[4]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { opacity },
				className: "relative z-[20] mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-24 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: 1.2 },
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 inline-flex max-w-full items-center gap-3 rounded-full glass px-4 py-2 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-[0_0_28px_rgba(255,255,255,0.14)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2 w-2 rounded-full bg-[color:var(--gold)] shadow-lg shadow-[color:var(--gold)]",
								style: { animation: "shimmer 2s ease-in-out infinite" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-[0.35em] text-[rgba(255,255,255,0.85)]",
								children: "Chapter I · The Awakening"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							ref: titleRef,
							className: "display text-5xl leading-[0.92] text-white sm:text-6xl md:text-8xl font-black drop-shadow-[0_0_45px_rgba(255,255,255,0.2)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-white",
									children: "Legends"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-white",
									children: "of"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-white",
									children: "Eternity"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base text-[rgba(255,255,255,0.85)] sm:mt-8 md:text-xl leading-relaxed font-light drop-shadow-[0_0_20px_rgba(0,0,0,0.24)]",
							children: "A next-generation 3D multiplayer fantasy RPG. Forge alliances, wield forbidden magic, and stand against the tide of eternal darkness."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#characters",
								className: "relative inline-flex items-center justify-center rounded-full bg-[#0c1d48]/90 px-6 py-4 text-xs uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(106,151,255,0.25)] border border-[#6e9cff]/50 transition-all duration-500 hover:bg-[#10255e]/95 hover:shadow-[0_0_45px_rgba(106,151,255,0.42)] sm:px-10 sm:text-sm sm:tracking-[0.25em]",
								children: "Explore Characters"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.5em] text-white/40 animate-pulse",
					children: ["scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2 h-10 w-px bg-gradient-to-b from-white/50 to-transparent" })]
				})]
			})
		]
	});
}
function Reveal({ children, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 40
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-100px"
		},
		transition: {
			duration: 1,
			delay,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children
	});
}
function Story() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "story",
		className: "relative py-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
					children: "Prologue"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display mt-6 text-5xl leading-tight text-white md:text-7xl",
						children: [
							"When the last star fell,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-arcane",
								children: "the realms bled light."
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 space-y-10 text-lg leading-relaxed text-white/70 md:text-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Azrael, the Chosen, was born of storm and prophecy — a blade forged to hold back the endless night." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .15,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"At his side, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white",
									children: "Lucas"
								}),
								" — the Light Guardian, brother in all but blood, whose shield has never wavered."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Above them, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-gold",
									children: "Elysia"
								}),
								", Goddess of Harmony, weaves the thread that binds destiny to hope."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .25,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"And beneath the world, ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[color:var(--ember)]",
									children: "Zerevok"
								}),
								" stirs — the Soul Devourer, hunger given form."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .3,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "display text-2xl italic text-white md:text-3xl",
								children: "\"The war of light and shadow is not a story. It is a choice — and it is yours.\""
							})
						})
					]
				})
			]
		})
	});
}
var characters = [
	{
		name: "Azrael",
		title: "The Chosen · Champion of Light and Shadow",
		asset: "azrael",
		color: "arcane",
		power: 98,
		description: "Born from destiny, forged in darkness. Azrael wields Heaven's Requiem — a blade that can cleave both light and shadow.",
		abilities: [
			"Luminous Slash",
			"Shadow Burst",
			"Celestial Shield",
			"Dark Vortex",
			"Ragnarok Strike"
		]
	},
	{
		name: "Lucas",
		title: "The Light Guardian · Loyal Brother in Arms",
		asset: "lucas",
		color: "gold",
		power: 88,
		description: "\"I may not be the strongest in might, but I will always stand by your side.\" Support, defender, unbroken light.",
		abilities: [
			"Radiant Shield",
			"Healing Ray",
			"Light's Embrace",
			"Beacon of Hope",
			"Divine Strike"
		]
	},
	{
		name: "Elysia",
		title: "Goddess of Harmony · The Balance",
		asset: "elysia",
		color: "gold",
		power: 100,
		description: "She sees beyond the veil of light and darkness. Her wisdom heals, her power unites, her grace redeems.",
		abilities: [
			"Celestial Bloom",
			"Divine Presence",
			"Weave of Fate",
			"Aegis of Harmony",
			"Rebirth"
		]
	},
	{
		name: "Zerevok",
		title: "The Soul Devourer · End of All Light",
		asset: "zerevok",
		color: "ember",
		power: 96,
		description: "Born from the void of darkness, Zerevok feeds on souls and spreads despair. None who face him survive.",
		abilities: [
			"Soul Reaper",
			"Dark Eruption",
			"Void Chains",
			"Nightmare Swarm",
			"Realm Collapse"
		]
	}
];
var characterVideos = {
	Azrael: "/hero3.mp4",
	Lucas: "/hero1.mp4",
	Elysia: "/hero2.mp4",
	Zerevok: "/hero4.mp4"
};
function CharacterCardMedia({ c }) {
	const videoRef = (0, import_react.useRef)(null);
	const [shouldLoadVideo, setShouldLoadVideo] = (0, import_react.useState)(false);
	const [videoReady, setVideoReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!shouldLoadVideo) return;
		const video = videoRef.current;
		if (!video) return;
		video.muted = true;
		video.defaultMuted = true;
		video.loop = true;
		video.playsInline = true;
		const play = () => video.play().catch(() => {});
		play();
		video.addEventListener("canplay", play);
		document.addEventListener("visibilitychange", play);
		return () => {
			video.removeEventListener("canplay", play);
			document.removeEventListener("visibilitychange", play);
		};
	}, [shouldLoadVideo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-black",
		onPointerEnter: () => setShouldLoadVideo(true),
		onFocus: () => setShouldLoadVideo(true),
		onTouchStart: () => setShouldLoadVideo(true),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 scale-110 opacity-70 blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetImg, {
					asset: c.asset,
					alt: "",
					"aria-hidden": true,
					className: "h-full w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetImg, {
				asset: c.asset,
				alt: "",
				"aria-hidden": true,
				className: `absolute inset-0 h-full w-full object-contain transition-all duration-[900ms] group-hover:scale-[1.02] group-hover:brightness-110 ${videoReady ? "opacity-0" : "opacity-100"}`
			}),
			shouldLoadVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				className: `absolute inset-0 h-full w-full object-contain transition-all duration-[900ms] group-hover:scale-[1.02] group-hover:brightness-110 ${videoReady ? "opacity-100" : "opacity-0"}`,
				muted: true,
				defaultMuted: true,
				loop: true,
				playsInline: true,
				autoPlay: true,
				preload: "metadata",
				onCanPlay: () => setVideoReady(true),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					src: characterVideos[c.name],
					type: "video/mp4"
				})
			})
		]
	});
}
function Characters({ onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "characters",
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)] drop-shadow-[0_0_10px_rgba(255,179,0,0.6)]",
						children: "Cast"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-4 text-5xl text-white md:text-6xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]",
						children: "Champions & Fallen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-white/60 leading-relaxed",
						children: "Four souls at the heart of the eternal war. Click any card to see the full dossier."
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6",
				children: characters.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onOpen(c),
						className: "group relative block h-[420px] w-full overflow-hidden rounded-2xl text-left glass transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(74,20,140,0.6)] focus:outline-none focus:ring-2 focus:ring-[color:var(--arcane)] backdrop-blur-xl border border-white/10 hover:border-white/30 sm:h-[500px] lg:h-[520px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterCardMedia, { c }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black via-black/40 transition-all duration-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
								style: { background: c.color === "ember" ? "radial-gradient(60% 40% at 50% 100%, oklch(0.66 0.22 40 / 0.6), transparent 70%)" : c.color === "gold" ? "radial-gradient(60% 40% at 50% 100%, oklch(0.82 0.14 88 / 0.6), transparent 70%)" : "radial-gradient(60% 40% at 50% 100%, oklch(0.72 0.19 245 / 0.7), transparent 70%)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
								style: { boxShadow: `inset 0 0 40px ${c.color === "ember" ? "rgba(220, 20, 60, 0.3)" : c.color === "gold" ? "rgba(255, 179, 0, 0.3)" : "rgba(74, 20, 140, 0.3)"}` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-6 z-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-[0.35em] text-white/60 group-hover:text-white/80 transition-colors",
										children: c.title.split(" · ")[0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "display mt-2 text-3xl text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1 flex-1 overflow-hidden rounded-full bg-white/10 group-hover:bg-white/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full transition-all duration-1000 rounded-full shadow-lg",
												style: {
													width: `${c.power}%`,
													background: c.color === "ember" ? "linear-gradient(90deg, oklch(0.66 0.22 40), oklch(0.8 0.2 30))" : c.color === "gold" ? "linear-gradient(90deg, oklch(0.82 0.14 88), oklch(0.95 0.12 95))" : "linear-gradient(90deg, oklch(0.5 0.2 245), oklch(0.85 0.15 220))",
													boxShadow: c.color === "ember" ? "0 0 20px rgba(220, 20, 60, 0.8)" : c.color === "gold" ? "0 0 20px rgba(255, 179, 0, 0.8)" : "0 0 20px rgba(74, 20, 140, 0.8)"
												}
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-white/70 group-hover:text-white transition-colors",
											children: c.power
										})]
									})
								]
							})
						]
					})
				}, c.name))
			})]
		})
	});
}
function CharacterModal({ c, onClose }) {
	(0, import_react.useEffect)(() => {
		if (!c) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [c, onClose]);
	if (!c) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 30,
				scale: .98
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			transition: {
				duration: .5,
				ease: [
					.16,
					1,
					.3,
					1
				]
			},
			onClick: (e) => e.stopPropagation(),
			className: "relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl glass md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-72 md:h-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullBleedVideo, { src: characterVideos[c.name] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-auto p-8 md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full glass text-white/70 hover:text-white",
						"aria-label": "Close",
						children: "×"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.4em] text-[color:var(--gold)]",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display mt-3 text-5xl text-white",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-white/70",
						children: c.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.3em] text-white/50",
							children: "Abilities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: c.abilities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full glass px-3 py-1.5 text-xs text-white/80",
								children: a
							}, a))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.3em] text-white/50",
							children: "Power Level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: { width: 0 },
									animate: { width: `${c.power}%` },
									transition: {
										duration: 1.2,
										ease: [
											.16,
											1,
											.3,
											1
										]
									},
									className: "h-full",
									style: { background: "linear-gradient(90deg, var(--arcane), var(--gold))" }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-white/80",
								children: [c.power, "/100"]
							})]
						})]
					})
				]
			})]
		})
	});
}
function World() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "world",
		ref,
		className: "relative overflow-hidden py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { y },
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetImg, {
					asset: "background",
					alt: "",
					"aria-hidden": true,
					className: "h-[120%] w-full object-cover opacity-40"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fog, { opacity: .5 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
					children: "The Realm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-4 text-5xl text-white md:text-6xl",
					children: "A world that breathes"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							title: "Kingdoms of Aldreth",
							copy: "Iron banners, cathedral spires, and the last free crown."
						},
						{
							title: "Shattered Ruins",
							copy: "Where forgotten gods sleep beneath collapsed stars."
						},
						{
							title: "The Ashen Mountains",
							copy: "Peaks kissed by dragonfire, home to the wandering exiles."
						},
						{
							title: "Whisperwood",
							copy: "Living forests that remember every promise ever broken."
						}
					].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-full rounded-2xl glass p-6 transition hover:scale-[1.02] hover:glow-blue",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "display text-2xl text-white",
								children: f.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-white/60",
								children: f.copy
							})]
						})
					}, f.title))
				})]
			})
		]
	});
}
function Battle() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	const scale = useTransform(scrollYProgress, [
		0,
		.5,
		1
	], [
		1.05,
		1.15,
		1.25
	]);
	const rot = useTransform(scrollYProgress, [0, 1], [-.6, .6]);
	const [flash, setFlash] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			setFlash(true);
			setTimeout(() => setFlash(false), 90);
		}, 4200);
		return () => clearInterval(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					scale,
					rotate: rot
				},
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullBleedVideo, { src: "/background1.mp4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/20" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-10 transition-opacity duration-100",
				style: {
					opacity: flash ? .35 : 0,
					background: "radial-gradient(60% 40% at 60% 30%, rgba(255,255,255,0.18), transparent 70%)",
					mixBlendMode: "screen"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {
				count: 30,
				color: "ember"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-20 mx-auto flex h-full max-w-6xl items-end px-4 pb-20 sm:px-6 sm:pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.5em] text-[color:var(--ember)]",
							children: "The Siege"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display mt-4 text-4xl text-white sm:text-5xl md:text-7xl",
							children: "Fifty against fifty thousand."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-white/70 md:text-lg",
							children: "Real-time massed combat. Elemental storms. Guild-level tactics. Every clash is remembered by the realm."
						})
					]
				}) })
			})
		]
	});
}
function BattleToFeaturesBreak() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-hidden": true,
		className: "relative isolate min-h-[28svh] overflow-hidden bg-background sm:min-h-[34svh]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background via-[#120606] to-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-px w-[min(74rem,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f06a3d]/35 to-transparent shadow-[0_0_42px_rgba(240,80,45,0.28)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[calc(50%+18px)] h-px w-[min(56rem,64vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {
				count: 18,
				color: "ember",
				className: "opacity-70"
			})
		]
	});
}
var stack = [
	"Unity",
	"Unreal Engine",
	"Photon",
	"Mirror",
	"Docker",
	"Kubernetes",
	"PostgreSQL",
	"MongoDB",
	"Redis",
	"AWS",
	"Azure",
	"Google Cloud"
];
function Technology() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
				children: "Under the hood"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display mt-4 text-5xl text-white md:text-6xl",
				children: "A modern arcane stack."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
				children: stack.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 6 * .05,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl glass px-4 py-6 text-sm text-white/80 transition hover:text-white hover:glow-blue",
						children: s
					})
				}, s))
			})]
		})
	});
}
var gameplayVideos = Array.from({ length: 10 }, (_, index) => `/play${index + 1}.mp4`);
function GameplayVideoCarousel() {
	const [active, setActive] = (0, import_react.useState)(0);
	const [direction, setDirection] = (0, import_react.useState)(1);
	const goTo = (nextIndex, nextDirection) => {
		setDirection(nextDirection);
		setActive((nextIndex + gameplayVideos.length) % gameplayVideos.length);
	};
	const previous = () => goTo(active - 1, -1);
	const next = () => goTo(active + 1, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mt-12 w-full max-w-6xl text-left sm:mt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-col gap-3 text-center sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.38em] text-[color:var(--gold)]",
					children: "Gameplay preview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "display mt-2 text-3xl leading-tight text-white sm:text-4xl",
					children: "Watch the battlefield"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs uppercase tracking-[0.26em] text-white/45",
					children: [
						String(active + 1).padStart(2, "0"),
						" / ",
						String(gameplayVideos.length).padStart(2, "0")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_70px_rgba(90,145,255,0.18)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-video max-h-[72svh] min-h-[210px] w-full sm:min-h-[360px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							custom: direction,
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.video, {
								custom: direction,
								initial: {
									x: direction > 0 ? "100%" : "-100%",
									opacity: .35
								},
								animate: {
									x: 0,
									opacity: 1
								},
								exit: {
									x: direction > 0 ? "-100%" : "100%",
									opacity: .35
								},
								transition: {
									duration: .42,
									ease: [
										.16,
										1,
										.3,
										1
									]
								},
								className: "absolute inset-0 h-full w-full bg-black object-contain",
								src: gameplayVideos[active],
								muted: true,
								defaultMuted: true,
								loop: true,
								playsInline: true,
								autoPlay: true,
								controls: true,
								preload: "metadata"
							}, gameplayVideos[active])
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 items-center gap-3 sm:mt-5 sm:grid-cols-[1fr_auto_1fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: previous,
						className: "order-1 inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] sm:order-none sm:h-11 sm:justify-self-start",
						"aria-label": "Previous gameplay video",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Previous"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "order-3 col-span-2 flex flex-wrap items-center justify-center gap-1.5 sm:order-none sm:col-span-1",
						children: gameplayVideos.map((src, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => goTo(index, index >= active ? 1 : -1),
							className: `h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] ${index === active ? "w-7 bg-[color:var(--gold)]" : "w-2.5 bg-white/25 hover:bg-white/45"}`,
							"aria-label": `Show gameplay video ${index + 1}`
						}, src))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: next,
						className: "order-2 inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] sm:order-none sm:h-11 sm:justify-self-end",
						"aria-label": "Next gameplay video",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Next"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0" })]
					})
				]
			})
		]
	});
}
function formatDownloadBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
function formatDownloadTime(seconds) {
	if (!Number.isFinite(seconds) || seconds <= 0) return "0s";
	const whole = Math.round(seconds);
	const minutes = Math.floor(whole / 60);
	const rest = whole % 60;
	return minutes > 0 ? `${minutes}m ${String(rest).padStart(2, "0")}s` : `${rest}s`;
}
function Download({ onDownload, status }) {
	const started = status.phase === "complete";
	const loading = status.phase === "loading";
	const progressPercent = status.phase === "loading" || status.phase === "complete" ? status.percent : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "download",
		className: "relative isolate overflow-hidden py-24 sm:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute inset-0",
			style: { background: "radial-gradient(circle at 50% 42%, rgba(255, 220, 140, 0.16), transparent 22%), radial-gradient(circle at 50% 58%, rgba(76, 142, 255, 0.16), transparent 34%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 text-center sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
						children: "Get the build"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-4 text-4xl leading-tight text-white sm:text-5xl md:text-6xl",
						children: "Download the game"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base",
						children: "Click the sword to begin your Legends of Eternity download."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameplayVideoCarousel, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 sm:mt-16",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-6 sm:grid-cols-4",
								children: [
									["Version", "v0.1.0-alpha"],
									["Size", "~128 MB"],
									["Released", "Jul 10, 2026"],
									["Downloads", "Live counter"]
								].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-[0.3em] text-white/40",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-white",
									children: v
								})] }, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mx-auto mt-12 grid h-64 w-64 place-items-center sm:h-80 sm:w-80",
								children: [[
									0,
									1,
									2
								].map((ring) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									"aria-hidden": true,
									className: "absolute inset-0 rounded-full border border-[color:var(--gold)]/30",
									animate: started ? {
										scale: [.72, 1.28],
										opacity: [.75, 0]
									} : {
										scale: [.88, 1],
										opacity: [
											.25,
											.5,
											.25
										]
									},
									transition: {
										duration: started ? 1.1 : 3.2,
										repeat: Infinity,
										delay: ring * .22,
										ease: "easeOut"
									}
								}, ring)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									onClick: onDownload,
									disabled: loading,
									"aria-label": "Download Legends of Eternity",
									className: "group relative grid h-40 w-40 place-items-center rounded-full border border-[#f5d88a]/50 bg-black/45 shadow-[0_0_70px_rgba(255,214,120,0.22)] backdrop-blur-xl transition disabled:opacity-70 sm:h-52 sm:w-52",
									whileHover: {
										scale: 1.06,
										rotate: -2
									},
									whileTap: {
										scale: .94,
										rotate: 6
									},
									animate: started ? {
										scale: [
											1,
											1.18,
											1
										],
										boxShadow: [
											"0 0 50px rgba(255,214,120,0.28)",
											"0 0 120px rgba(255,214,120,0.72)",
											"0 0 60px rgba(120,170,255,0.44)"
										]
									} : { y: [
										0,
										-8,
										0
									] },
									transition: {
										duration: started ? .9 : 3,
										repeat: started ? 0 : Infinity,
										ease: "easeInOut"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-3 rounded-full bg-gradient-to-b from-white/10 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
										src: "/favicon.ico",
										alt: "",
										className: "relative h-24 w-24 object-contain drop-shadow-[0_0_28px_rgba(255,226,150,0.75)] sm:h-32 sm:w-32",
										draggable: false,
										animate: started ? {
											rotate: [
												0,
												-12,
												12,
												0
											],
											scale: [
												1,
												1.18,
												1
											]
										} : { rotate: [
											0,
											-4,
											0,
											4,
											0
										] },
										transition: {
											duration: started ? .85 : 4,
											repeat: started ? 0 : Infinity,
											ease: "easeInOut"
										}
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto mt-8 max-w-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-[0.32em] text-white/50",
										children: loading ? "Downloading..." : started ? "Complete" : status.phase === "error" ? "Download failed" : "Legends of Eternity"
									}),
									(loading || started) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 rounded-2xl border border-white/10 bg-black/35 p-4 text-left shadow-[0_0_40px_rgba(120,170,255,0.12)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-white/55",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progressPercent, "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDownloadTime(status.elapsedSeconds) })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-3 overflow-hidden rounded-full bg-white/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													className: "h-full rounded-full bg-gradient-to-r from-[#75d6ff] via-[#ffe08a] to-[#ff8f70] shadow-[0_0_24px_rgba(255,224,138,0.55)]",
													initial: false,
													animate: { width: `${progressPercent}%` },
													transition: {
														duration: .28,
														ease: "easeOut"
													}
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-center justify-between gap-4 text-xs text-white/50",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDownloadBytes(status.loadedBytes) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status.totalBytes > 0 ? formatDownloadBytes(status.totalBytes) : "Calculating size" })]
											})
										]
									}),
									status.phase === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-4 max-w-md rounded-full border border-[color:var(--ember)]/30 bg-[color:var(--ember)]/10 px-5 py-3 text-sm text-[#ffb39d]",
										children: "Please try again."
									})
								]
							}),
							started && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 12,
									scale: .96
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								className: "mx-auto mt-4 max-w-md rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10 px-5 py-3 text-sm text-[#ffe7a3] shadow-[0_0_40px_rgba(255,214,120,0.16)]",
								children: "Complete"
							})
						]
					})
				})
			]
		})]
	});
}
function FinalVideo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "final-video",
		className: "relative overflow-hidden py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_60px_rgba(120,160,255,0.18)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullBleedVideo, {
					src: "/Final.mp4",
					controls: true
				})
			}) })
		})
	});
}
function Contact({ onSubmit }) {
	const [state, setState] = (0, import_react.useState)({
		name: "",
		email: "",
		message: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
					children: "Send a raven"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-4 text-5xl text-white md:text-6xl",
					children: "Speak with the studio."
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: async (e) => {
						e.preventDefault();
						setBusy(true);
						setErr(null);
						try {
							await onSubmit(state);
							setDone(true);
							setState({
								name: "",
								email: "",
								message: ""
							});
						} catch (e) {
							setErr(e instanceof Error ? e.message : "Something went wrong.");
						} finally {
							setBusy(false);
						}
					},
					className: "mt-10 space-y-4 rounded-2xl glass p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								maxLength: 120,
								value: state.name,
								onChange: (e) => setState((s) => ({
									...s,
									name: e.target.value
								})),
								placeholder: "Your name",
								className: "w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								maxLength: 200,
								value: state.email,
								onChange: (e) => setState((s) => ({
									...s,
									email: e.target.value
								})),
								placeholder: "Your email",
								className: "w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							rows: 5,
							maxLength: 5e3,
							value: state.message,
							onChange: (e) => setState((s) => ({
								...s,
								message: e.target.value
							})),
							placeholder: "Your message",
							className: "w-full resize-none rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[color:var(--gold)]",
									children: "✓ Message sent to the studio."
								}), err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[color:var(--ember)]",
									children: err
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								className: "rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.3em] text-black transition hover:scale-[1.02] disabled:opacity-60",
								children: busy ? "Sending…" : "Send"
							})]
						})
					]
				})
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative border-t border-white/5 py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-md glass glow-blue",
						style: { animation: "shimmer 3s ease-in-out infinite" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "display text-gradient-gold text-lg",
							children: "L"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "display text-sm tracking-[0.35em] text-white/80",
						children: "LEGENDS OF ETERNITY"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "Discord"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "Twitter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "YouTube"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white",
							children: "Terms"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-white/40",
					children: "© 2026 Legends of Eternity"
				})
			]
		})
	});
}
var GAME_FILE_SIZE = 134015488;
function Home() {
	useNavigate();
	const [openChar, setOpenChar] = (0, import_react.useState)(null);
	const [downloadStatus, setDownloadStatus] = (0, import_react.useState)({ phase: "idle" });
	const [showIntro, setShowIntro] = (0, import_react.useState)(true);
	const [siteImpact, setSiteImpact] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const timeout = window.setTimeout(() => {
			setShowIntro(false);
			if (prefersReducedMotion) {
				document.body.style.overflow = "";
				return;
			}
			setSiteImpact(true);
			window.setTimeout(() => {
				setSiteImpact(false);
				document.body.style.overflow = "";
			}, 1250);
		}, prefersReducedMotion ? 350 : 2600);
		document.body.style.overflow = "hidden";
		return () => {
			window.clearTimeout(timeout);
			document.body.style.overflow = "";
		};
	}, []);
	const handleDownload = (0, import_react.useCallback)(async () => {
		setDownloadStatus({
			phase: "loading",
			loadedBytes: 0,
			totalBytes: 0,
			percent: 0,
			elapsedSeconds: 0
		});
		const sid = ensureVisitorSession();
		const fileName = "LegendsofEternity.exe";
		const url = `/api/public/download?sid=${encodeURIComponent(sid)}&file=${encodeURIComponent(fileName)}`;
		const startedAt = performance_default.now();
		let downloadId = null;
		let lastProgressReportAt = 0;
		const reportProgress = async (loadedBytes, totalBytes, percent, elapsedSeconds, completed = false, create = false) => {
			try {
				const body = await (await fetch("/api/public/download-progress", {
					method: "POST",
					credentials: "same-origin",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						downloadId,
						sessionId: sid,
						fileName,
						downloadedBytes: loadedBytes,
						totalBytes,
						percent,
						elapsedSeconds,
						completed,
						create
					})
				})).json().catch(() => null);
				if (body?.downloadId) downloadId = body.downloadId;
				return body?.downloadId || null;
			} catch (error) {
				console.warn("Download progress report failed", error);
				return null;
			}
		};
		try {
			await reportProgress(0, GAME_FILE_SIZE, 0, 0, false, true);
			const downloadUrl = downloadId ? `${url}&did=${encodeURIComponent(downloadId)}` : url;
			const { blob, loadedBytes, totalBytes } = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				let loadedBytes = 0;
				let totalBytes = 0;
				xhr.open("GET", downloadUrl, true);
				xhr.responseType = "blob";
				xhr.withCredentials = true;
				xhr.onprogress = (event) => {
					loadedBytes = event.loaded;
					totalBytes = event.lengthComputable ? event.total : totalBytes;
					const elapsedSeconds = Math.max(0, (performance_default.now() - startedAt) / 1e3);
					const percent = totalBytes > 0 ? Math.min(99, Math.round(loadedBytes / totalBytes * 100)) : 0;
					setDownloadStatus({
						phase: "loading",
						loadedBytes,
						totalBytes,
						percent,
						elapsedSeconds
					});
					const now = performance_default.now();
					if (now - lastProgressReportAt >= 1e3) {
						lastProgressReportAt = now;
						reportProgress(loadedBytes, totalBytes, percent, elapsedSeconds);
					}
				};
				xhr.onload = () => {
					downloadId = xhr.getResponseHeader("x-download-id") || downloadId;
					if (xhr.status < 200 || xhr.status >= 300) {
						reject(/* @__PURE__ */ new Error("Download failed"));
						return;
					}
					const responseBlob = xhr.response;
					const responseLength = Number(xhr.getResponseHeader("content-length") || "0");
					resolve({
						blob: responseBlob,
						loadedBytes: loadedBytes || responseBlob.size,
						totalBytes: totalBytes || responseLength || responseBlob.size
					});
				};
				xhr.onerror = () => reject(/* @__PURE__ */ new Error("Download failed"));
				xhr.onabort = () => reject(/* @__PURE__ */ new Error("Download cancelled"));
				xhr.send();
			});
			const objectUrl = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = objectUrl;
			anchor.download = fileName;
			anchor.style.display = "none";
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
			window.setTimeout(() => URL.revokeObjectURL(objectUrl), 3e4);
			await reportProgress(loadedBytes || blob.size, totalBytes || blob.size, 100, Math.max(0, (performance_default.now() - startedAt) / 1e3), true);
			setDownloadStatus({
				phase: "complete",
				loadedBytes: loadedBytes || blob.size,
				totalBytes: totalBytes || blob.size,
				percent: 100,
				elapsedSeconds: Math.max(0, (performance_default.now() - startedAt) / 1e3)
			});
		} catch (error) {
			console.error("Download failed", error);
			setDownloadStatus({ phase: "error" });
		}
	}, []);
	const handleContact = (0, import_react.useCallback)(async (d) => {
		await submitContact({ data: d });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showIntro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonsterIntro, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "min-h-screen origin-center transform-gpu",
				animate: siteImpact ? {
					scale: [
						1,
						1.12,
						.965,
						1.015,
						1
					],
					filter: [
						"brightness(0.72) contrast(1.25)",
						"brightness(1.18) contrast(1.1)",
						"brightness(0.9) contrast(1.22)",
						"brightness(1.03) contrast(1)",
						"brightness(1) contrast(1)"
					]
				} : {
					scale: 1,
					filter: "brightness(1) contrast(1)"
				},
				transition: {
					duration: 1.15,
					times: [
						0,
						.18,
						.42,
						.72,
						1
					],
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseGlow, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Characters, { onOpen: setOpenChar }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BattleToFeaturesBreak, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Technology, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, { onSubmit: handleContact }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalVideo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							onDownload: handleDownload,
							status: downloadStatus
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openChar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterModal, {
				c: openChar,
				onClose: () => setOpenChar(null)
			}) })
		]
	});
}
function MonsterIntro() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		"aria-hidden": true,
		className: "fixed inset-0 z-[200] isolate flex items-center justify-center overflow-hidden bg-black",
		initial: { opacity: 1 },
		exit: {
			opacity: 0,
			filter: "blur(24px)"
		},
		transition: {
			duration: 1.35,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: { backgroundImage: "radial-gradient(circle at 50% 42%, rgba(160, 13, 13, 0.32), transparent 18%), radial-gradient(circle at 50% 52%, rgba(80, 0, 0, 0.28), transparent 34%), linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(10,0,0,0.96) 46%, rgba(0,0,0,1) 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 z-[1]",
				initial: { opacity: 0 },
				animate: { opacity: [
					0,
					.12,
					.34,
					.62,
					.72,
					.22,
					0
				] },
				transition: {
					duration: 7.35,
					times: [
						0,
						.16,
						.38,
						.58,
						.72,
						.9,
						1
					],
					ease: "easeInOut"
				},
				style: {
					backgroundImage: "radial-gradient(circle at 50% 45%, rgba(255,44,25,0.28), transparent 23%), radial-gradient(circle at 38% 58%, rgba(120,0,0,0.32), transparent 28%), radial-gradient(circle at 62% 58%, rgba(120,0,0,0.32), transparent 28%)",
					mixBlendMode: "screen"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 z-[2]",
				initial: {
					opacity: 0,
					scale: 1.25
				},
				animate: {
					opacity: [
						0,
						.22,
						.48,
						.58,
						.2,
						0
					],
					scale: [
						1.35,
						1.16,
						1.02,
						1.08,
						1.22,
						1.45
					]
				},
				transition: {
					duration: 7.5,
					times: [
						0,
						.2,
						.48,
						.68,
						.88,
						1
					],
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					backgroundImage: "conic-gradient(from 130deg at 50% 50%, transparent, rgba(35,0,0,0.95), rgba(255,36,20,0.16), rgba(0,0,0,0.95), transparent)",
					filter: "blur(34px)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 z-[3] h-1/3 bg-gradient-to-b from-black to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-gradient-to-t from-black via-[#110000]/90 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {
				count: 58,
				color: "ember",
				className: "z-[4]"
			}),
			[
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute z-[4] h-[70svh] w-[24vw] min-w-44 rounded-full bg-black/80 blur-3xl",
				initial: {
					opacity: 0,
					rotate: i === 1 ? -28 : i === 2 ? 28 : 0,
					scaleY: .65,
					x: i === 1 ? "-34vw" : i === 2 ? "34vw" : 0,
					y: "18svh"
				},
				animate: {
					opacity: [
						0,
						.38,
						.82,
						.7,
						.24,
						0
					],
					scaleY: [
						.65,
						1.04,
						1.42,
						1.7,
						1.95,
						2.15
					],
					x: i === 1 ? [
						"-38vw",
						"-24vw",
						"-8vw",
						"-16vw",
						"-34vw",
						"-48vw"
					] : i === 2 ? [
						"38vw",
						"24vw",
						"8vw",
						"16vw",
						"34vw",
						"48vw"
					] : [
						0,
						0,
						0,
						0,
						0,
						0
					],
					y: [
						"20svh",
						"8svh",
						"-2svh",
						"-12svh",
						"-22svh",
						"-34svh"
					]
				},
				transition: {
					duration: 7.45,
					times: [
						0,
						.22,
						.52,
						.72,
						.9,
						1
					],
					ease: "easeInOut"
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "relative z-[5] h-[min(104svh,1040px)] w-[min(124vw,1120px)]",
				initial: {
					opacity: 0,
					scale: .38,
					y: 28,
					filter: "brightness(0) contrast(1.55) blur(28px)"
				},
				animate: {
					opacity: [
						0,
						.12,
						.82,
						1,
						1,
						.94,
						0
					],
					scale: [
						.38,
						.5,
						.82,
						1.05,
						2.08,
						2.12,
						2.48
					],
					x: [
						0,
						-2,
						3,
						-2,
						-18,
						12,
						0
					],
					y: [
						28,
						14,
						4,
						0,
						-42,
						-34,
						-10
					],
					filter: [
						"brightness(0) contrast(1.55) blur(28px)",
						"brightness(0.18) contrast(1.7) blur(18px)",
						"brightness(0.68) contrast(1.48) blur(5px)",
						"brightness(0.95) contrast(1.35) blur(0px)",
						"brightness(1.32) contrast(1.58) blur(0px)",
						"brightness(1.04) contrast(2.05) blur(5px)",
						"brightness(0.08) contrast(2.3) blur(34px)"
					]
				},
				transition: {
					duration: 7.3,
					times: [
						0,
						.16,
						.38,
						.56,
						.71,
						.84,
						1
					],
					ease: [
						.16,
						1,
						.3,
						1
					]
				},
				style: {
					maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, black 48%, rgba(0,0,0,0.82) 58%, transparent 75%)",
					WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, black 48%, rgba(0,0,0,0.82) 58%, transparent 75%)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/face.png",
					alt: "",
					className: "h-full w-full object-contain object-center opacity-95",
					draggable: false,
					style: {
						mixBlendMode: "lighten",
						filter: "drop-shadow(0 0 28px rgba(255,0,0,0.82)) drop-shadow(0 0 96px rgba(120,0,0,0.9)) drop-shadow(0 46px 130px rgba(0,0,0,1))"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute z-[6] h-[min(11svh,88px)] w-[min(42vw,390px)] rounded-full bg-[#ff1f12] blur-2xl",
				initial: {
					opacity: 0,
					scaleX: .25,
					scaleY: .16,
					y: -24
				},
				animate: {
					opacity: [
						0,
						0,
						.42,
						1,
						.92,
						.34,
						0
					],
					scaleX: [
						.2,
						.28,
						.66,
						1.08,
						1.62,
						1.9,
						2.2
					],
					scaleY: [
						.12,
						.14,
						.22,
						.3,
						.2,
						.1,
						.04
					],
					y: [
						-20,
						-22,
						-28,
						-32,
						-98,
						-108,
						-118
					]
				},
				transition: {
					duration: 7.25,
					times: [
						0,
						.22,
						.42,
						.58,
						.72,
						.88,
						1
					],
					ease: "easeInOut"
				},
				style: { mixBlendMode: "screen" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute z-[6] h-[min(15svh,118px)] w-[min(30vw,300px)] rounded-full bg-[#d4110a] blur-3xl",
				initial: {
					opacity: 0,
					scale: .22,
					y: 118
				},
				animate: {
					opacity: [
						0,
						0,
						.34,
						.78,
						.58,
						.18,
						0
					],
					scale: [
						.22,
						.32,
						.78,
						1.22,
						1.76,
						2.08,
						2.28
					],
					y: [
						122,
						118,
						112,
						100,
						58,
						66,
						84
					]
				},
				transition: {
					duration: 7.25,
					times: [
						0,
						.28,
						.48,
						.62,
						.74,
						.9,
						1
					],
					ease: "easeInOut"
				},
				style: { mixBlendMode: "screen" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 z-[7]",
				initial: { opacity: 0 },
				animate: { opacity: [
					0,
					0,
					.12,
					0,
					.5,
					0,
					.18,
					0
				] },
				transition: {
					duration: 7.25,
					times: [
						0,
						.34,
						.5,
						.56,
						.7,
						.74,
						.82,
						1
					]
				},
				style: {
					backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
					mixBlendMode: "overlay"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 z-[8] bg-white mix-blend-overlay",
				initial: { opacity: 0 },
				animate: { opacity: [
					0,
					0,
					.06,
					0,
					.32,
					0,
					.12,
					0
				] },
				transition: {
					duration: 7.25,
					times: [
						0,
						.4,
						.54,
						.58,
						.7,
						.74,
						.82,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "pointer-events-none absolute inset-0 z-[9] bg-black",
				initial: { opacity: .82 },
				animate: { opacity: [
					.96,
					.86,
					.58,
					.24,
					.08,
					.44,
					.94
				] },
				transition: {
					duration: 7.25,
					times: [
						0,
						.16,
						.36,
						.56,
						.72,
						.9,
						1
					],
					ease: "easeInOut"
				},
				style: {
					maskImage: "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, black 72%)",
					WebkitMaskImage: "radial-gradient(circle at 50% 48%, transparent 0%, transparent 30%, black 72%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 z-[10] shadow-[inset_0_0_190px_rgba(0,0,0,1)]" })
		]
	});
}
//#endregion
export { Home as component };
