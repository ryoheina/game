import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as resolveCountry, n as insertAdminNotification, t as getClientMeta } from "./notifications-Dg5sYI5P.mjs";
import { n as supabaseAdmin } from "./client.server-CPH4V7T6.mjs";
import { t as ensureVisitorSession } from "./visitor-session-9sEIwEFU.mjs";
import { r as trackVisit, t as recordVisit } from "./analytics.functions-DowzlkrV.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import processModule from "node:process";
import { Buffer } from "node:buffer";
import crypto$1 from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DrHzhkhx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B1HouSQd.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function useVisitorTracking(pathname) {
	const heartbeatPathRef = (0, import_react.useRef)(pathname);
	const skippedInitialRouteRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		heartbeatPathRef.current = pathname;
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!skippedInitialRouteRef.current) {
			skippedInitialRouteRef.current = true;
			return;
		}
		const sid = ensureVisitorSession();
		if (!sid) return;
		trackVisit({ data: {
			sessionId: sid,
			path: pathname
		} }).catch(() => {});
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const sid = ensureVisitorSession();
		if (!sid) return;
		const heartbeat = window.setInterval(() => {
			trackVisit({ data: {
				sessionId: sid,
				path: heartbeatPathRef.current,
				heartbeat: true
			} }).catch(() => {});
		}, 6e4);
		return () => window.clearInterval(heartbeat);
	}, []);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$25 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Legends of Eternity — A next-gen 3D multiplayer fantasy RPG" },
			{
				name: "description",
				content: "Enter the world of Legends of Eternity. Forge alliances, wield forbidden magic, and stand against eternal darkness in a next-generation 3D multiplayer fantasy RPG."
			},
			{
				name: "theme-color",
				content: "#050710"
			},
			{
				property: "og:title",
				content: "Legends of Eternity — A next-gen 3D multiplayer fantasy RPG"
			},
			{
				property: "og:description",
				content: "Enter the world of Legends of Eternity. Forge alliances, wield forbidden magic, and stand against eternal darkness in a next-generation 3D multiplayer fantasy RPG."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Legends of Eternity — A next-gen 3D multiplayer fantasy RPG"
			},
			{
				name: "twitter:description",
				content: "Enter the world of Legends of Eternity. Forge alliances, wield forbidden magic, and stand against eternal darkness in a next-generation 3D multiplayer fantasy RPG."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Y1u1o4AgdxbFhe5JKWYiW3novtk1/social-images/social-1783268023900-ELYSIA.webp"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Y1u1o4AgdxbFhe5JKWYiW3novtk1/social-images/social-1783268023900-ELYSIA.webp"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
;(function(){
  try {
    var key = "loe_sid";
    var sid = localStorage.getItem(key);
    if (!sid) {
      sid = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2);
      localStorage.setItem(key, sid);
    }
    if (location.pathname === "/installed") return;
    fetch("/api/public/visit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId: sid, path: location.pathname + location.search }),
      credentials: "same-origin",
      keepalive: true
    }).catch(function(){});
  } catch (e) {}
})();` } }),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$25.useRouteContext();
	useVisitorTracking(useLocation().pathname);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		import("../_libs/lenis.mjs").then((n) => n.t).then((module) => {
			try {
				const Lenis = module.default;
				const lenis = new Lenis({
					duration: 1.2,
					easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
					direction: "vertical",
					gestureDirection: "vertical",
					smooth: true,
					smoothTouch: false
				});
				function raf(time) {
					lenis.raf(time);
					requestAnimationFrame(raf);
				}
				requestAnimationFrame(raf);
				return () => {
					lenis.destroy?.();
				};
			} catch (e) {
				console.warn("Lenis initialization failed", e);
			}
		}).catch(() => {
			console.warn("Lenis package not available");
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#200a3b,_#05070d_40%,_#05070d_100%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
	});
}
var $$splitComponentImporter$5 = () => import("./me-fuu5GXiX.mjs");
var Route$24 = createFileRoute("/me")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./installed-D1cUGyIs.mjs");
var Route$23 = createFileRoute("/installed")({
	head: () => ({ meta: [{ title: "Legends of Eternity" }, {
		name: "robots",
		content: "noindex,nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./auth-DzKmRwUX.mjs");
var Route$22 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Studio Admin Access — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.mjs");
var Route$21 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		if (typeof window === "undefined") throw redirect({ to: "/auth" });
		try {
			if (!(await fetch("/api/admin/dashboard", { credentials: "include" })).ok) throw redirect({ to: "/auth" });
			return {};
		} catch {
			throw redirect({ to: "/auth" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-FGC5uLds.mjs");
var Route$20 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Legends of Eternity — A next-gen 3D multiplayer fantasy RPG" },
		{
			name: "description",
			content: "Enter the world of Legends of Eternity. Forge alliances, wield forbidden magic, and stand against eternal darkness in a next-generation 3D multiplayer fantasy RPG."
		},
		{
			property: "og:title",
			content: "Legends of Eternity"
		},
		{
			property: "og:description",
			content: "A next-generation 3D multiplayer fantasy RPG."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin-DHKD0WnM.mjs");
var Route$19 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Studio Dashboard — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$18 = createFileRoute("/api/public/visit")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const body = await request.json().catch(() => null);
		const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
		const path = typeof body?.path === "string" ? body.path.slice(0, 500) : "/";
		const heartbeat = body?.heartbeat === true;
		if (sessionId.length < 8 || sessionId.length > 64) return new Response(JSON.stringify({
			success: false,
			error: "Invalid session"
		}), {
			status: 400,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		await recordVisit(request, {
			sessionId,
			path,
			heartbeat
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	} catch (error) {
		console.error("[Visit] tracking failed", error);
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
} } } });
var INSTALL_TOKEN_COOKIE = "loe_install_token";
function createInstallToken() {
	return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}
function parseCookies(cookieHeader) {
	const cookies = /* @__PURE__ */ new Map();
	if (!cookieHeader) return cookies;
	cookieHeader.split(";").forEach((part) => {
		const [rawKey, ...rawValue] = part.trim().split("=");
		if (!rawKey) return;
		cookies.set(rawKey, decodeURIComponent(rawValue.join("=")));
	});
	return cookies;
}
function getInstallTokenFromRequest(request, bodyToken) {
	if (typeof bodyToken === "string" && bodyToken.length >= 32 && bodyToken.length <= 160) return bodyToken;
	const queryToken = new URL(request.url).searchParams.get("token");
	if (queryToken && queryToken.length >= 32 && queryToken.length <= 160) return queryToken;
	return parseCookies(request.headers.get("cookie")).get(INSTALL_TOKEN_COOKIE) || null;
}
function createInstallTokenCookie(token) {
	return `${INSTALL_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${3600 * 24 * 30}; SameSite=Lax; Secure; HttpOnly`;
}
function clearInstallTokenCookie() {
	return `${INSTALL_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; Secure; HttpOnly`;
}
var Route$17 = createFileRoute("/api/public/mark-extracted")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const url = new URL(request.url);
		const requestedFileName = url.searchParams.get("file");
		const installToken = getInstallTokenFromRequest(request, url.searchParams.get("token"));
		if (!installToken) return new Response("", {
			status: 403,
			headers: { "Cache-Control": "no-store" }
		});
		const meta = getClientMeta(request);
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const { data: download, error: downloadError } = await supabaseAdmin.from("downloads").select("id,session_id,file_name,install_token").eq("install_token", installToken).maybeSingle();
		if (downloadError) throw downloadError;
		if (!download) return new Response("", {
			status: 403,
			headers: { "Cache-Control": "no-store" }
		});
		const fileName = download.file_name || requestedFileName || "LegendsofEternity.exe";
		const completedAt = (/* @__PURE__ */ new Date()).toISOString();
		const updateResult = await supabaseAdmin.from("downloads").update({
			extracted: true,
			completed: true,
			completed_at: completedAt,
			installed_at: completedAt
		}).eq("id", download.id);
		if (updateResult.error) throw updateResult.error;
		await supabaseAdmin.from("extractions").insert({
			download_id: download.id,
			session_id: download.session_id,
			ip: meta.ip,
			file_name: fileName,
			device: meta.device
		});
		await insertAdminNotification(supabaseAdmin, {
			type: "installed",
			type_detail: "installed",
			title: "Game Installed",
			session_id: download.session_id,
			ip_address: meta.ip,
			browser: meta.browser,
			device: meta.device,
			filename: fileName,
			body: `${download.session_id ? download.session_id.slice(0, 8) : "unknown"} - ${fileName}`,
			payload: {
				download_id: download.id,
				session_id: download.session_id,
				ip_address: meta.ip,
				file_name: fileName,
				installed: true
			},
			read: false,
			delivered: false
		});
		return new Response(null, {
			status: 204,
			headers: {
				"Cache-Control": "no-store",
				"Set-Cookie": clearInstallTokenCookie()
			}
		});
	} catch (e) {
		console.error("mark-extracted failed", e);
		return new Response("", {
			status: 500,
			headers: { "Cache-Control": "no-store" }
		});
	}
} } } });
var Route$16 = createFileRoute("/api/public/installed")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const body = await request.json().catch(() => null);
		const fileName = typeof body?.file === "string" ? body.file.slice(0, 200) : "LegendsofEternity.exe";
		const meta = getClientMeta(request);
		const installToken = getInstallTokenFromRequest(request, body?.token);
		if (!installToken) return new Response(JSON.stringify({
			success: false,
			error: "Install token required"
		}), {
			status: 403,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const { data: download, error: downloadError } = await supabaseAdmin.from("downloads").select("id,session_id,ip,file_name,install_token").eq("install_token", installToken).maybeSingle();
		if (downloadError) throw downloadError;
		if (!download) return new Response(JSON.stringify({
			success: false,
			error: "Invalid install token"
		}), {
			status: 403,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		const sessionId = download.session_id;
		const installedFileName = download.file_name || fileName;
		if (sessionId) await recordVisit(request, {
			sessionId,
			path: "/installed"
		});
		const updateByToken = await supabaseAdmin.from("downloads").update({
			extracted: true,
			completed: true,
			completed_at: (/* @__PURE__ */ new Date()).toISOString(),
			installed_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", download.id);
		if (updateByToken.error) throw updateByToken.error;
		await supabaseAdmin.from("extractions").insert({
			download_id: download.id,
			session_id: sessionId,
			ip: meta.ip,
			device: meta.device,
			file_name: installedFileName
		});
		await insertAdminNotification(supabaseAdmin, {
			type: "installed",
			type_detail: "installed",
			title: "Game Installed",
			body: `${sessionId ? sessionId.slice(0, 8) : "unknown"} - ${installedFileName}`,
			session_id: sessionId,
			ip_address: meta.ip,
			country: meta.country,
			browser: meta.browser,
			device: meta.device,
			filename: installedFileName,
			payload: {
				download_id: download.id,
				session_id: sessionId,
				ip_address: meta.ip,
				file_name: installedFileName,
				installed: true
			},
			read: false,
			delivered: false
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store",
				"Set-Cookie": clearInstallTokenCookie()
			}
		});
	} catch (error) {
		console.error("[Installed] tracking failed", error);
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
} } } });
var PUBLIC_ARCHIVE_NAME = "LegendsofEternity.exe";
var PUBLIC_ARCHIVE_PATH = `/${encodeURIComponent(PUBLIC_ARCHIVE_NAME)}`;
var PUBLIC_ARCHIVE_SIZE = 134050304;
var GITHUB_LFS_ARCHIVE_URL = "https://media.githubusercontent.com/media/ryoheina/game/main/public/LegendsofEternity.exe";
var Route$15 = createFileRoute("/api/public/download")({ server: { handlers: { GET: async ({ request }) => {
	const meta = getClientMeta(request);
	const country = meta.country ?? await resolveCountry(request.headers, meta.ip);
	const sid = new URL(request.url).searchParams.get("sid") || null;
	const downloadFileName = PUBLIC_ARCHIVE_NAME;
	const installToken = createInstallToken();
	const installTokenCookie = createInstallTokenCookie(installToken);
	let downloadId = null;
	try {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		if (sid) {
			const { data: existingSession } = await supabaseAdmin.from("sessions").select("session_id").eq("session_id", sid).maybeSingle();
			if (existingSession) await supabaseAdmin.from("sessions").update({
				last_active: now,
				ip: meta.ip,
				country,
				browser: meta.browser,
				device: meta.device,
				user_agent: meta.ua,
				notified_left: false
			}).eq("session_id", sid);
			else await supabaseAdmin.from("sessions").insert({
				session_id: sid,
				ip: meta.ip,
				country,
				browser: meta.browser,
				device: meta.device,
				user_agent: meta.ua,
				first_visit: now,
				last_active: now
			});
		}
		const { data: insertData, error: insertError } = await supabaseAdmin.from("downloads").insert({
			file_name: downloadFileName,
			session_id: sid,
			ip: meta.ip,
			country,
			browser: meta.browser,
			os: meta.os,
			device: meta.device,
			user_agent: meta.ua,
			extracted: false,
			install_token: installToken,
			started_at: now
		}).select("id").maybeSingle();
		if (insertError) throw insertError;
		downloadId = insertData?.id || null;
	} catch (e) {
		console.error("download log failed", e);
	}
	const archiveUrl = new URL(PUBLIC_ARCHIVE_PATH, request.url);
	try {
		const assetResponse = await fetch(archiveUrl, { headers: {
			Accept: "application/octet-stream, */*",
			"x-internal-download-fetch": "1"
		} });
		if (!assetResponse.ok || !assetResponse.body) return new Response(JSON.stringify({
			success: false,
			error: "Game file not found."
		}), {
			status: 404,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store",
				"Set-Cookie": installTokenCookie
			}
		});
		const markCompleted = async () => {
			if (!downloadId) return;
			try {
				await supabaseAdmin.from("downloads").update({
					completed: true,
					completed_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", downloadId);
				await insertAdminNotification(supabaseAdmin, {
					type: "download",
					type_detail: "download",
					title: "Download Complete",
					body: `${meta.ip ?? "unknown"} - ${country ?? "unknown"} - ${downloadFileName}`,
					session_id: sid,
					ip_address: meta.ip,
					country,
					browser: meta.browser,
					device: meta.device,
					filename: downloadFileName,
					payload: {
						download_id: downloadId,
						session_id: sid,
						file_name: downloadFileName
					},
					read: false,
					delivered: false
				});
			} catch (e) {
				console.error("post-download update failed", e);
			}
		};
		const contentLength = Number(assetResponse.headers.get("content-length") || "0");
		if (contentLength > 0 && contentLength < PUBLIC_ARCHIVE_SIZE) {
			markCompleted();
			return new Response(null, {
				status: 302,
				headers: {
					Location: GITHUB_LFS_ARCHIVE_URL,
					"Cache-Control": "no-store",
					"Set-Cookie": installTokenCookie
				}
			});
		}
		const { readable, writable } = new TransformStream();
		assetResponse.body.pipeTo(writable).then(() => markCompleted()).catch((e) => console.error("download stream failed", e));
		const headers = new Headers({
			"Content-Type": assetResponse.headers.get("content-type") || "application/vnd.microsoft.portable-executable",
			"Content-Disposition": `attachment; filename="${downloadFileName}"`,
			"Cache-Control": "no-store",
			"Set-Cookie": installTokenCookie
		});
		const contentLengthHeader = assetResponse.headers.get("content-length");
		if (contentLengthHeader) headers.set("Content-Length", contentLengthHeader);
		return new Response(readable, {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Download] public archive request failed", {
			archiveUrl: archiveUrl.toString(),
			error
		});
		return new Response(JSON.stringify({
			success: false,
			error: "Game file not found."
		}), {
			status: 404,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
} } } });
var COOKIE_NAME = "me_admin";
var DEFAULT_MAX_AGE = 10080 * 60;
function base64url(input) {
	return input.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function sign(data, secret) {
	return base64url(crypto$1.createHmac("sha256", secret).update(data).digest());
}
function createAuthToken(secret, maxAgeSeconds = DEFAULT_MAX_AGE) {
	const payload = JSON.stringify({
		u: "admin",
		exp: Date.now() + maxAgeSeconds * 1e3
	});
	const b = base64url(Buffer.from(payload));
	return `${b}.${sign(b, secret)}`;
}
function verifyAuthToken(token, secret) {
	if (!token) return false;
	const parts = token.split(".");
	if (parts.length !== 2) return false;
	const [b, sig] = parts;
	const expected = sign(b, secret);
	const a = Buffer.from(sig);
	const e = Buffer.from(expected);
	if (a.length !== e.length) return false;
	if (!crypto$1.timingSafeEqual(a, e)) return false;
	try {
		const payload = JSON.parse(Buffer.from(b, "base64").toString());
		if (typeof payload.exp !== "number") return false;
		return payload.exp > Date.now();
	} catch {
		return false;
	}
}
function buildSetCookie(token, opts) {
	const maxAge = opts?.maxAge ?? DEFAULT_MAX_AGE;
	const path = opts?.path ?? "/";
	const secure = opts?.secure ?? true;
	const parts = [
		`${COOKIE_NAME}=${token}`,
		`HttpOnly`,
		`Path=${path}`,
		`Max-Age=${maxAge}`,
		`SameSite=Strict`
	];
	if (secure) parts.push("Secure");
	return parts.join("; ");
}
function buildClearCookie() {
	return `${COOKIE_NAME}=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`;
}
function getTokenFromRequest(request) {
	const cookie = request.headers.get("cookie");
	if (!cookie) return null;
	const parts = cookie.split(";").map((s) => s.trim());
	for (const p of parts) if (p.startsWith("me_admin=")) return p.substring(9);
	return null;
}
var Route$14 = createFileRoute("/api/me/stats")({ server: { handlers: { GET: async ({ request }) => {
	if (!verifyAuthToken(getTokenFromRequest(request), processModule.env.ADMIN_PASSWORD || "")) return new Response(JSON.stringify({
		ok: false,
		error: "Unauthorized"
	}), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const missingEnv = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].filter((name) => !processModule.env[name]);
		if (missingEnv.length > 0) {
			const message = `Missing environment variables: ${missingEnv.join(", ")}`;
			console.error("me/stats env error", message);
			return new Response(JSON.stringify({
				ok: false,
				error: message
			}), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		(/* @__PURE__ */ new Date(Date.now() - 24 * 36e5)).toISOString();
		const since5m = (/* @__PURE__ */ new Date(Date.now() - 5 * 6e4)).toISOString();
		const sinceToday = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)).toISOString();
		const [visitsTotal, visitsToday, onlineNow, downloadsTotal, recentVisits, recentDownloads] = await Promise.all([
			supabaseAdmin.from("visits").select("*", {
				count: "exact",
				head: true
			}),
			supabaseAdmin.from("visits").select("*", {
				count: "exact",
				head: true
			}).gte("created_at", sinceToday),
			supabaseAdmin.from("visits").select("session_id", { count: "exact" }).gte("created_at", since5m),
			supabaseAdmin.from("downloads").select("*", {
				count: "exact",
				head: true
			}),
			supabaseAdmin.from("visits").select("*").order("created_at", { ascending: false }).limit(15),
			supabaseAdmin.from("downloads").select("*").order("created_at", { ascending: false }).limit(15)
		]);
		if (visitsTotal.error || visitsToday.error || onlineNow.error || downloadsTotal.error || recentVisits.error || recentDownloads.error) {
			const errors = [
				visitsTotal.error,
				visitsToday.error,
				onlineNow.error,
				downloadsTotal.error,
				recentVisits.error,
				recentDownloads.error
			].filter(Boolean).map((err) => err?.message ?? String(err));
			console.error("me/stats supabase errors", errors);
			return new Response(JSON.stringify({
				ok: false,
				error: errors.join("; ")
			}), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		const uniqueOnline = new Set((onlineNow.data || []).map((r) => r.session_id)).size;
		return new Response(JSON.stringify({
			totals: {
				visits: visitsTotal.count || 0,
				today: visitsToday.count || 0,
				online: uniqueOnline,
				downloads: downloadsTotal.count || 0
			},
			recentVisits: recentVisits.data || [],
			recentDownloads: recentDownloads.data || []
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (e) {
		const message = e instanceof Error ? e.message : String(e);
		const stack = e instanceof Error ? e.stack : void 0;
		console.error("me/stats error", message, stack);
		return new Response(JSON.stringify({
			ok: false,
			error: "Server error",
			details: message,
			stack
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$13 = createFileRoute("/api/me/logout")({ server: { handlers: { POST: async () => {
	const header = buildClearCookie();
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": header
		}
	});
} } } });
var Route$12 = createFileRoute("/api/me/login")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json().catch(() => ({}));
	const password = typeof body.password === "string" ? body.password : null;
	const adminPassword = processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD || null;
	if (!adminPassword) return new Response(JSON.stringify({
		ok: false,
		error: "ADMIN_PASSWORD not configured"
	}), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	if (!password || password !== adminPassword) return new Response(JSON.stringify({
		ok: false,
		error: "Invalid credentials"
	}), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const setCookie = buildSetCookie(createAuthToken(adminPassword));
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": setCookie
		}
	});
} } } });
var ADMIN_PASSWORD$1 = processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD;
var ADMIN_COOKIE_NAME = "admin-auth-token";
var ADMIN_SESSION_MAX_AGE_SECONDS = 3600 * 8;
function getAdminPassword() {
	return ADMIN_PASSWORD$1 || "";
}
async function signAdminPayload(secret, payload) {
	if (!secret) throw new Error("ADMIN_PASSWORD is not configured");
	const encoder = new TextEncoder();
	const key = await globalThis.crypto.subtle.importKey("raw", encoder.encode(secret), {
		name: "HMAC",
		hash: "SHA-256"
	}, false, ["sign"]);
	const signature = await globalThis.crypto.subtle.sign("HMAC", key, encoder.encode(payload));
	return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function constantTimeEqual(a, b) {
	if (a.length !== b.length) return false;
	let result = 0;
	for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return result === 0;
}
async function isAdminAuthorized(request) {
	const password = getAdminPassword();
	if (!password) return false;
	const cookieHeader = request.headers.get("cookie") || "";
	const cookieValue = Object.fromEntries(cookieHeader.split(";").map((chunk) => {
		const [name, ...rest] = chunk.trim().split("=");
		return [name, rest.join("=")];
	}))[ADMIN_COOKIE_NAME];
	if (!cookieValue) return false;
	const [issuedAtRaw, signature] = cookieValue.split(".");
	const issuedAt = Number(issuedAtRaw);
	if (!Number.isFinite(issuedAt) || !signature) return false;
	if (Date.now() - issuedAt > ADMIN_SESSION_MAX_AGE_SECONDS * 1e3) return false;
	return constantTimeEqual(signature, await signAdminPayload(password, `studio-admin-auth.${issuedAtRaw}`));
}
async function createAdminAuthCookie() {
	const password = getAdminPassword();
	const issuedAt = String(Date.now());
	return `${ADMIN_COOKIE_NAME}=${`${issuedAt}.${await signAdminPayload(password, `studio-admin-auth.${issuedAt}`)}`}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${ADMIN_SESSION_MAX_AGE_SECONDS}; Secure`;
}
async function clearAdminAuthCookie() {
	return `${ADMIN_COOKIE_NAME}=deleted; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Secure`;
}
function createErrorPayload$8(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route$11 = createFileRoute("/api/admin/mark-notification-read")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const id = (await request.json().catch(() => null))?.id;
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Missing id"
		}), {
			status: 400,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const res = await supabaseAdmin.from("notifications").update({ read: true }).eq("id", id);
		if (res.error) return new Response(JSON.stringify(createErrorPayload$8(res.error)), {
			status: 500,
			headers
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Mark notification read]", error);
		return new Response(JSON.stringify(createErrorPayload$8(error)), {
			status: 500,
			headers
		});
	}
} } } });
var Route$10 = createFileRoute("/api/admin/logout")({ server: { handlers: { POST: async () => {
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"set-cookie": clearAdminAuthCookie()
		}
	});
} } } });
var ADMIN_PASSWORD = processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD;
var loginAttempts = /* @__PURE__ */ new Map();
var MAX_LOGIN_ATTEMPTS = 6;
var LOGIN_WINDOW_MS = 600 * 1e3;
function getEnvPresence$1() {
	return {
		ADMIN_PASSWORD: Boolean(processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD),
		SUPABASE_URL: Boolean(processModule.env.SUPABASE_URL),
		SUPABASE_SERVICE_ROLE_KEY: Boolean(processModule.env.SUPABASE_SERVICE_ROLE_KEY),
		SUPABASE_PUBLISHABLE_KEY: Boolean(processModule.env.SUPABASE_PUBLISHABLE_KEY)
	};
}
function logAdminRouteFailure$1(error, context = {}) {
	const payload = {
		route: "/api/admin/login",
		env: getEnvPresence$1(),
		nodeEnv: "production",
		vercelEnv: processModule.env.VERCEL_ENV ?? "undefined",
		...context
	};
	if (error instanceof Error) {
		console.error("[Admin login] Runtime exception", {
			...payload,
			message: error.message,
			name: error.name,
			stack: error.stack
		});
		console.error(error);
		return;
	}
	console.error("[Admin login] Runtime exception", {
		...payload,
		error
	});
}
function createErrorPayload$7(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
function getClientKey(request) {
	return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
function isRateLimited(key) {
	const now = Date.now();
	const record = loginAttempts.get(key);
	if (!record || record.resetAt <= now) {
		loginAttempts.set(key, {
			count: 1,
			resetAt: now + LOGIN_WINDOW_MS
		});
		return false;
	}
	record.count += 1;
	return record.count > MAX_LOGIN_ATTEMPTS;
}
function clearRateLimit(key) {
	loginAttempts.delete(key);
}
var Route$9 = createFileRoute("/api/admin/login")({ server: { handlers: { POST: async ({ request }) => {
	const clientKey = getClientKey(request);
	console.error("[Admin login] Request started", {
		route: "/api/admin/login",
		env: getEnvPresence$1(),
		nodeEnv: "production",
		vercelEnv: processModule.env.VERCEL_ENV ?? "undefined"
	});
	try {
		const password = (await request.json().catch(() => null))?.password;
		if (isRateLimited(clientKey)) return new Response(JSON.stringify({
			success: false,
			error: "Too many login attempts. Try again later."
		}), {
			status: 429,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return new Response(JSON.stringify({
			success: false,
			error: "Invalid password."
		}), {
			status: 401,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		clearRateLimit(clientKey);
		const cookie = await createAdminAuthCookie();
		return new Response(JSON.stringify({
			success: true,
			ok: true
		}), {
			status: 200,
			headers: {
				"content-type": "application/json",
				"Cache-Control": "no-store",
				"set-cookie": cookie
			}
		});
	} catch (error) {
		logAdminRouteFailure$1(error, { stage: "handler" });
		return new Response(JSON.stringify(createErrorPayload$7(error)), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
} } } });
var Route$8 = createFileRoute("/api/admin/log-notification")({ server: { handlers: { POST: async ({ request }) => {
	console.log("[Log Notification] Request started");
	try {
		if (!await isAdminAuthorized(request)) {
			console.log("[Log Notification] Admin auth failed");
			return new Response(JSON.stringify({
				success: false,
				error: "Unauthorized"
			}), {
				status: 401,
				headers: { "content-type": "application/json" }
			});
		}
		const body = await request.json().catch(() => null);
		if (!body) return new Response(JSON.stringify({
			success: false,
			error: "Invalid request body"
		}), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		const payload = body;
		if (!payload.type || !["visitor", "download"].includes(payload.type)) return new Response(JSON.stringify({
			success: false,
			error: "Invalid type. Must be 'visitor' or 'download'."
		}), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		if (!payload.session_id || !payload.ip_address || !payload.title) return new Response(JSON.stringify({
			success: false,
			error: "Missing required fields: session_id, ip_address, title"
		}), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		const result = await insertAdminNotification(supabaseAdmin, {
			type: payload.type,
			type_detail: payload.type,
			title: payload.title,
			body: payload.body || "",
			session_id: payload.session_id,
			ip_address: payload.ip_address,
			country: payload.country || null,
			browser: payload.browser || null,
			device: payload.device || null,
			filename: payload.filename || null,
			payload: {
				session_id: payload.session_id,
				ip_address: payload.ip_address,
				country: payload.country,
				browser: payload.browser,
				device: payload.device,
				filename: payload.filename
			},
			read: false
		});
		if (!result.ok) {
			console.error("[Log Notification] Insert failed:", result.error);
			return new Response(JSON.stringify({
				success: false,
				error: `Failed to store notification: ${result.error?.message || "Unknown error"}`
			}), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
		console.log(`[Log Notification] Notification stored: ${payload.type}`);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "content-type": "application/json" }
		});
	} catch (error) {
		console.error("[Log Notification] Error:", error);
		return new Response(JSON.stringify({
			success: false,
			error: error instanceof Error ? error.message : "Internal server error"
		}), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
} } } });
function createErrorPayload$6(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route$7 = createFileRoute("/api/admin/delete-user")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const userId = (await request.json().catch(() => null))?.user_id;
		if (!userId || typeof userId !== "string") return new Response(JSON.stringify({
			success: false,
			error: "Missing or invalid user_id"
		}), {
			status: 400,
			headers
		});
		let supabaseAdmin;
		try {
			supabaseAdmin = (await import("./client.server-CPH4V7T6.mjs").then((n) => n.t)).supabaseAdmin;
			if (!supabaseAdmin) throw new Error("Supabase admin client unavailable");
		} catch (err) {
			console.error("[Delete user] Supabase admin client load failed", err);
			return new Response(JSON.stringify(createErrorPayload$6(err)), {
				status: 500,
				headers
			});
		}
		const cascadeResults = {};
		try {
			cascadeResults.notifications = await supabaseAdmin.from("notifications").delete().eq("user_id", userId);
		} catch (err) {
			cascadeResults.notifications = { error: String(err) };
		}
		try {
			const res = await supabaseAdmin.auth.admin.deleteUser(userId);
			if (res?.error) {
				console.error("[Delete user] supabase.auth.admin.deleteUser error", res.error);
				return new Response(JSON.stringify({
					success: false,
					error: res.error.message || String(res.error),
					details: { cascade: cascadeResults }
				}), {
					status: 500,
					headers
				});
			}
		} catch (err) {
			console.error("[Delete user] admin.deleteUser threw", err, cascadeResults);
			return new Response(JSON.stringify(createErrorPayload$6(err)), {
				status: 500,
				headers
			});
		}
		return new Response(JSON.stringify({
			success: true,
			ok: true,
			cascade: cascadeResults
		}), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Delete user] Unhandled", error);
		return new Response(JSON.stringify(createErrorPayload$6(error)), {
			status: 500,
			headers
		});
	}
} } } });
function createErrorPayload$5(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route$6 = createFileRoute("/api/admin/delete-session")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const id = (await request.json().catch(() => null))?.id;
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Missing id"
		}), {
			status: 400,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		await supabaseAdmin.from("visits").delete().eq("session_id", id);
		await supabaseAdmin.from("downloads").delete().eq("session_id", id);
		await supabaseAdmin.from("extractions").delete().eq("session_id", id);
		await supabaseAdmin.from("notifications").delete().eq("session_id", id);
		const res = await supabaseAdmin.from("sessions").delete().eq("session_id", id);
		if (res.error) return new Response(JSON.stringify(createErrorPayload$5(res.error)), {
			status: 500,
			headers
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Delete session]", error);
		return new Response(JSON.stringify(createErrorPayload$5(error)), {
			status: 500,
			headers
		});
	}
} } } });
function createErrorPayload$4(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route$5 = createFileRoute("/api/admin/delete-notification")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const id = (await request.json().catch(() => null))?.id;
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Missing id"
		}), {
			status: 400,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const res = await supabaseAdmin.from("notifications").delete().eq("id", id);
		if (res.error) return new Response(JSON.stringify(createErrorPayload$4(res.error)), {
			status: 500,
			headers
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Delete notification]", error);
		return new Response(JSON.stringify(createErrorPayload$4(error)), {
			status: 500,
			headers
		});
	}
} } } });
function createErrorPayload$3(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route$4 = createFileRoute("/api/admin/delete-download")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const id = (await request.json().catch(() => null))?.id;
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Missing id"
		}), {
			status: 400,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const res = await supabaseAdmin.from("downloads").delete().eq("id", id);
		if (res.error) return new Response(JSON.stringify(createErrorPayload$3(res.error)), {
			status: 500,
			headers
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Delete download]", error);
		return new Response(JSON.stringify(createErrorPayload$3(error)), {
			status: 500,
			headers
		});
	}
} } } });
function getEnvPresence() {
	return {
		ADMIN_PASSWORD: Boolean(processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD),
		SUPABASE_URL: Boolean(processModule.env.SUPABASE_URL),
		SUPABASE_SERVICE_ROLE_KEY: Boolean(processModule.env.SUPABASE_SERVICE_ROLE_KEY),
		SUPABASE_PUBLISHABLE_KEY: Boolean(processModule.env.SUPABASE_PUBLISHABLE_KEY)
	};
}
function logAdminRouteFailure(error, context = {}) {
	const payload = {
		route: "/api/admin/dashboard",
		env: getEnvPresence(),
		nodeEnv: "production",
		vercelEnv: processModule.env.VERCEL_ENV ?? "undefined",
		...context
	};
	if (error instanceof Error) {
		console.error("[Admin dashboard] Runtime exception", {
			...payload,
			message: error.message,
			name: error.name,
			stack: error.stack
		});
		console.error(error);
		return;
	}
	console.error("[Admin dashboard] Runtime exception", {
		...payload,
		error
	});
}
function computeStatus(lastActive) {
	const last = new Date(lastActive).getTime();
	if (Number.isNaN(last)) return "offline";
	return Date.now() - last <= 12e4 ? "online" : "offline";
}
function notificationIsUnread(notification) {
	return notification.read !== true;
}
var requiredEnvVars = [
	"ADMIN_PASSWORD",
	"SUPABASE_URL",
	"SUPABASE_SERVICE_ROLE_KEY"
];
function logEnvStatus() {
	const status = requiredEnvVars.map((name) => `${name}=${processModule.env[name] ? "set" : "missing"}`).join(", ");
	console.log(`[Dashboard] Required env vars: ${status}`);
}
function createFailureResponse(message, step, error, details, table, column) {
	return {
		success: false,
		error: error instanceof Error ? error.message : typeof error === "string" ? error : message,
		step,
		details,
		table,
		column
	};
}
function parsePostgresError(errorMessage) {
	const tableMatch = /relation "([^"]+)" does not exist/.exec(errorMessage) || /table "([^"]+)" does not exist/.exec(errorMessage);
	const columnMatch = /column "([^"]+)" does not exist/.exec(errorMessage);
	return {
		table: tableMatch?.[1],
		column: columnMatch?.[1]
	};
}
function extractErrorLocation(stack) {
	if (!stack) return "unknown location";
	const lines = stack.split("\n").slice(1);
	const firstFrame = lines.find((line) => line.includes("src/")) || lines[0];
	return firstFrame ? firstFrame.trim() : "unknown location";
}
async function verifyDatabaseConnectivity(supabaseAdmin) {
	console.log("[Dashboard] Verifying database connectivity using sessions table...");
	const res = await supabaseAdmin.from("sessions").select("session_id").limit(1);
	if (res.error) {
		const parsed = parsePostgresError(res.error.message);
		console.error("[Dashboard] Database connectivity check failed:", res.error.message);
		return {
			ok: false,
			error: res.error,
			table: parsed.table,
			column: parsed.column,
			details: res.error.message
		};
	}
	console.log("[Dashboard] Database connectivity verified");
	return { ok: true };
}
var Route$3 = createFileRoute("/api/admin/dashboard")({ server: { handlers: { GET: async ({ request }) => {
	const responseHeaders = {
		"content-type": "application/json",
		"Cache-Control": "no-store"
	};
	logEnvStatus();
	console.error("[Admin dashboard] Request started", {
		route: "/api/admin/dashboard",
		env: getEnvPresence(),
		nodeEnv: "production",
		vercelEnv: processModule.env.VERCEL_ENV ?? "undefined",
		requestUrl: request.url
	});
	try {
		const missingEnv = requiredEnvVars.filter((name) => !processModule.env[name]);
		if (missingEnv.length > 0) {
			const message = `Missing required environment variables: ${missingEnv.join(", ")}`;
			console.error("[Dashboard]", message);
			logAdminRouteFailure(new Error(message), {
				stage: "validate_env",
				missingEnv
			});
			return new Response(JSON.stringify(createFailureResponse(message, "validate_env", new Error(message))), {
				status: 500,
				headers: responseHeaders
			});
		}
		try {
			if (!await isAdminAuthorized(request)) {
				console.warn("[Dashboard] Unauthorized access attempt");
				return new Response(JSON.stringify(createFailureResponse("Unauthorized", "authorize", void 0, "Admin auth failed")), {
					status: 401,
					headers: responseHeaders
				});
			}
		} catch (authError) {
			const message = authError instanceof Error ? authError.message : String(authError);
			const location = extractErrorLocation(authError instanceof Error ? authError.stack : void 0);
			console.error("[Dashboard] Authorization failed:", message, location);
			logAdminRouteFailure(authError, {
				stage: "authorize",
				message,
				location
			});
			return new Response(JSON.stringify(createFailureResponse("Authentication failed", "authorize", authError, message)), {
				status: 401,
				headers: responseHeaders
			});
		}
		let supabaseAdmin;
		try {
			console.log("[Dashboard] Importing Supabase admin client");
			supabaseAdmin = (await import("./client.server-CPH4V7T6.mjs").then((n) => n.t)).supabaseAdmin;
			if (!supabaseAdmin) throw new Error("Supabase admin client import returned undefined");
		} catch (importError) {
			const message = importError instanceof Error ? importError.message : String(importError);
			const stack = importError instanceof Error ? importError.stack || message : String(importError);
			console.error("[Dashboard] Supabase client import failed:", message, stack);
			logAdminRouteFailure(importError, {
				stage: "load_client",
				message,
				stack
			});
			return new Response(JSON.stringify(createFailureResponse("Database client unavailable", "load_client", importError, message)), {
				status: 500,
				headers: responseHeaders
			});
		}
		const connectivity = await verifyDatabaseConnectivity(supabaseAdmin);
		if (!connectivity.ok) {
			const message = connectivity.details || "Database connectivity check failed";
			logAdminRouteFailure(connectivity.error, {
				stage: "database_connectivity",
				message,
				table: connectivity.table,
				column: connectivity.column
			});
			return new Response(JSON.stringify(createFailureResponse(message, "database_connectivity", connectivity.error, connectivity.details, connectivity.table, connectivity.column)), {
				status: 500,
				headers: responseHeaders
			});
		}
		console.log("[Dashboard] Executing sessions query");
		const sessionsRes = await supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false });
		if (sessionsRes.error) {
			const parsed = parsePostgresError(sessionsRes.error.message);
			console.error("[Dashboard] Sessions query failed:", sessionsRes.error.message);
			logAdminRouteFailure(sessionsRes.error, {
				stage: "query_sessions",
				table: parsed.table,
				column: parsed.column,
				message: sessionsRes.error.message
			});
			return new Response(JSON.stringify(createFailureResponse("Sessions query failed", "query_sessions", sessionsRes.error, sessionsRes.error.message, parsed.table, parsed.column)), {
				status: 500,
				headers: responseHeaders
			});
		}
		const sessions = sessionsRes.data ?? [];
		console.log(`[Dashboard] Sessions fetched: ${sessions.length}`);
		console.log("[Dashboard] Executing downloads query");
		const downloadsRes = await supabaseAdmin.from("downloads").select("*").order("started_at", { ascending: false }).limit(100);
		if (downloadsRes.error) {
			const parsed = parsePostgresError(downloadsRes.error.message);
			console.error("[Dashboard] Downloads query failed:", downloadsRes.error.message);
			logAdminRouteFailure(downloadsRes.error, {
				stage: "query_downloads",
				table: parsed.table,
				column: parsed.column,
				message: downloadsRes.error.message
			});
			return new Response(JSON.stringify(createFailureResponse("Downloads query failed", "query_downloads", downloadsRes.error, downloadsRes.error.message, parsed.table, parsed.column)), {
				status: 500,
				headers: responseHeaders
			});
		}
		const downloads = downloadsRes.data ?? [];
		console.log(`[Dashboard] Downloads fetched: ${downloads.length}`);
		console.log("[Dashboard] Executing extractions query");
		const extractionsRes = await supabaseAdmin.from("extractions").select("*").order("created_at", { ascending: false }).limit(200);
		if (extractionsRes.error) {
			const parsed = parsePostgresError(extractionsRes.error.message);
			console.error("[Dashboard] Extractions query failed:", extractionsRes.error.message);
			logAdminRouteFailure(extractionsRes.error, {
				stage: "query_extractions",
				table: parsed.table,
				column: parsed.column,
				message: extractionsRes.error.message
			});
			return new Response(JSON.stringify(createFailureResponse("Extractions query failed", "query_extractions", extractionsRes.error, extractionsRes.error.message, parsed.table, parsed.column)), {
				status: 500,
				headers: responseHeaders
			});
		}
		const extractions = extractionsRes.data ?? [];
		console.log(`[Dashboard] Extractions fetched: ${extractions.length}`);
		console.log("[Dashboard] Executing notifications query");
		const notificationsRes = await supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
		if (notificationsRes.error) {
			const parsed = parsePostgresError(notificationsRes.error.message);
			console.error("[Dashboard] Notifications query failed:", notificationsRes.error.message);
			logAdminRouteFailure(notificationsRes.error, {
				stage: "query_notifications",
				table: parsed.table,
				column: parsed.column,
				message: notificationsRes.error.message
			});
			return new Response(JSON.stringify(createFailureResponse("Notifications query failed", "query_notifications", notificationsRes.error, notificationsRes.error.message, parsed.table, parsed.column)), {
				status: 500,
				headers: responseHeaders
			});
		}
		const notifications = notificationsRes.data ?? [];
		console.log(`[Dashboard] Notifications fetched: ${notifications.length}`);
		const installedSessionIds = /* @__PURE__ */ new Set([...downloads.filter((download) => download.extracted === true).map((download) => download.session_id).filter(Boolean), ...extractions.map((extraction) => extraction.session_id).filter(Boolean)]);
		const onlineSessions = sessions.map((session) => ({
			...session,
			installed: installedSessionIds.has(session.session_id),
			status: computeStatus(session.last_active),
			last_active_time: session.last_active,
			first_visit_time: session.first_visit
		}));
		const enhancedDownloads = downloads.map((download) => ({
			...download,
			installed: download.extracted === true,
			status: download.completed ? "completed" : "in_progress"
		}));
		const downloadUsers = new Set(enhancedDownloads.map((download) => download.session_id || download.ip || download.user_id).filter(Boolean)).size;
		const completedDownloads = enhancedDownloads.filter((download) => download.completed).length;
		const unreadNotifications = notifications.filter(notificationIsUnread);
		try {
			const pendingOffline = sessions.filter((session) => session.last_active < (/* @__PURE__ */ new Date(Date.now() - 12e4)).toISOString() && !session.notified_left);
			if (pendingOffline.length > 0) {
				console.log(`[Dashboard] Creating ${pendingOffline.length} offline notification(s)`);
				await Promise.all(pendingOffline.map((session) => insertAdminNotification(supabaseAdmin, {
					type: "visitor_left",
					type_detail: "visitor",
					title: "Visitor Left",
					body: `${session.ip ?? "unknown"} — ${session.country ?? "unknown"} — ${session.device ?? session.os ?? "Unknown device"}`,
					session_id: session.session_id,
					ip_address: session.ip,
					country: session.country,
					browser: session.browser,
					device: session.device,
					payload: {
						session_id: session.session_id,
						ip_address: session.ip,
						country: session.country
					},
					read: false,
					delivered: false
				})));
				await supabaseAdmin.from("sessions").update({ notified_left: true }).in("session_id", pendingOffline.map((session) => session.session_id));
			}
		} catch (backgroundError) {
			console.warn("[Dashboard] Background update failed:", backgroundError instanceof Error ? backgroundError.message : String(backgroundError));
		}
		const response = {
			success: true,
			sessions: onlineSessions,
			downloads: enhancedDownloads,
			notifications,
			stats: {
				total_sessions: onlineSessions.length,
				online_sessions: onlineSessions.filter((s) => s.status === "online").length,
				total_downloads: enhancedDownloads.length,
				download_users: downloadUsers,
				completed_downloads: completedDownloads,
				pending_notifications: unreadNotifications.length
			}
		};
		console.log("[Dashboard] Dashboard handler completed successfully");
		return new Response(JSON.stringify(response), {
			status: 200,
			headers: responseHeaders
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		const stack = error instanceof Error ? error.stack || message : String(error);
		const location = extractErrorLocation(error instanceof Error ? error.stack : void 0);
		console.error("[Dashboard] Unhandled exception:", message, location, stack);
		logAdminRouteFailure(error, {
			stage: "unhandled_exception",
			message,
			location
		});
		return new Response(JSON.stringify(createFailureResponse(message, "unhandled_exception", error, `Unhandled exception at ${location}`)), {
			status: 500,
			headers: responseHeaders
		});
	}
} } } });
function createErrorPayload$2(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route$2 = createFileRoute("/api/admin/clear-notifications")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const res = await supabaseAdmin.from("notifications").delete().not("id", "is", null);
		if (res.error) return new Response(JSON.stringify(createErrorPayload$2(res.error)), {
			status: 500,
			headers
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Clear notifications]", error);
		return new Response(JSON.stringify(createErrorPayload$2(error)), {
			status: 500,
			headers
		});
	}
} } } });
function createErrorPayload$1(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
async function clearTable(supabaseAdmin, table) {
	const res = await supabaseAdmin.from(table).delete().not("id", "is", null);
	if (res.error) throw res.error;
}
var Route$1 = createFileRoute("/api/admin/clear-history")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		await clearTable(supabaseAdmin, "notifications");
		await clearTable(supabaseAdmin, "downloads");
		await clearTable(supabaseAdmin, "extractions");
		await clearTable(supabaseAdmin, "visits");
		const sessionsRes = await supabaseAdmin.from("sessions").delete().not("session_id", "is", null);
		if (sessionsRes.error) throw sessionsRes.error;
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Clear history]", error);
		return new Response(JSON.stringify(createErrorPayload$1(error)), {
			status: 500,
			headers
		});
	}
} } } });
function createErrorPayload(error) {
	return {
		success: false,
		error: error instanceof Error ? error.message : String(error)
	};
}
var Route = createFileRoute("/api/admin/clear-downloads")({ server: { handlers: { POST: async ({ request }) => {
	const headers = { "content-type": "application/json" };
	try {
		if (!await isAdminAuthorized(request)) return new Response(JSON.stringify({
			success: false,
			error: "Unauthorized"
		}), {
			status: 401,
			headers
		});
		const { supabaseAdmin } = await import("./client.server-CPH4V7T6.mjs").then((n) => n.t);
		const res = await supabaseAdmin.from("downloads").delete().not("id", "is", null);
		if (res.error) return new Response(JSON.stringify(createErrorPayload(res.error)), {
			status: 500,
			headers
		});
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error("[Clear downloads]", error);
		return new Response(JSON.stringify(createErrorPayload(error)), {
			status: 500,
			headers
		});
	}
} } } });
var MeRoute = Route$24.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$25
});
var InstalledRoute = Route$23.update({
	id: "/installed",
	path: "/installed",
	getParentRoute: () => Route$25
});
var AuthRoute = Route$22.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$25
});
var AuthenticatedRouteRoute = Route$21.update({
	id: "/_authenticated",
	getParentRoute: () => Route$25
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$25
});
var AuthenticatedAdminRoute = Route$19.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiPublicVisitRoute = Route$18.update({
	id: "/api/public/visit",
	path: "/api/public/visit",
	getParentRoute: () => Route$25
});
var ApiPublicMarkExtractedRoute = Route$17.update({
	id: "/api/public/mark-extracted",
	path: "/api/public/mark-extracted",
	getParentRoute: () => Route$25
});
var ApiPublicInstalledRoute = Route$16.update({
	id: "/api/public/installed",
	path: "/api/public/installed",
	getParentRoute: () => Route$25
});
var ApiPublicDownloadRoute = Route$15.update({
	id: "/api/public/download",
	path: "/api/public/download",
	getParentRoute: () => Route$25
});
var ApiMeStatsRoute = Route$14.update({
	id: "/api/me/stats",
	path: "/api/me/stats",
	getParentRoute: () => Route$25
});
var ApiMeLogoutRoute = Route$13.update({
	id: "/api/me/logout",
	path: "/api/me/logout",
	getParentRoute: () => Route$25
});
var ApiMeLoginRoute = Route$12.update({
	id: "/api/me/login",
	path: "/api/me/login",
	getParentRoute: () => Route$25
});
var ApiAdminMarkNotificationReadRoute = Route$11.update({
	id: "/api/admin/mark-notification-read",
	path: "/api/admin/mark-notification-read",
	getParentRoute: () => Route$25
});
var ApiAdminLogoutRoute = Route$10.update({
	id: "/api/admin/logout",
	path: "/api/admin/logout",
	getParentRoute: () => Route$25
});
var ApiAdminLoginRoute = Route$9.update({
	id: "/api/admin/login",
	path: "/api/admin/login",
	getParentRoute: () => Route$25
});
var ApiAdminLogNotificationRoute = Route$8.update({
	id: "/api/admin/log-notification",
	path: "/api/admin/log-notification",
	getParentRoute: () => Route$25
});
var ApiAdminDeleteUserRoute = Route$7.update({
	id: "/api/admin/delete-user",
	path: "/api/admin/delete-user",
	getParentRoute: () => Route$25
});
var ApiAdminDeleteSessionRoute = Route$6.update({
	id: "/api/admin/delete-session",
	path: "/api/admin/delete-session",
	getParentRoute: () => Route$25
});
var ApiAdminDeleteNotificationRoute = Route$5.update({
	id: "/api/admin/delete-notification",
	path: "/api/admin/delete-notification",
	getParentRoute: () => Route$25
});
var ApiAdminDeleteDownloadRoute = Route$4.update({
	id: "/api/admin/delete-download",
	path: "/api/admin/delete-download",
	getParentRoute: () => Route$25
});
var ApiAdminDashboardRoute = Route$3.update({
	id: "/api/admin/dashboard",
	path: "/api/admin/dashboard",
	getParentRoute: () => Route$25
});
var ApiAdminClearNotificationsRoute = Route$2.update({
	id: "/api/admin/clear-notifications",
	path: "/api/admin/clear-notifications",
	getParentRoute: () => Route$25
});
var ApiAdminClearHistoryRoute = Route$1.update({
	id: "/api/admin/clear-history",
	path: "/api/admin/clear-history",
	getParentRoute: () => Route$25
});
var ApiAdminClearDownloadsRoute = Route.update({
	id: "/api/admin/clear-downloads",
	path: "/api/admin/clear-downloads",
	getParentRoute: () => Route$25
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	InstalledRoute,
	MeRoute,
	ApiAdminClearDownloadsRoute,
	ApiAdminClearHistoryRoute,
	ApiAdminClearNotificationsRoute,
	ApiAdminDashboardRoute,
	ApiAdminDeleteDownloadRoute,
	ApiAdminDeleteNotificationRoute,
	ApiAdminDeleteSessionRoute,
	ApiAdminDeleteUserRoute,
	ApiAdminLogNotificationRoute,
	ApiAdminLoginRoute,
	ApiAdminLogoutRoute,
	ApiAdminMarkNotificationReadRoute,
	ApiMeLoginRoute,
	ApiMeLogoutRoute,
	ApiMeStatsRoute,
	ApiPublicDownloadRoute,
	ApiPublicInstalledRoute,
	ApiPublicMarkExtractedRoute,
	ApiPublicVisitRoute
};
var routeTree = Route$25._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
