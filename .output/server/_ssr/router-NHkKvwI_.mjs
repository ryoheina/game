import { a as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as getClientMeta } from "./ua-VZAcffKf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-NHkKvwI_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DcsYt2yH.css";
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
var Route$5 = createRootRouteWithContext()({
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
	const { queryClient } = Route$5.useRouteContext();
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
var $$splitComponentImporter$3 = () => import("./auth-BMnj6wie.mjs");
var Route$4 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Admin Access — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.mjs");
var Route$3 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-CTR5yjk-.mjs");
var Route$2 = createFileRoute("/")({
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
var $$splitErrorComponentImporter = () => import("./admin-BqW0Kxgr.mjs");
var $$splitComponentImporter = () => import("./admin-DunoBRdw.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Admin Dashboard — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
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
var Route = createFileRoute("/api/public/download")({ server: { handlers: { GET: async ({ request }) => {
	const meta = getClientMeta(request);
	const fileName = "LegendsOfEternity-v0.1.0.rar";
	try {
		const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
		await supabaseAdmin.from("downloads").insert({
			file_name: fileName,
			ip: meta.ip,
			country: meta.country,
			browser: meta.browser,
			os: meta.os,
			user_agent: meta.ua
		});
	} catch (e) {
		console.error("download log failed", e);
	}
	const body = buildPlaceholderRar();
	return new Response(body.buffer, {
		status: 200,
		headers: {
			"Content-Type": "application/x-rar-compressed",
			"Content-Disposition": `attachment; filename="${fileName}"`,
			"Content-Length": String(body.length),
			"Cache-Control": "no-store"
		}
	});
} } } });
var AuthRoute = Route$4.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$5
});
var AuthenticatedRouteRoute = Route$3.update({
	id: "/_authenticated",
	getParentRoute: () => Route$5
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var AuthenticatedAdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiPublicDownloadRoute = Route.update({
	id: "/api/public/download",
	path: "/api/public/download",
	getParentRoute: () => Route$5
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ApiPublicDownloadRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
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
