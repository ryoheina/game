//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BYh_keqs.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-D5-dX5ev.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D5-dX5ev.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CSMvA6SB.js",
			"/assets/analytics.functions-Daw3OI07.js",
			"/assets/fx-cl3HGpXd.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-CdjNo-Ye.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-CeEy3C-Z.js", "/assets/fx-cl3HGpXd.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-DOGXNJQJ.js",
			"/assets/analytics.functions-Daw3OI07.js",
			"/assets/fx-cl3HGpXd.js",
			"/assets/admin-DiDpIEeC.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
