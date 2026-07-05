import { a as __toESM } from "../_runtime.mjs";
import { i as Color, n as useFrame, o as require_jsx_runtime, r as useThree, s as require_react, t as Canvas } from "../_libs/@react-three/fiber+[...].mjs";
import { A as redirect, _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-gykmVtt_.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as getClientMeta } from "./ua-VZAcffKf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BI8ZK9IB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-j7O7tvYI.css";
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
function CinematicScene() {
	const meshRef = (0, import_react.useRef)(null);
	const { camera } = useThree();
	useFrame(({ clock }) => {
		if (!meshRef.current) return;
		camera.position.y = Math.sin(clock.getElapsedTime() * .3) * 2;
		camera.position.z = 10 + Math.cos(clock.getElapsedTime() * .2) * 1;
		camera.lookAt(0, 0, 0);
		if (meshRef.current) {
			meshRef.current.rotation.z = clock.getElapsedTime() * .05;
			meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * .3) * .3;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#0a0a1a",
				5,
				40
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#000000"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				0,
				-10
			],
			ref: meshRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
				50,
				50,
				32,
				32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
				uniforms: {
					time: { value: 0 },
					color: { value: new Color(4854924) }
				},
				vertexShader: `
            uniform float time;
            varying float vNoise;
            
            float noise(vec3 p) {
              return sin(p.x * 0.5 + time * 0.3) * cos(p.y * 0.5) * sin(p.z * 0.5);
            }
            
            void main() {
              vNoise = noise(position + vec3(time));
              vec3 pos = position;
              pos.z += sin(uv.x * 6.28 + time) * 0.5;
              pos.z += cos(uv.y * 6.28 + time * 0.7) * 0.5;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
				fragmentShader: `
            uniform vec3 color;
            varying float vNoise;
            
            void main() {
              float alpha = abs(sin(vNoise)) * 0.3;
              gl_FragColor = vec4(color, alpha);
            }
          `,
				transparent: true,
				wireframe: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointLights, {})
	] });
}
function PointLights() {
	const lightRef = (0, import_react.useRef)(null);
	useFrame(({ clock }) => {
		if (!lightRef.current) return;
		lightRef.current.children.forEach((light, i) => {
			const angle = (clock.getElapsedTime() + i) * .5;
			light.position.x = Math.cos(angle) * 15;
			light.position.y = Math.sin(angle * .7) * 8;
			light.position.z = Math.sin(angle * .3) * 10;
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: lightRef,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					10,
					10,
					5
				],
				intensity: 1,
				color: "#4a148c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					-10,
					5,
					5
				],
				intensity: .8,
				color: "#ffb300"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					-5,
					10
				],
				intensity: .6,
				color: "#1e3a8a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
				"#1e3a8a",
				"#000000",
				.5
			] })
		]
	});
}
function CinematicBackground() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 -z-10 w-full h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			camera: {
				position: [
					0,
					0,
					10
				],
				fov: 75
			},
			dpr: [1, 2],
			performance: { min: .5 },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicScene, {})
		})
	});
}
var colorMap = {
	arcane: {
		r: 74,
		g: 20,
		b: 140
	},
	gold: {
		r: 255,
		g: 179,
		b: 0
	},
	ember: {
		r: 220,
		g: 20,
		b: 60
	},
	light: {
		r: 255,
		g: 255,
		b: 255
	}
};
function CinematicParticles({ count = 100, color = "arcane" }) {
	const canvasRef = (0, import_react.useRef)(null);
	const particlesRef = (0, import_react.useRef)([]);
	const animationRef = (0, import_react.useRef)();
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		for (let i = 0; i < count; i++) particlesRef.current.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - .5) * 2,
			vy: (Math.random() - .5) * 2 - .5,
			life: Math.random() * .5 + .5,
			size: Math.random() * 3 + 1,
			color: `rgba(${colorMap[color].r}, ${colorMap[color].g}, ${colorMap[color].b}, 0.6)`,
			type: color
		});
		const animate = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			particlesRef.current.forEach((p, i) => {
				p.x += p.vx;
				p.y += p.vy;
				p.vy += .1;
				p.life -= .005;
				if (p.life <= 0) particlesRef.current[i] = {
					x: Math.random() * canvas.width,
					y: -20,
					vx: (Math.random() - .5) * 2,
					vy: (Math.random() - .5) * 2 - .5,
					life: 1,
					size: Math.random() * 3 + 1,
					color: p.color,
					type: p.type
				};
				const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
				gradient.addColorStop(0, p.color);
				gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
				ctx.fillStyle = gradient;
				ctx.fillRect(p.x - p.size * 2, p.y - p.size * 2, p.size * 4, p.size * 4);
				ctx.fillStyle = p.color.replace("0.6", String(p.life * .6));
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fill();
			});
			animationRef.current = requestAnimationFrame(animate);
		};
		animate();
		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);
		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
			window.removeEventListener("resize", handleResize);
		};
	}, [count, color]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "fixed inset-0 pointer-events-none",
		style: { zIndex: 5 }
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicParticles, {
				count: 80,
				color: "arcane"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		]
	});
}
var $$splitComponentImporter$3 = () => import("./auth-VG5gDbRa.mjs");
var Route$4 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Admin Access — Legends of Eternity" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.mjs");
var Route$3 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-CKFvLhi8.mjs");
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
var $$splitComponentImporter = () => import("./admin-CLMWNj7z.mjs");
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
