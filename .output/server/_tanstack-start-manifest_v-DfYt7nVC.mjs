//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DfYt7nVC.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-CfHm2htk.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CfHm2htk.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-cR-B0rGB.js",
			"/assets/analytics.functions-CcVrgzoH.js",
			"/assets/admin-COe4ox9z.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-DLG0tGRW.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-tsQYYY1W.js", "/assets/admin-COe4ox9z.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-BZpsXzD_.js",
			"/assets/analytics.functions-CcVrgzoH.js",
			"/assets/admin-COe4ox9z.js",
			"/assets/admin-RMJ82ZfL.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
