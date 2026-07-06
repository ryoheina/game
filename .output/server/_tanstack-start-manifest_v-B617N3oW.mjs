//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-B617N3oW.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/game/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/admin/dashboard",
			"/api/admin/login",
			"/api/admin/logout",
			"/api/public/download",
			"/api/public/mark-extracted"
		],
		preloads: ["/assets/index-DxaAh9Yp.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-DxaAh9Yp.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-Dct0Wg3y.js", "/assets/fx-HblvQ9FW.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-DZZI4mmw.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-DlnWB95h.js", "/assets/fx-HblvQ9FW.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-BDE_xYBH.js", "/assets/fx-HblvQ9FW.js"]
	}
} });
//#endregion
export { tsrStartManifest };
