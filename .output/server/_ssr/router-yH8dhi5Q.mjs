import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { A as redirect, _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getClientMeta } from "./ua-VZAcffKf.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import processModule from "node:process";
import { Buffer } from "node:buffer";
import crypto, { createHmac } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-yH8dhi5Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-sNMe_vh5.css";
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
var Route$13 = createRootRouteWithContext()({
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
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
var $$splitComponentImporter$4 = () => import("./me-fuu5GXiX.mjs");
var Route$12 = createFileRoute("/me")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./auth-BbVipGh8.mjs");
var Route$11 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Studio Admin Access — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.mjs");
var Route$10 = createFileRoute("/_authenticated")({
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
var $$splitComponentImporter$1 = () => import("./routes-C1iowkx_.mjs");
var Route$9 = createFileRoute("/")({
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
var $$splitComponentImporter = () => import("./admin-DMaSdnny.mjs");
var Route$8 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Studio Dashboard — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$7 = createFileRoute("/api/public/mark-extracted")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const url = new URL(request.url);
		const sid = url.searchParams.get("sid");
		const fileName = url.searchParams.get("file");
		const { supabaseAdmin } = await import("./client.server-D8W8_sGr.mjs");
		if (sid) {
			const q = supabaseAdmin.from("downloads").update({ extracted: true }).eq("session_id", sid);
			if (fileName) q.eq("file_name", fileName);
			await q;
			await supabaseAdmin.from("extractions").insert({
				session_id: sid,
				file_name: fileName,
				device: null
			});
			await supabaseAdmin.from("notifications").insert({
				type: "download_extracted",
				title: "Download Extracted",
				body: `${sid} — ${fileName ?? "unknown"}`,
				payload: {
					session_id: sid,
					file_name: fileName
				}
			});
		}
		return new Response(null, { status: 204 });
	} catch (e) {
		console.error("mark-extracted failed", e);
		return new Response("", { status: 500 });
	}
} } } });
var RAR5_SIG = new Uint8Array([
	82,
	97,
	114,
	33,
	26,
	7,
	1,
	0
]);
function buildPlaceholderRar() {
	const readme = new TextEncoder().encode("Legends of Eternity — build placeholder.\nReplace this server route with a real archive stream in production.\n");
	const out = new Uint8Array(RAR5_SIG.length + readme.length);
	out.set(RAR5_SIG, 0);
	out.set(readme, RAR5_SIG.length);
	return out;
}
var Route$6 = createFileRoute("/api/public/download")({ server: { handlers: { GET: async ({ request }) => {
	const meta = getClientMeta(request);
	const url = new URL(request.url);
	const sid = url.searchParams.get("sid") || null;
	const fileName = url.searchParams.get("file") || "3D Game.rar";
	let downloadId = null;
	try {
		const { supabaseAdmin } = await import("./client.server-D8W8_sGr.mjs");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const { data: insertData, error: insertError } = await supabaseAdmin.from("downloads").insert({
			file_name: fileName,
			session_id: sid,
			ip: meta.ip,
			country: meta.country,
			browser: meta.browser,
			os: meta.os,
			device: meta.device,
			user_agent: meta.ua,
			extracted: false,
			started_at: now
		}).select("id").maybeSingle();
		if (insertError) throw insertError;
		downloadId = insertData?.id || null;
	} catch (e) {
		console.error("download log failed", e);
	}
	try {
		const fs = await import("node:fs/promises");
		const path = `public/${fileName}`;
		const data = await fs.readFile(path);
		try {
			if (downloadId) {
				const { supabaseAdmin } = await import("./client.server-D8W8_sGr.mjs");
				await supabaseAdmin.from("downloads").update({
					completed: true,
					completed_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", downloadId);
				await supabaseAdmin.from("notifications").insert({
					type: "download_complete",
					title: "Download Complete",
					body: `${meta.ip ?? "unknown"} — ${fileName}`,
					payload: {
						download_id: downloadId,
						session_id: sid
					}
				});
			}
		} catch (e) {
			console.error("post-download update failed", e);
		}
		return new Response(data.buffer, {
			status: 200,
			headers: {
				"Content-Type": "application/octet-stream",
				"Content-Disposition": `attachment; filename="${fileName}"`,
				"Content-Length": String(data.byteLength),
				"Cache-Control": "no-store"
			}
		});
	} catch (e) {
		const body = buildPlaceholderRar();
		try {
			if (downloadId) {
				const { supabaseAdmin } = await import("./client.server-D8W8_sGr.mjs");
				await supabaseAdmin.from("downloads").update({
					completed: true,
					completed_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", downloadId);
				await supabaseAdmin.from("notifications").insert({
					type: "download_complete",
					title: "Download Complete (placeholder)",
					body: `${meta.ip ?? "unknown"} — ${fileName}`,
					payload: {
						download_id: downloadId,
						session_id: sid
					}
				});
			}
		} catch (e) {
			console.error("post-download update failed", e);
		}
		return new Response(body.buffer, {
			status: 200,
			headers: {
				"Content-Type": "application/x-rar-compressed",
				"Content-Disposition": `attachment; filename="${fileName}"`,
				"Content-Length": String(body.length),
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
	return base64url(crypto.createHmac("sha256", secret).update(data).digest());
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
	if (!crypto.timingSafeEqual(a, e)) return false;
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
var Route$5 = createFileRoute("/api/me/stats")({ server: { handlers: { GET: async ({ request }) => {
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
		const { supabaseAdmin } = await import("./client.server-D8W8_sGr.mjs");
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
var Route$4 = createFileRoute("/api/me/logout")({ server: { handlers: { POST: async () => {
	const header = buildClearCookie();
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": header
		}
	});
} } } });
var Route$3 = createFileRoute("/api/me/login")({ server: { handlers: { POST: async ({ request }) => {
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
function getAdminCookieValue() {
	return createHmac("sha256", ADMIN_PASSWORD$1).update("studio-admin-auth").digest("hex");
}
function isAdminAuthorized(request) {
	if (!ADMIN_PASSWORD$1) return false;
	const cookieHeader = request.headers.get("cookie") || "";
	return Object.fromEntries(cookieHeader.split(";").map((chunk) => {
		const [name, ...rest] = chunk.trim().split("=");
		return [name, rest.join("=")];
	}))[ADMIN_COOKIE_NAME] === getAdminCookieValue();
}
function createAdminAuthCookie() {
	return `${ADMIN_COOKIE_NAME}=${getAdminCookieValue()}; Path=/; HttpOnly; SameSite=Lax; Secure`;
}
function clearAdminAuthCookie() {
	return `${ADMIN_COOKIE_NAME}=deleted; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`;
}
var Route$2 = createFileRoute("/api/admin/logout")({ server: { handlers: { POST: async () => {
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"set-cookie": clearAdminAuthCookie()
		}
	});
} } } });
var ADMIN_PASSWORD = processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD;
var Route$1 = createFileRoute("/api/admin/login")({ server: { handlers: { POST: async ({ request }) => {
	const password = (await request.json().catch(() => null))?.password;
	if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return new Response(JSON.stringify({ error: "Invalid password." }), {
		status: 401,
		headers: { "content-type": "application/json" }
	});
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"content-type": "application/json",
			"set-cookie": createAdminAuthCookie()
		}
	});
} } } });
function computeStatus(lastActive) {
	const last = new Date(lastActive).getTime();
	if (Number.isNaN(last)) return "offline";
	return Date.now() - last <= 12e4 ? "online" : "offline";
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
function buildEnvInfo(errors, missing) {
	const runtime = typeof processModule !== "undefined" && processModule.release?.name ? `${processModule.release.name} ${processModule.version}` : "unknown";
	const cwd = typeof processModule !== "undefined" && typeof processModule.cwd === "function" ? processModule.cwd() : "unknown";
	return {
		SUPABASE_URL: Boolean(processModule.env.SUPABASE_URL),
		SUPABASE_SERVICE_ROLE_KEY: Boolean(processModule.env.SUPABASE_SERVICE_ROLE_KEY),
		SUPABASE_PUBLISHABLE_KEY: Boolean(processModule.env.SUPABASE_PUBLISHABLE_KEY),
		ADMIN_PASSWORD: Boolean(processModule.env.ADMIN_PASSWORD || processModule.env.STUDIO_ADMIN_PASSWORD),
		NODE_ENV: "production",
		VERCEL: processModule.env.VERCEL ?? "undefined",
		VERCEL_ENV: processModule.env.VERCEL_ENV ?? "undefined",
		runtime,
		cwd,
		errors,
		missing
	};
}
function createFailureResponse(message, step, error, details, table, column) {
	return {
		success: false,
		message,
		stack: error instanceof Error ? error.stack || String(error) : typeof error === "string" ? error : "unknown stack",
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
var Route = createFileRoute("/api/admin/dashboard")({ server: { handlers: { GET: async ({ request }) => {
	const responseHeaders = { "content-type": "application/json" };
	logEnvStatus();
	try {
		const missingEnv = requiredEnvVars.filter((name) => !processModule.env[name]);
		if (missingEnv.length > 0) {
			const message = `Missing required environment variables: ${missingEnv.join(", ")}`;
			console.error("[Dashboard]", message);
			const envInfo = buildEnvInfo([{
				step: "validate_env",
				message,
				missing: missingEnv
			}], missingEnv);
			return new Response(JSON.stringify(envInfo), {
				status: 200,
				headers: responseHeaders
			});
		}
		try {
			if (!isAdminAuthorized(request)) {
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
			return new Response(JSON.stringify(createFailureResponse("Authentication failed", "authorize", authError, message)), {
				status: 200,
				headers: responseHeaders
			});
		}
		let supabaseAdmin;
		try {
			console.log("[Dashboard] Importing Supabase admin client");
			supabaseAdmin = (await import("./client.server-D8W8_sGr.mjs")).supabaseAdmin;
			if (!supabaseAdmin) throw new Error("Supabase admin client import returned undefined");
		} catch (importError) {
			const message = importError instanceof Error ? importError.message : String(importError);
			const stack = importError instanceof Error ? importError.stack || message : String(importError);
			console.error("[Dashboard] Supabase client import failed:", message, stack);
			return new Response(JSON.stringify(createFailureResponse("Database client unavailable", "load_client", importError, message)), {
				status: 200,
				headers: responseHeaders
			});
		}
		const connectivity = await verifyDatabaseConnectivity(supabaseAdmin);
		if (!connectivity.ok) {
			const message = connectivity.details || "Database connectivity check failed";
			return new Response(JSON.stringify(createFailureResponse(message, "database_connectivity", connectivity.error, connectivity.details, connectivity.table, connectivity.column)), {
				status: 200,
				headers: responseHeaders
			});
		}
		console.log("[Dashboard] Executing sessions query");
		const sessionsRes = await supabaseAdmin.from("sessions").select("*").order("last_active", { ascending: false });
		if (sessionsRes.error) {
			const parsed = parsePostgresError(sessionsRes.error.message);
			console.error("[Dashboard] Sessions query failed:", sessionsRes.error.message);
			return new Response(JSON.stringify(createFailureResponse("Sessions query failed", "query_sessions", sessionsRes.error, sessionsRes.error.message, parsed.table, parsed.column)), {
				status: 200,
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
			return new Response(JSON.stringify(createFailureResponse("Downloads query failed", "query_downloads", downloadsRes.error, downloadsRes.error.message, parsed.table, parsed.column)), {
				status: 200,
				headers: responseHeaders
			});
		}
		const downloads = downloadsRes.data ?? [];
		console.log(`[Dashboard] Downloads fetched: ${downloads.length}`);
		console.log("[Dashboard] Executing notifications query");
		const notificationsRes = await supabaseAdmin.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
		if (notificationsRes.error) {
			const parsed = parsePostgresError(notificationsRes.error.message);
			console.error("[Dashboard] Notifications query failed:", notificationsRes.error.message);
			return new Response(JSON.stringify(createFailureResponse("Notifications query failed", "query_notifications", notificationsRes.error, notificationsRes.error.message, parsed.table, parsed.column)), {
				status: 200,
				headers: responseHeaders
			});
		}
		const notifications = notificationsRes.data ?? [];
		console.log(`[Dashboard] Notifications fetched: ${notifications.length}`);
		const onlineSessions = sessions.map((session) => ({
			...session,
			status: computeStatus(session.last_active),
			last_active_time: session.last_active,
			first_visit_time: session.first_visit
		}));
		const enhancedDownloads = downloads.map((download) => ({
			...download,
			status: download.completed ? "completed" : "in_progress"
		}));
		const undeliveredNotifications = notifications.filter((notification) => !notification.delivered);
		try {
			const pendingOffline = sessions.filter((session) => session.last_active < (/* @__PURE__ */ new Date(Date.now() - 12e4)).toISOString() && !session.notified_left);
			if (pendingOffline.length > 0) {
				console.log(`[Dashboard] Creating ${pendingOffline.length} offline notification(s)`);
				await supabaseAdmin.from("notifications").insert(pendingOffline.map((session) => ({
					type: "visitor_left",
					title: "Visitor Left",
					body: `${session.ip ?? "unknown"} — ${session.device ?? session.os ?? "Unknown device"}`,
					payload: { session_id: session.session_id }
				})));
				await supabaseAdmin.from("sessions").update({ notified_left: true }).in("session_id", pendingOffline.map((session) => session.session_id));
			}
		} catch (backgroundError) {
			console.warn("[Dashboard] Background update failed:", backgroundError instanceof Error ? backgroundError.message : String(backgroundError));
		}
		try {
			if (undeliveredNotifications.length > 0) {
				console.log(`[Dashboard] Marking ${undeliveredNotifications.length} notification(s) as delivered`);
				await supabaseAdmin.from("notifications").update({ delivered: true }).in("id", undeliveredNotifications.map((notification) => notification.id));
			}
		} catch (deliveryError) {
			console.warn("[Dashboard] Notification delivery update failed:", deliveryError instanceof Error ? deliveryError.message : String(deliveryError));
		}
		const response = {
			success: true,
			sessions: onlineSessions,
			downloads: enhancedDownloads,
			notifications: undeliveredNotifications,
			stats: {
				total_sessions: onlineSessions.length,
				online_sessions: onlineSessions.filter((s) => s.status === "online").length,
				total_downloads: enhancedDownloads.length,
				pending_notifications: undeliveredNotifications.length
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
		return new Response(JSON.stringify(createFailureResponse(message, "unhandled_exception", error, `Unhandled exception at ${location}`)), {
			status: 200,
			headers: responseHeaders
		});
	}
} } } });
var MeRoute = Route$12.update({
	id: "/me",
	path: "/me",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRoute = Route$10.update({
	id: "/_authenticated",
	getParentRoute: () => Route$13
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AuthenticatedAdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiPublicMarkExtractedRoute = Route$7.update({
	id: "/api/public/mark-extracted",
	path: "/api/public/mark-extracted",
	getParentRoute: () => Route$13
});
var ApiPublicDownloadRoute = Route$6.update({
	id: "/api/public/download",
	path: "/api/public/download",
	getParentRoute: () => Route$13
});
var ApiMeStatsRoute = Route$5.update({
	id: "/api/me/stats",
	path: "/api/me/stats",
	getParentRoute: () => Route$13
});
var ApiMeLogoutRoute = Route$4.update({
	id: "/api/me/logout",
	path: "/api/me/logout",
	getParentRoute: () => Route$13
});
var ApiMeLoginRoute = Route$3.update({
	id: "/api/me/login",
	path: "/api/me/login",
	getParentRoute: () => Route$13
});
var ApiAdminLogoutRoute = Route$2.update({
	id: "/api/admin/logout",
	path: "/api/admin/logout",
	getParentRoute: () => Route$13
});
var ApiAdminLoginRoute = Route$1.update({
	id: "/api/admin/login",
	path: "/api/admin/login",
	getParentRoute: () => Route$13
});
var ApiAdminDashboardRoute = Route.update({
	id: "/api/admin/dashboard",
	path: "/api/admin/dashboard",
	getParentRoute: () => Route$13
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	MeRoute,
	ApiAdminDashboardRoute,
	ApiAdminLoginRoute,
	ApiAdminLogoutRoute,
	ApiMeLoginRoute,
	ApiMeLogoutRoute,
	ApiMeStatsRoute,
	ApiPublicDownloadRoute,
	ApiPublicMarkExtractedRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
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
