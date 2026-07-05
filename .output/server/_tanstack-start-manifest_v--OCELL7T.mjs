//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v--OCELL7T.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-Dxh-_mdQ.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-Dxh-_mdQ.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DxJCfAaK.js",
			"/assets/analytics.functions-DXW_CSD5.js",
			"/assets/fx-CAiW9EXT.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-DG6HQrAH.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-DZ4xXxK1.js", "/assets/fx-CAiW9EXT.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-AhC-9EFw.js",
			"/assets/analytics.functions-DXW_CSD5.js",
			"/assets/fx-CAiW9EXT.js",
			"/assets/admin-DpzkYCPy.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
