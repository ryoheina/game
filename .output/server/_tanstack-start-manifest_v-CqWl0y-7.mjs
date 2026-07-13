//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CqWl0y-7.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/game/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/installed",
			"/me",
			"/api/admin/clear-downloads",
			"/api/admin/clear-history",
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
			"/api/public/download-progress",
			"/api/public/installed",
			"/api/public/mark-extracted",
			"/api/public/visit"
		],
		preloads: ["/assets/index-C6su83aw.js", "/assets/jsx-runtime-D8nDyRPw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-C6su83aw.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DRzE0wcB.js", "/assets/fx-CGwUS9qe.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-BHxB20b0.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-hedp-Kvs.js", "/assets/fx-CGwUS9qe.js"]
	},
	"/installed": {
		filePath: "E:/game/src/routes/installed.tsx",
		children: void 0,
		preloads: ["/assets/installed-zaWzJJ1v.js"]
	},
	"/me": {
		filePath: "E:/game/src/routes/me.tsx",
		children: void 0,
		preloads: ["/assets/me-Di_MdLF7.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-7KYKLKdZ.js", "/assets/fx-CGwUS9qe.js"]
	}
} });
//#endregion
export { tsrStartManifest };
