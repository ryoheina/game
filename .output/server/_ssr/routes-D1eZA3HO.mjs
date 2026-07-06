import { a as __toESM } from "../_runtime.mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as MouseGlow, r as Particles, t as Fog } from "./fx-DmVqfUhc.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-9EjmF9OT.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DZO41X7i.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Y9StTeqv.mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1eZA3HO.js
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
var IMG = {
	azrael: "/AZRAEL.png",
	background: "/Background.png",
	elysia: "/ELYSIA.png",
	lucas: "/LUCAS.png",
	zerevok: "/ZEREVOK.png"
};
function Hero({ onDownload }) {
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
		className: "relative isolate h-[100vh] min-h-[720px] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y,
					scale
				},
				className: "absolute inset-0 z-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: IMG.azrael,
						alt: "Azrael, the Chosen",
						className: "h-full w-full object-cover",
						style: {
							objectPosition: "18% center",
							animation: "slowZoom 30s ease-in-out infinite alternate",
							transform: "scale(1.12)",
							transformOrigin: "20% center"
						}
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
				className: "relative z-[20] mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24",
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
							className: "mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-2 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-[0_0_28px_rgba(255,255,255,0.14)]",
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
							className: "display text-6xl leading-[0.92] text-white md:text-8xl font-black drop-shadow-[0_0_45px_rgba(255,255,255,0.2)]",
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
							className: "mt-8 max-w-xl text-lg text-[rgba(255,255,255,0.85)] md:text-xl leading-relaxed font-light drop-shadow-[0_0_20px_rgba(0,0,0,0.24)]",
							children: "A next-generation 3D multiplayer fantasy RPG. Forge alliances, wield forbidden magic, and stand against the tide of eternal darkness."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onDownload,
								className: "relative overflow-hidden rounded-full bg-gradient-to-r from-[#ffd96c] via-[#f9f3de] to-[#b9d2ff] px-10 py-4 text-sm uppercase tracking-[0.25em] text-black font-black transition-all duration-500 border border-[#d8c07c]/40 shadow-[0_0_30px_rgba(255,211,133,0.28)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(255,211,133,0.45)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10",
									children: "Download Project"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#characters",
								className: "relative inline-flex items-center justify-center rounded-full bg-[#0c1d48]/90 px-10 py-4 text-sm uppercase tracking-[0.25em] text-white shadow-[0_0_30px_rgba(106,151,255,0.25)] border border-[#6e9cff]/50 transition-all duration-500 hover:bg-[#10255e]/95 hover:shadow-[0_0_45px_rgba(106,151,255,0.42)]",
								children: "Explore Characters"
							})]
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
		img: IMG.azrael,
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
		img: IMG.lucas,
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
		img: IMG.elysia,
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
		img: IMG.zerevok,
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
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: characters.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onOpen(c),
						className: "group relative block h-[520px] w-full overflow-hidden rounded-2xl text-left glass transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(74,20,140,0.6)] focus:outline-none focus:ring-2 focus:ring-[color:var(--arcane)] backdrop-blur-xl border border-white/10 hover:border-white/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.img,
								alt: c.name,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover transition-all duration-[1800ms] group-hover:scale-110 group-hover:brightness-110",
								style: { objectPosition: c.name === "Elysia" ? "50% 20%" : "50% 15%" }
							}),
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: c.img,
					alt: c.name,
					className: "absolute inset-0 h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" })]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: IMG.background,
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
		className: "relative isolate h-[100vh] min-h-[600px] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					scale,
					rotate: rot
				},
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: IMG.background,
					alt: "Battle of Aldreth",
					className: "h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/20" })]
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
				className: "relative z-20 mx-auto flex h-full max-w-6xl items-end px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.5em] text-[color:var(--ember)]",
							children: "The Siege"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display mt-4 text-5xl text-white md:text-7xl",
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
var featureList = [
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
	["Cross Platform", "PC, console, and cloud clients."]
];
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "features",
		className: "relative py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
				children: "Systems"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display mt-4 text-5xl text-white md:text-6xl",
				children: "Built for legends."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: featureList.map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i % 6 * .05,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative h-full overflow-hidden rounded-2xl glass p-6 transition hover:glow-blue",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity group-hover:opacity-100",
								style: { background: "radial-gradient(closest-side, oklch(0.72 0.19 245 / 0.35), transparent)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "display text-xl text-white",
								children: t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-white/60",
								children: d
							})
						]
					})
				}, t))
			})]
		})
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
function Download({ onDownload, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "download",
		className: "relative overflow-hidden py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
					children: "Get the build"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-4 text-5xl text-white md:text-6xl",
					children: "Download the project"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-white/60",
					children: "Delivered by our secure edge. Every download is logged for the studio."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 rounded-3xl glass p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 sm:grid-cols-4",
							children: [
								["Version", "v0.1.0-alpha"],
								["Size", "~2.4 GB"],
								["Released", "Jul 05, 2026"],
								["Downloads", "Live counter"]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.3em] text-white/40",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-white",
								children: v
							})] }, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onDownload,
							disabled: status === "loading",
							className: "mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[color:var(--arcane)] to-[color:var(--gold)] px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:scale-[1.02] glow-blue disabled:opacity-70",
							children: status === "loading" ? "Preparing…" : status === "done" ? "✓ Started" : "Download Project"
						}),
						status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "mt-4 text-sm text-white/60",
							children: "Your download will begin momentarily. Thank you for supporting the project."
						})
					]
				})
			})]
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
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var trackVisit = createServerFn({ method: "POST" }).validator((d) => objectType({
	sessionId: stringType().min(8).max(64),
	path: stringType().max(500)
}).parse(d)).handler(createSsrRpc("5e7bc6b7985a4c5567ec29c826f97eeb7805c320edefacaaf2df3b19b86050da"));
var submitContact = createServerFn({ method: "POST" }).validator((d) => objectType({
	name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(200),
	message: stringType().trim().min(1).max(5e3)
}).parse(d)).handler(createSsrRpc("8043f9f461a2e106a6aa3ba0474234bd1598036ef6e2dc8a67dea4ff61dab955"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6d92e280c68cd3c11aac298fc57f9269dca8d85ae15c9747e0c8a8d46051fccf"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("abd124c618fd11979349d78fa7b5705a4311550c5a02f311710e53685f427a7f"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5058339e4274bf852ada72847e61fa713d72a2a54e6e0f6d25efda66bc028b9f"));
function ensureSession() {
	if (typeof window === "undefined") return "";
	const k = "loe_sid";
	let sid = localStorage.getItem(k);
	if (!sid) {
		sid = crypto.randomUUID();
		localStorage.setItem(k, sid);
	}
	return sid;
}
function Home() {
	useNavigate();
	const [openChar, setOpenChar] = (0, import_react.useState)(null);
	const [downloadStatus, setDownloadStatus] = (0, import_react.useState)("idle");
	(0, import_react.useEffect)(() => {
		const sid = ensureSession();
		if (!sid) return;
		trackVisit({ data: {
			sessionId: sid,
			path: window.location.pathname
		} }).catch(() => {});
		const heartbeat = setInterval(() => {
			trackVisit({ data: {
				sessionId: sid,
				path: window.location.pathname
			} }).catch(() => {});
		}, 6e4);
		return () => clearInterval(heartbeat);
	}, []);
	const handleDownload = (0, import_react.useCallback)(async () => {
		setDownloadStatus("loading");
		const iframe = document.createElement("iframe");
		iframe.style.display = "none";
		const sid = ensureSession();
		iframe.src = `/api/public/download?sid=${encodeURIComponent(sid)}&file=${encodeURIComponent("3D Game.rar")}`;
		document.body.appendChild(iframe);
		setTimeout(() => {
			setDownloadStatus("done");
			setTimeout(() => document.body.removeChild(iframe), 3e3);
		}, 900);
	}, []);
	const handleContact = (0, import_react.useCallback)(async (d) => {
		await submitContact({ data: d });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseGlow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { onDownload: handleDownload }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Characters, { onOpen: setOpenChar }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battle, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Technology, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
					onDownload: handleDownload,
					status: downloadStatus
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, { onSubmit: handleContact })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openChar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterModal, {
				c: openChar,
				onClose: () => setOpenChar(null)
			}) })
		]
	});
}
//#endregion
export { Home as component };
