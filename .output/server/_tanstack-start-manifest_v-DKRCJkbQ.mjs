//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DKRCJkbQ.js
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
		preloads: ["/assets/index-gUxUXtku.js", "/assets/jsx-runtime-D8nDyRPw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-gUxUXtku.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-XcDlWn1F.js", "/assets/fx-CGwUS9qe.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-CvZ8KOPW.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-t4a1coWj.js", "/assets/fx-CGwUS9qe.js"]
	},
	"/installed": {
		filePath: "E:/game/src/routes/installed.tsx",
		children: void 0,
		preloads: ["/assets/installed-CF_JgP2n.js"]
	},
	"/me": {
		filePath: "E:/game/src/routes/me.tsx",
		children: void 0,
		preloads: ["/assets/me-Di_MdLF7.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-CU6vdhcp.js", "/assets/fx-CGwUS9qe.js"]
	}
} });
//#endregion
export { tsrStartManifest };
