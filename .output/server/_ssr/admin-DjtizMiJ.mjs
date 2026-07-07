import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BvgLm4bS.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as MouseGlow } from "./fx-DmVqfUhc.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DjtizMiJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useAdminNotifications(initial = []) {
	const [notifications, setNotifications] = (0, import_react.useState)(initial);
	const mountedRef = (0, import_react.useRef)(true);
	const channelRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		async function start() {
			setNotifications(initial);
			try {
				const chan = supabase.channel("public:notifications");
				chan.on("postgres_changes", {
					event: "INSERT",
					schema: "public",
					table: "notifications"
				}, (payload) => {
					if (!mountedRef.current) return;
					setNotifications((prev) => [payload.new, ...prev]);
					try {
						if (typeof Notification !== "undefined" && Notification.permission === "granted") {
							const title = payload.new.title || "New Notification";
							const body = payload.new.body || "";
							const n = new Notification(title, { body });
							n.onclick = () => {
								try {
									window.focus();
								} catch (e) {}
							};
						}
					} catch (e) {}
				});
				channelRef.current = await chan.subscribe();
			} catch (e) {
				channelRef.current = null;
			}
			const iv = setInterval(async () => {
				if (channelRef.current) return;
				try {
					const res = await fetch("/api/admin/dashboard", { credentials: "include" });
					if (!res.ok) return;
					const data = await res.json();
					if (!mountedRef.current) return;
					setNotifications(data.notifications || []);
				} catch (e) {}
			}, 3e3);
			return () => {
				mountedRef.current = false;
				clearInterval(iv);
				try {
					if (channelRef.current && typeof channelRef.current.unsubscribe === "function") channelRef.current.unsubscribe();
				} catch (e) {}
			};
		}
		start();
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const markRead = async (id) => {
		try {
			if ((await fetch("/api/admin/mark-notification-read", {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ id })
			})).ok) setNotifications((prev) => prev.map((n) => n.id === id ? {
				...n,
				read: true
			} : n));
		} catch (e) {}
	};
	const remove = async (id) => {
		try {
			if ((await fetch("/api/admin/delete-notification", {
				method: "POST",
				credentials: "include",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ id })
			})).ok) setNotifications((prev) => prev.filter((n) => n.id !== id));
		} catch (e) {}
	};
	const clearAll = async () => {
		try {
			if ((await fetch("/api/admin/clear-notifications", {
				method: "POST",
				credentials: "include"
			})).ok) setNotifications([]);
		} catch (e) {}
	};
	return {
		notifications,
		setNotifications,
		markRead,
		remove,
		clearAll
	};
}
/**
* Desktop notification hook with Realtime subscription + polling fallback.
* Detects new visitor sessions and completed downloads.
* Shows browser desktop notifications automatically.
* Prevents duplicates by tracking shown notification IDs.
*/
function useDesktopNotifications() {
	const [notificationState, setNotificationState] = (0, import_react.useState)({
		permission: "default",
		notificationCount: 0,
		lastError: null
	});
	const shownNotificationIdsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const lastDataSnapshot = (0, import_react.useRef)({
		sessions: [],
		downloads: []
	});
	const realtimeChannelRef = (0, import_react.useRef)(null);
	const pollingIntervalRef = (0, import_react.useRef)(null);
	const mountedRef = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		if (typeof Notification === "undefined") {
			console.warn("[Desktop Notifications] Browser does not support Notifications API");
			setNotificationState((prev) => ({
				...prev,
				permission: "denied",
				lastError: "Browser does not support notifications"
			}));
			return;
		}
		const currentPermission = Notification.permission;
		setNotificationState((prev) => ({
			...prev,
			permission: currentPermission
		}));
		console.log("[Desktop Notifications] Notification permission:", currentPermission);
		if (currentPermission === "default") {
			console.log("[Desktop Notifications] Requesting notification permission...");
			setNotificationState((prev) => ({
				...prev,
				permission: "loading"
			}));
			Notification.requestPermission().then((permission) => {
				if (!mountedRef.current) return;
				console.log("[Desktop Notifications] Notification permission:", permission);
				setNotificationState((prev) => ({
					...prev,
					permission,
					lastError: permission === "denied" ? "Notifications denied by user" : null
				}));
			}).catch((err) => {
				if (!mountedRef.current) return;
				console.error("[Desktop Notifications] Permission request failed:", err);
				setNotificationState((prev) => ({
					...prev,
					permission: "denied",
					lastError: `Permission error: ${String(err)}`
				}));
			});
		} else if (currentPermission === "denied") setNotificationState((prev) => ({
			...prev,
			lastError: "Notifications denied by user or browser policy"
		}));
		return () => {
			mountedRef.current = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mountedRef.current || notificationState.permission !== "granted") return;
		let shouldPoll = true;
		async function setupRealtimeSubscriptions() {
			try {
				const sessionsChan = supabase.channel("desktop-notif:sessions");
				sessionsChan.on("postgres_changes", {
					event: "INSERT",
					schema: "public",
					table: "sessions"
				}, (payload) => {
					if (!mountedRef.current) return;
					console.log("[Desktop Notifications] Realtime connected");
					shouldPoll = false;
					const newSession = payload.new;
					const notifId = `session-${newSession.session_id}`;
					if (!shownNotificationIdsRef.current.has(notifId)) {
						console.log("[Desktop Notifications] New visitor detected:", newSession.session_id);
						shownNotificationIdsRef.current.add(notifId);
						const title = "New Visitor";
						const body = `A new visitor has entered the website.`;
						if (Notification && Notification.permission === "granted") try {
							const notif = new Notification(title, {
								body,
								icon: "/favicon.ico",
								tag: notifId
							});
							console.log("[Desktop Notifications] Browser notification sent:", {
								title,
								body
							});
							notif.onclick = () => {
								try {
									window.focus();
								} catch (e) {}
							};
							setNotificationState((prev) => ({
								...prev,
								notificationCount: prev.notificationCount + 1
							}));
						} catch (err) {
							console.error("[Desktop Notifications] Browser notification failed:", err);
							setNotificationState((prev) => ({
								...prev,
								lastError: `Notification failed: ${String(err)}`
							}));
						}
					}
				});
				await sessionsChan.subscribe();
				console.log("[Desktop Notifications] Subscribed to sessions Realtime channel");
				const downloadsChan = supabase.channel("desktop-notif:downloads");
				downloadsChan.on("postgres_changes", {
					event: "INSERT",
					schema: "public",
					table: "downloads"
				}, (payload) => {
					if (!mountedRef.current) return;
					const newDownload = payload.new;
					const notifId = `download-${newDownload.id}`;
					if (!shownNotificationIdsRef.current.has(notifId) && newDownload.completed) {
						console.log("[Desktop Notifications] New download detected:", newDownload.file_name);
						shownNotificationIdsRef.current.add(notifId);
						const title = "New Download";
						const body = `${newDownload.file_name || "File"} was downloaded.`;
						if (Notification && Notification.permission === "granted") try {
							const notif = new Notification(title, {
								body,
								icon: "/favicon.ico",
								tag: notifId
							});
							console.log("[Desktop Notifications] Browser notification sent:", {
								title,
								body
							});
							notif.onclick = () => {
								try {
									window.focus();
								} catch (e) {}
							};
							setNotificationState((prev) => ({
								...prev,
								notificationCount: prev.notificationCount + 1
							}));
						} catch (err) {
							console.error("[Desktop Notifications] Browser notification failed:", err);
							setNotificationState((prev) => ({
								...prev,
								lastError: `Notification failed: ${String(err)}`
							}));
						}
					}
				});
				await downloadsChan.subscribe();
				console.log("[Desktop Notifications] Subscribed to downloads Realtime channel");
				realtimeChannelRef.current = {
					sessionsChan,
					downloadsChan
				};
			} catch (err) {
				console.warn("[Desktop Notifications] Realtime subscription failed, falling back to polling:", err);
				shouldPoll = true;
			}
		}
		async function pollDashboard() {
			if (!shouldPoll || !mountedRef.current) return;
			try {
				const res = await fetch("/api/admin/dashboard", { credentials: "include" });
				if (!res.ok || res.status === 401) return;
				const data = await res.json();
				if (!mountedRef.current) return;
				const currentSessions = data.sessions || [];
				const currentDownloads = data.downloads || [];
				const lastSessionIds = new Set(lastDataSnapshot.current.sessions.map((s) => s.session_id));
				currentSessions.forEach((session) => {
					const notifId = `session-${session.session_id}`;
					if (!lastSessionIds.has(session.session_id) && !shownNotificationIdsRef.current.has(notifId)) {
						console.log("[Desktop Notifications] New visitor detected (polling):", session.session_id);
						shownNotificationIdsRef.current.add(notifId);
						const title = "New Visitor";
						const body = `A new visitor has entered the website.`;
						if (Notification && Notification.permission === "granted") try {
							const notif = new Notification(title, {
								body,
								icon: "/favicon.ico",
								tag: notifId
							});
							console.log("[Desktop Notifications] Browser notification sent (polling):", {
								title,
								body
							});
							notif.onclick = () => {
								try {
									window.focus();
								} catch (e) {}
							};
							setNotificationState((prev) => ({
								...prev,
								notificationCount: prev.notificationCount + 1
							}));
						} catch (err) {
							console.error("[Desktop Notifications] Browser notification failed:", err);
						}
					}
				});
				const lastDownloadIds = new Set(lastDataSnapshot.current.downloads.map((d) => d.id));
				currentDownloads.forEach((download) => {
					const notifId = `download-${download.id}`;
					if (!lastDownloadIds.has(download.id) && !shownNotificationIdsRef.current.has(notifId) && download.completed) {
						console.log("[Desktop Notifications] New download detected (polling):", download.file_name);
						shownNotificationIdsRef.current.add(notifId);
						const title = "New Download";
						const body = `${download.file_name || "File"} was downloaded.`;
						if (Notification && Notification.permission === "granted") try {
							const notif = new Notification(title, {
								body,
								icon: "/favicon.ico",
								tag: notifId
							});
							console.log("[Desktop Notifications] Browser notification sent (polling):", {
								title,
								body
							});
							notif.onclick = () => {
								try {
									window.focus();
								} catch (e) {}
							};
							setNotificationState((prev) => ({
								...prev,
								notificationCount: prev.notificationCount + 1
							}));
						} catch (err) {
							console.error("[Desktop Notifications] Browser notification failed:", err);
						}
					}
				});
				lastDataSnapshot.current = {
					sessions: currentSessions,
					downloads: currentDownloads
				};
			} catch (err) {
				console.error("[Desktop Notifications] Polling error:", err);
			}
		}
		setupRealtimeSubscriptions();
		pollingIntervalRef.current = setInterval(() => {
			if (shouldPoll) pollDashboard();
		}, 2500);
		return () => {
			mountedRef.current = false;
			if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
			try {
				if (realtimeChannelRef.current?.sessionsChan) realtimeChannelRef.current.sessionsChan.unsubscribe();
				if (realtimeChannelRef.current?.downloadsChan) realtimeChannelRef.current.downloadsChan.unsubscribe();
			} catch (e) {}
		};
	}, [notificationState.permission]);
	return notificationState;
}
function Admin() {
	const navigate = useNavigate();
	const [authorized, setAuthorized] = (0, import_react.useState)(void 0);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [downloads, setDownloads] = (0, import_react.useState)([]);
	const { notifications, setNotifications, markRead, remove, clearAll } = useAdminNotifications([]);
	const desktopNotifState = useDesktopNotifications();
	const lastSnapshotRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		(async () => {
			try {
				const res = await fetch("/api/admin/dashboard", { credentials: "include" });
				if (res.status === 401) {
					navigate({
						to: "/auth",
						replace: true
					});
					return;
				}
				if (res.ok && mounted) setAuthorized(true);
			} catch {
				navigate({
					to: "/auth",
					replace: true
				});
			}
		})();
		return () => {
			mounted = false;
		};
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (!authorized) return;
		if (Notification && Notification.permission === "default") Notification.requestPermission().catch(() => {});
		let mounted = true;
		let polling = true;
		let pollIv = null;
		let sbSubscription = null;
		async function fetchDashboard() {
			try {
				const res = await fetch("/api/admin/dashboard", {
					credentials: "include",
					headers: { "content-type": "application/json" }
				});
				if (res.status === 401) {
					navigate({
						to: "/auth",
						replace: true
					});
					return false;
				}
				if (!res.ok) {
					console.error("Dashboard API error:", res.status, res.statusText);
					if (!mounted) return true;
					setSessions([]);
					setDownloads([]);
					setNotifications([]);
					return true;
				}
				const data = await res.json();
				if (!mounted) return true;
				setSessions(data.sessions || []);
				setDownloads(data.downloads || []);
				setNotifications(data.notifications || []);
				const snap = JSON.stringify((data.sessions || []).map((item) => ({
					id: item.session_id,
					last_active: item.last_active
				})));
				if (lastSnapshotRef.current && lastSnapshotRef.current !== snap) {
					const prev = JSON.parse(lastSnapshotRef.current);
					const prevMap = new Map(prev.map((p) => [p.id, p.last_active]));
					(data.sessions || []).forEach((item) => {
						const prevVal = prevMap.get(item.session_id);
						if (prevVal && prevVal !== item.last_active && Notification && Notification.permission === "granted") new Notification("Visitor activity", { body: `${item.ip ?? "unknown"} — ${item.device ?? item.os} — ${item.status}` });
					});
				}
				lastSnapshotRef.current = snap;
				return true;
			} catch (e) {
				console.error("Dashboard poll error:", e);
				if (!mounted) return false;
				setSessions([]);
				setDownloads([]);
				setNotifications([]);
				return false;
			}
		}
		(async () => {
			try {
				const chan = supabase.channel("public:downloads");
				chan.on("postgres_changes", {
					event: "INSERT",
					schema: "public",
					table: "downloads"
				}, (payload) => {
					if (!mounted) return;
					setDownloads((prev) => [payload.new, ...prev]);
				});
				sbSubscription = await chan.subscribe();
				polling = false;
			} catch (e) {
				console.warn("Realtime subscription failed, falling back to polling:", e);
				polling = true;
			}
			await fetchDashboard();
			if (polling) pollIv = setInterval(fetchDashboard, 3e3);
		})();
		return () => {
			mounted = false;
			if (pollIv) clearInterval(pollIv);
			try {
				if (sbSubscription && typeof sbSubscription.unsubscribe === "function") sbSubscription.unsubscribe();
			} catch (e) {}
		};
	}, [authorized, navigate]);
	const signOut = async () => {
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 place-items-center rounded-md glass glow-blue",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "display text-gradient-gold text-sm",
									children: "L"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "display text-xs tracking-[0.35em] text-white/80",
								children: "STUDIO CONSOLE"
							}),
							desktopNotifState.permission === "granted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 ml-4 text-xs text-emerald-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }), "Notifications active"]
							}),
							desktopNotifState.permission === "denied" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 ml-4 text-xs text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-red-400" }), "Notifications denied"]
							}),
							desktopNotifState.permission === "default" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 ml-4 text-xs text-yellow-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-yellow-400" }), "Notifications: not granted"]
							})
						]
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
				children: [
					desktopNotifState.permission === "denied" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "rounded-3xl glass p-6 border border-red-400/30 bg-red-950/20 text-red-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg",
								children: "⚠️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: "Notifications Disabled"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-red-200/80",
									children: "Browser notifications have been denied. Check your browser settings to enable notifications for this site. You will receive real-time alerts for new visitors and downloads once enabled."
								}),
								desktopNotifState.lastError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-red-300 font-mono bg-black/30 p-2 rounded",
									children: desktopNotifState.lastError
								})
							] })]
						})
					}),
					desktopNotifState.permission === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "rounded-3xl glass p-6 border border-blue-400/30 bg-blue-950/20 text-blue-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-spin text-lg",
								children: "⏳"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "Requesting notification permission..."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl glass p-8 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display text-3xl",
							children: "Studio Admin Dashboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-white/70",
							children: "You are signed in using the signed admin cookie. This dashboard is protected by cookie-based admin auth only."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
							desktopNotifState.permission === "granted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-emerald-300",
								children: ["✓ Desktop notifications enabled. You will receive real-time alerts for new visitors and downloads.", desktopNotifState.notificationCount > 0 && ` (${desktopNotifState.notificationCount} notifications sent)`]
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
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-2 py-2",
													children: "Actions"
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
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-2 py-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-2",
															children: [d.user_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: async () => {
																	if (!window.confirm("Delete user and associated data?")) return;
																	try {
																		const res = await fetch("/api/admin/delete-user", {
																			method: "POST",
																			credentials: "include",
																			headers: { "content-type": "application/json" },
																			body: JSON.stringify({ user_id: d.user_id })
																		});
																		if (!res.ok) {
																			const b = await res.json().catch(() => null);
																			window.alert("Delete failed: " + (b?.error || res.statusText));
																		} else {
																			window.alert("User deleted");
																			setSessions((prev) => prev.filter((s) => s.user_id !== d.user_id));
																			setDownloads((prev) => prev.filter((x) => x.user_id !== d.user_id));
																		}
																	} catch (e) {
																		window.alert("Delete failed: " + String(e));
																	}
																},
																className: "text-xs text-red-400 hover:text-red-300",
																children: "Delete user"
															}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: async () => {
																	if (!window.confirm("Delete this session?")) return;
																	try {
																		const res = await fetch("/api/admin/delete-session", {
																			method: "POST",
																			credentials: "include",
																			headers: { "content-type": "application/json" },
																			body: JSON.stringify({ id: d.session_id })
																		});
																		if (!res.ok) {
																			const b = await res.json().catch(() => null);
																			window.alert("Delete session failed: " + (b?.error || res.statusText));
																		} else setSessions((prev) => prev.filter((s) => s.session_id !== d.session_id));
																	} catch (e) {
																		window.alert("Delete session failed: " + String(e));
																	}
																},
																className: "text-xs text-white/60 hover:text-white",
																children: "Delete session"
															})]
														})
													})
												]
											}, d.session_id)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "overflow-x-auto rounded-3xl bg-white/5 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-lg font-medium",
												children: "Download activity"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex justify-end mt-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: async () => {
														if (!window.confirm("Clear all download history? This cannot be undone.")) return;
														try {
															const res = await fetch("/api/admin/clear-downloads", {
																method: "POST",
																credentials: "include"
															});
															if (!res.ok) {
																const b = await res.json().catch(() => null);
																window.alert("Clear failed: " + (b?.error || res.statusText));
															} else {
																setDownloads([]);
																window.alert("Downloads cleared");
															}
														} catch (e) {
															window.alert("Clear failed: " + String(e));
														}
													},
													className: "text-xs text-white/60 hover:text-white",
													children: "Clear downloads"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
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
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "px-2 py-2",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: async () => {
																		if (!window.confirm("Delete this download record?")) return;
																		try {
																			const res = await fetch("/api/admin/delete-download", {
																				method: "POST",
																				credentials: "include",
																				headers: { "content-type": "application/json" },
																				body: JSON.stringify({ id: d.id })
																			});
																			if (!res.ok) {
																				const b = await res.json().catch(() => null);
																				window.alert("Delete failed: " + (b?.error || res.statusText));
																			} else setDownloads((prev) => prev.filter((x) => x.id !== d.id));
																		} catch (e) {
																			window.alert("Delete failed: " + String(e));
																		}
																	},
																	className: "text-xs text-white/60 hover:text-white",
																	children: "Delete"
																}), d.user_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: async () => {
																		if (!window.confirm("Delete user and associated records? This cannot be undone.")) return;
																		try {
																			const res = await fetch("/api/admin/delete-user", {
																				method: "POST",
																				credentials: "include",
																				headers: { "content-type": "application/json" },
																				body: JSON.stringify({ user_id: d.user_id })
																			});
																			if (!res.ok) {
																				const b = await res.json().catch(() => null);
																				window.alert("Delete failed: " + (b?.error || res.statusText));
																			} else {
																				window.alert("User deleted");
																				setDownloads((prev) => prev.filter((x) => x.user_id !== d.user_id));
																				setSessions((prev) => prev.filter((s) => s.user_id !== d.user_id));
																			}
																		} catch (e) {
																			window.alert("Delete failed: " + String(e));
																		}
																	},
																	className: "text-xs text-red-400 hover:text-red-300",
																	children: "Delete user"
																}) : null]
															})
														})
													]
												}, d.id)) })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "overflow-hidden rounded-3xl bg-white/5 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-lg font-medium",
												children: "Notifications"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: async () => {
														await clearAll();
													},
													className: "text-xs text-white/60 hover:text-white",
													children: "Clear all"
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 space-y-3 text-sm text-white/70",
											children: [notifications.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-white/50",
												children: "No notifications"
											}), notifications.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `rounded-2xl p-3 flex justify-between items-start ${note.read ? "bg-background/70" : "bg-accent/900"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-8 w-8 rounded-full bg-white/10 grid place-items-center",
															children: "🔔"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-medium text-white",
															children: note.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-xs text-white/60",
															children: new Date(note.created_at).toLocaleString()
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-2",
														children: note.body
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-2 text-xs text-white/50",
														children: [
															"Session: ",
															note.payload?.session_id ?? "—",
															" • File: ",
															note.payload?.file_name ?? note.payload?.download_id ?? "—"
														]
													})
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col gap-2",
													children: [!note.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: async () => {
															await markRead(note.id);
														},
														className: "text-xs text-white/60 hover:text-white",
														children: "Mark read"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: async () => {
															if (!window.confirm("Delete notification?")) return;
															await remove(note.id);
														},
														className: "text-xs text-red-400 hover:text-red-300",
														children: "Delete"
													})]
												})]
											}, note.id))]
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
										children: "Sign out will clear the admin cookie and return you to the login page."
									})
								})]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { Admin as component };
