//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Cn-82C8g.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/game/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
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
			"/api/public/mark-extracted"
		],
		preloads: ["/assets/index-DV8V-XEv.js", "/assets/jsx-runtime-D8nDyRPw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-DV8V-XEv.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-C8qLczuT.js", "/assets/fx-ByJla8Q8.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-CIx7s3mz.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-DTzXHqiA.js", "/assets/fx-ByJla8Q8.js"]
	},
	"/me": {
		filePath: "E:/game/src/routes/me.tsx",
		children: void 0,
		preloads: ["/assets/me-Di_MdLF7.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-B8e4fovU.js", "/assets/fx-ByJla8Q8.js"]
	}
} });
//#endregion
export { tsrStartManifest };
