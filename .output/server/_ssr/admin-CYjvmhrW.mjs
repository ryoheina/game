import { a as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { D as isRedirect, _ as useRouter, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-gykmVtt_.mjs";
import { t as getAdminStats } from "./analytics.functions-Dhm407dA.mjs";
import { n as MouseGlow } from "./fx-DmVqfUhc.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CYjvmhrW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
function Admin() {
	const navigate = useNavigate();
	const fetchStats = useServerFn(getAdminStats);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: () => fetchStats(),
		refetchInterval: 15e3
	});
	const signOut = async () => {
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center text-white/60",
		children: "Loading dashboard…"
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-2xl text-white",
				children: "Forbidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-white/60",
				children: [
					"You are signed in but not an admin. Grant your user the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "admin" }),
					" role in the database."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => refetch(),
					className: "rounded-full glass px-4 py-2 text-sm text-white",
					children: "Retry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: signOut,
					className: "rounded-full bg-white px-4 py-2 text-sm text-black",
					children: "Sign out"
				})]
			})
		] })
	});
	if (!data) return null;
	const { totals, recentVisits, recentDownloads, byCountry, byBrowser, byOs, hourly, messages } = data;
	const maxHourly = Math.max(1, ...hourly.map((h) => h.visits));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseGlow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-white/5 bg-background/70 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 place-items-center rounded-md glass glow-blue",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display text-gradient-gold text-sm",
								children: "L"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "display text-xs tracking-[0.35em] text-white/80",
							children: "STUDIO CONSOLE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "rounded-full px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white",
							children: "View site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: signOut,
							className: "rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-white/80 hover:text-white",
							children: "Sign out"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl space-y-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							["Total Visitors", totals.visits],
							["Online Now", totals.online],
							["Today", totals.today],
							["Downloads", totals.downloads]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.3em] text-white/50",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 display text-4xl text-white",
								children: v
							})]
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 lg:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-6 lg:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 text-xs uppercase tracking-[0.3em] text-white/50",
									children: "Traffic · last 24h"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-40 items-end gap-1",
									children: hourly.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-full rounded-t",
											style: {
												height: `${h.visits / maxHourly * 100}%`,
												background: "linear-gradient(180deg, var(--arcane), oklch(0.3 0.15 245))",
												minHeight: 2
											},
											title: `${h.hour}:00 — ${h.visits}`
										})
									}, h.hour))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex justify-between text-[10px] text-white/40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "00:00" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "12:00" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "23:00" })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownCard, {
							title: "Countries",
							rows: byCountry
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownCard, {
							title: "Browsers",
							rows: byBrowser
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownCard, {
							title: "Operating Systems",
							rows: byOs
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 text-xs uppercase tracking-[0.3em] text-white/50",
								children: "Recent Downloads"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-sm",
								children: [recentDownloads.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-white/40",
									children: "No downloads yet."
								}), recentDownloads.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-white/5 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-white",
											children: d.file_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-white/50",
											children: [
												d.country || "?",
												" · ",
												d.browser,
												" · ",
												d.os,
												" · ",
												d.ip || "—"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "shrink-0 text-xs text-white/50",
										children: new Date(d.created_at).toLocaleString()
									})]
								}, d.id))]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl glass p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 text-xs uppercase tracking-[0.3em] text-white/50",
								children: "Recent Visits"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 text-sm",
								children: recentVisits.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-white/5 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-white",
											children: v.path || "/"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-white/50",
											children: [
												v.country || "?",
												" · ",
												v.browser,
												" · ",
												v.os,
												" · ",
												v.ip || "—"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "shrink-0 text-xs text-white/50",
										children: new Date(v.created_at).toLocaleString()
									})]
								}, v.id))
							})]
						})]
					}),
					messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl glass p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 text-xs uppercase tracking-[0.3em] text-white/50",
							children: "Recent Messages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 text-sm",
							children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-white/5 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-white",
										children: [
											m.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-white/50",
												children: ["· ", m.email]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-white/50",
										children: new Date(m.created_at).toLocaleString()
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-white/70",
									children: m.message
								})]
							}, m.id))
						})]
					})
				]
			})
		]
	});
}
function BreakdownCard({ title, rows }) {
	const max = Math.max(1, ...rows.map((r) => r.value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl glass p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 text-xs uppercase tracking-[0.3em] text-white/50",
				children: title
			}),
			rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-white/40",
				children: "No data."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/80",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/50",
						children: r.value
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full",
						style: {
							width: `${r.value / max * 100}%`,
							background: "linear-gradient(90deg, var(--arcane), var(--gold))"
						}
					})
				})] }, r.name))
			})
		]
	});
}
//#endregion
export { Admin as component };
