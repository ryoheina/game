//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-YvuviyI_.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-D4v3rT9F.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D4v3rT9F.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-L0DFIi79.js",
			"/assets/analytics.functions-DDhHOsgp.js",
			"/assets/fx-9WmoL45O.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-rvnxlpvg.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-RaDTACbS.js", "/assets/fx-9WmoL45O.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-D0n4ZfnA.js",
			"/assets/analytics.functions-DDhHOsgp.js",
			"/assets/fx-9WmoL45O.js",
			"/assets/admin-DhLhuwUX.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
