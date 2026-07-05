import { a as __toESM } from "../_runtime.mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as submitContact, r as trackVisit } from "./analytics.functions-Dhm407dA.mjs";
import { n as MouseGlow, r as Particles, t as Fog } from "./fx-B3gB7W2L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BShigYl8.js
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: `hidden items-center gap-1 rounded-full px-2 py-1 md:flex ${scrolled ? "glass" : ""}`,
					children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: it.href,
						className: "rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white",
						children: it.label
					}, it.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					className: "rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-white",
					children: "Admin"
				})
			]
		})
	});
}
var IMG = {
	azrael: {
		version: 1,
		asset_id: "d25da4f4-c48e-4aa6-aafc-aae001964652",
		project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
		url: "/__l5e/assets-v1/d25da4f4-c48e-4aa6-aafc-aae001964652/azrael.png",
		r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/d25da4f4-c48e-4aa6-aafc-aae001964652/azrael.png",
		original_filename: "azrael.png",
		size: 2682758,
		content_type: "image/png",
		created_at: "2026-07-05T20:44:30Z"
	}.url,
	background: {
		version: 1,
		asset_id: "5ab0fb45-87a3-4874-afde-22203a9dd8c3",
		project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
		url: "/__l5e/assets-v1/5ab0fb45-87a3-4874-afde-22203a9dd8c3/background.png",
		r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/5ab0fb45-87a3-4874-afde-22203a9dd8c3/background.png",
		original_filename: "background.png",
		size: 2827878,
		content_type: "image/png",
		created_at: "2026-07-05T20:44:44Z"
	}.url,
	elysia: {
		version: 1,
		asset_id: "5f320de6-7a8d-46f9-aca3-150116e95d68",
		project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
		url: "/__l5e/assets-v1/5f320de6-7a8d-46f9-aca3-150116e95d68/elysia.png",
		r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/5f320de6-7a8d-46f9-aca3-150116e95d68/elysia.png",
		original_filename: "elysia.png",
		size: 3135347,
		content_type: "image/png",
		created_at: "2026-07-05T20:44:48Z"
	}.url,
	lucas: {
		version: 1,
		asset_id: "430dab87-0f2e-442b-99a3-08e6a804bdc1",
		project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
		url: "/__l5e/assets-v1/430dab87-0f2e-442b-99a3-08e6a804bdc1/lucas.png",
		r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/430dab87-0f2e-442b-99a3-08e6a804bdc1/lucas.png",
		original_filename: "lucas.png",
		size: 2667846,
		content_type: "image/png",
		created_at: "2026-07-05T20:44:52Z"
	}.url,
	zerevok: {
		version: 1,
		asset_id: "6bf527d3-19d5-4046-92f9-59cc8dde1648",
		project_id: "19c86a1a-2fae-4b01-ac75-d707fb406ddc",
		url: "/__l5e/assets-v1/6bf527d3-19d5-4046-92f9-59cc8dde1648/zerevok.png",
		r2_key: "a/v1/19c86a1a-2fae-4b01-ac75-d707fb406ddc/6bf527d3-19d5-4046-92f9-59cc8dde1648/zerevok.png",
		original_filename: "zerevok.png",
		size: 2346791,
		content_type: "image/png",
		created_at: "2026-07-05T20:44:55Z"
	}.url
};
function Hero({ onDownload }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative isolate h-[100vh] min-h-[720px] w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y,
					scale
				},
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: IMG.azrael,
						alt: "Azrael, the Chosen",
						className: "h-full w-full object-cover",
						style: {
							objectPosition: "18% center",
							animation: "slowZoom 30s ease-in-out infinite alternate",
							transform: "scale(1.35)",
							transformOrigin: "20% center"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {
				count: 50,
				color: "arcane"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { opacity },
				className: "relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24",
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
							className: "mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2 w-2 rounded-full bg-[color:var(--gold)]",
								style: { animation: "shimmer 2s ease-in-out infinite" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-[0.35em] text-white/70",
								children: "Chapter I · The Awakening"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "display text-6xl leading-[0.95] text-white md:text-8xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-gradient-arcane",
									children: "Legends"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-white/90",
									children: "of"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-gradient-gold",
									children: "Eternity"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-8 max-w-xl text-lg text-white/70 md:text-xl",
							children: "A next-generation 3D multiplayer fantasy RPG. Forge alliances, wield forbidden magic, and stand against the tide of eternal darkness."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-wrap gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onDownload,
									className: "group relative rounded-full bg-white px-7 py-4 text-sm uppercase tracking-[0.25em] text-black transition hover:scale-[1.02] glow-gold",
									children: "Download Project"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#characters",
									className: "rounded-full glass px-7 py-4 text-sm uppercase tracking-[0.25em] text-white/90 transition hover:text-white glow-blue",
									children: "Explore Characters"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#story",
									className: "rounded-full px-7 py-4 text-sm uppercase tracking-[0.25em] text-white/70 transition hover:text-white",
									children: "▶ Watch Trailer"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.5em] text-white/40",
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
						className: "text-xs uppercase tracking-[0.5em] text-[color:var(--gold)]",
						children: "Cast"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display mt-4 text-5xl text-white md:text-6xl",
						children: "Champions & Fallen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-white/60",
						children: "Four souls at the heart of the eternal war. Click any card to see the full dossier."
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: characters.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onOpen(c),
						className: "group relative block h-[520px] w-full overflow-hidden rounded-2xl text-left glass transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[color:var(--arcane)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.img,
								alt: c.name,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110",
								style: { objectPosition: c.name === "Elysia" ? "50% 20%" : "50% 15%" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
								style: { background: c.color === "ember" ? "radial-gradient(60% 40% at 50% 100%, oklch(0.66 0.22 40 / 0.4), transparent 70%)" : c.color === "gold" ? "radial-gradient(60% 40% at 50% 100%, oklch(0.82 0.14 88 / 0.4), transparent 70%)" : "radial-gradient(60% 40% at 50% 100%, oklch(0.72 0.19 245 / 0.5), transparent 70%)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-x-0 bottom-0 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-[0.35em] text-white/60",
										children: c.title.split(" · ")[0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "display mt-2 text-3xl text-white",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1 flex-1 overflow-hidden rounded-full bg-white/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full",
												style: {
													width: `${c.power}%`,
													background: c.color === "ember" ? "linear-gradient(90deg, oklch(0.66 0.22 40), oklch(0.8 0.2 30))" : c.color === "gold" ? "linear-gradient(90deg, oklch(0.82 0.14 88), oklch(0.95 0.12 95))" : "linear-gradient(90deg, oklch(0.5 0.2 245), oklch(0.85 0.15 220))"
												}
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-white/70",
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-black/30 to-background" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-10 transition-opacity duration-100",
				style: {
					opacity: flash ? 1 : 0,
					background: "radial-gradient(60% 40% at 60% 30%, oklch(0.95 0.15 245 / 0.6), transparent 70%)",
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
		iframe.src = "/api/public/download";
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
