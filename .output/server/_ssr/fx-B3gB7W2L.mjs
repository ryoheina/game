import { a as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fx-B3gB7W2L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Particles({ count = 40, color = "arcane" }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return null;
	const items = Array.from({ length: count });
	const colors = {
		arcane: "oklch(0.72 0.19 245)",
		ember: "oklch(0.66 0.22 40)",
		gold: "oklch(0.82 0.14 88)"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: items.map((_, i) => {
			const size = 1 + Math.random() * 3;
			const left = Math.random() * 100;
			const delay = Math.random() * 12;
			const dur = 10 + Math.random() * 18;
			const blur = Math.random() > .6 ? "blur(1px)" : "none";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
				position: "absolute",
				bottom: "-10vh",
				left: `${left}%`,
				width: size,
				height: size,
				borderRadius: 999,
				background: colors[color],
				boxShadow: `0 0 ${8 + size * 4}px ${colors[color]}`,
				filter: blur,
				animation: `drift ${dur}s linear ${delay}s infinite`,
				opacity: .7
			} }, i);
		})
	});
}
function Fog({ opacity = .35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0",
		style: {
			background: "radial-gradient(60% 40% at 30% 80%, oklch(0.72 0.19 245 / 0.25), transparent 70%), radial-gradient(50% 30% at 80% 20%, oklch(0.82 0.14 88 / 0.15), transparent 70%)",
			mixBlendMode: "screen",
			opacity,
			animation: "floatSlow 14s ease-in-out infinite"
		}
	});
}
function MouseGlow() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		const onMove = (e) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
			});
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"aria-hidden": true,
		className: "pointer-events-none fixed left-0 top-0 z-[1] hidden md:block",
		style: {
			width: 600,
			height: 600,
			background: "radial-gradient(closest-side, oklch(0.72 0.19 245 / 0.18), transparent 70%)",
			mixBlendMode: "screen",
			filter: "blur(8px)",
			willChange: "transform"
		}
	});
}
//#endregion
export { MouseGlow as n, Particles as r, Fog as t };
