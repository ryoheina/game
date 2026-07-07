//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BODhDVbE.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/game/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/me",
			"/api/admin/clear-downloads",
			"/api/admin/clear-notifications",
			"/api/admin/dashboard",
			"/api/admin/delete-download",
			"/api/admin/delete-notification",
			"/api/admin/delete-session",
			"/api/admin/delete-user",
			"/api/admin/log-notification",
			"/api/admin/login",
			"/api/admin/logout",
			"/api/admin/mark-notification-read",
			"/api/me/login",
			"/api/me/logout",
			"/api/me/stats",
			"/api/public/download",
			"/api/public/mark-extracted"
		],
		preloads: ["/assets/index-B8ZH5QAR.js", "/assets/jsx-runtime-D8nDyRPw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-B8ZH5QAR.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-BM8P_H7M.js", "/assets/fx-ByJla8Q8.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-LjQa-2pW.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-Pd7iGjMw.js", "/assets/fx-ByJla8Q8.js"]
	},
	"/me": {
		filePath: "E:/game/src/routes/me.tsx",
		children: void 0,
		preloads: ["/assets/me-Di_MdLF7.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-C5TNGyE-.js", "/assets/fx-ByJla8Q8.js"]
	}
} });
//#endregion
export { tsrStartManifest };
