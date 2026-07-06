//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CMEaRDtt.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-C_bZl-en.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-C_bZl-en.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CYfOfjyJ.js",
			"/assets/analytics.functions-B1WZLWNJ.js",
			"/assets/fx-B5RrAgGj.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-C1JGtCZ8.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-CUKL_7YS.js", "/assets/fx-B5RrAgGj.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-9YMjRrcL.js",
			"/assets/analytics.functions-B1WZLWNJ.js",
			"/assets/fx-B5RrAgGj.js",
			"/assets/admin-Bb6gDb3m.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
