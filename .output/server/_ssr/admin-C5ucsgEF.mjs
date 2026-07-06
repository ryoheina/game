import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as MouseGlow } from "./fx-DmVqfUhc.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C5ucsgEF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_PASSWORD = "20070925";
function Admin() {
	const navigate = useNavigate();
	const [authorized, setAuthorized] = (0, import_react.useState)(void 0);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [downloads, setDownloads] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const lastSnapshotRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const valid = window.localStorage.getItem("studio-admin-token") === ADMIN_PASSWORD;
		setAuthorized(valid);
		if (!valid) navigate({
			to: "/auth",
			replace: true
		});
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (!authorized) return;
		if (Notification && Notification.permission === "default") Notification.requestPermission().catch(() => {});
		let mounted = true;
		const token = window.localStorage.getItem("studio-admin-token") || "";
		async function poll() {
			try {
				const res = await fetch("/api/admin/dashboard", {
					credentials: "include",
					headers: {
						"content-type": "application/json",
						"x-admin-password": token
					}
				});
				if (res.status === 401) {
					window.localStorage.removeItem("studio-admin-token");
					navigate({
						to: "/auth",
						replace: true
					});
					return;
				}
				const data = await res.json();
				const list = data.sessions || [];
				if (!mounted) return;
				setSessions(list);
				setDownloads(data.downloads || []);
				setNotifications(data.notifications || []);
				const snap = JSON.stringify(list.map((item) => ({
					id: item.session_id,
					last_active: item.last_active
				})));
				if (lastSnapshotRef.current && lastSnapshotRef.current !== snap) {
					const prev = JSON.parse(lastSnapshotRef.current);
					const prevMap = new Map(prev.map((p) => [p.id, p.last_active]));
					list.forEach((item) => {
						const prevVal = prevMap.get(item.session_id);
						if (prevVal && prevVal !== item.last_active && Notification && Notification.permission === "granted") new Notification("Visitor activity", { body: `${item.ip ?? "unknown"} — ${item.device ?? item.os} — ${item.status}` });
					});
				}
				lastSnapshotRef.current = snap;
			} catch (e) {
				console.error(e);
			}
		}
		poll();
		const iv = setInterval(poll, 5e3);
		return () => {
			mounted = false;
			clearInterval(iv);
		};
	}, [authorized, navigate]);
	const signOut = async () => {
		window.localStorage.removeItem("studio-admin-token");
		await fetch("/api/admin/logout", {
			method: "POST",
			credentials: "include"
		}).catch(() => {});
		navigate({
			to: "/auth",
			replace: true
		});
	};
	if (authorized === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center text-white/60",
		children: "Loading admin…"
	});
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
				className: "mx-auto max-w-5xl space-y-6 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-3xl glass p-8 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display text-3xl",
						children: "Studio Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-white/70",
						children: "You are signed in using the local admin password. This dashboard is now accessible without Supabase session auth."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-3xl glass p-8 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Admin tools"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-white/70",
							children: [
								"This admin page is available at ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-white/5 px-2 py-1",
									children: "/admin"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-x-auto rounded-3xl bg-white/5 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-medium",
										children: "Active visitors"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full table-auto text-left text-sm text-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Session"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "IP"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Country"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Device"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Browser"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "OS"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Last active"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "First visit"
											})
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sessions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-white/5 text-white/70",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.session_id.slice(0, 8)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.ip ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.country ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.device ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.browser ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.os ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.status
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: new Date(d.last_active).toLocaleTimeString()
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: new Date(d.first_visit).toLocaleTimeString()
												})
											]
										}, d.session_id)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-x-auto rounded-3xl bg-white/5 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-medium",
										children: "Download activity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full table-auto text-left text-sm text-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Time"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "IP"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Session"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "File"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-2 py-2",
												children: "Completed"
											})
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: downloads.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-white/5 text-white/70",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: new Date(d.started_at ?? d.created_at).toLocaleString()
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.ip ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.session_id ? d.session_id.slice(0, 8) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.file_name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.status
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-2 py-2",
													children: d.completed ? "Yes" : "No"
												})
											]
										}, d.id)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-3xl bg-white/5 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-medium",
										children: "Notifications"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 space-y-3 text-sm text-white/70",
										children: notifications.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl bg-background/80 p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium text-white",
													children: note.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: note.body }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-1 text-xs text-white/50",
													children: new Date(note.created_at).toLocaleString()
												})
											]
										}, note.id))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-white/5 p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white/70",
									children: "Use the admin password to gate access to studio management content."
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-white/5 p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white/70",
									children: "Sign out will clear the local admin token and return you to the login page."
								})
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Admin as component };
