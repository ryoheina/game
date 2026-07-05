//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Dc6NsVcv.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-D9eTE-Nw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D9eTE-Nw.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-oUUzVqDg.js",
			"/assets/analytics.functions-B2Dd4fim.js",
			"/assets/fx-DTftx7qM.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-CDcenaF1.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-oxAwBV-s.js", "/assets/fx-DTftx7qM.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-CcZC8hnH.js",
			"/assets/analytics.functions-B2Dd4fim.js",
			"/assets/fx-DTftx7qM.js",
			"/assets/admin-ZQqn1vs7.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
