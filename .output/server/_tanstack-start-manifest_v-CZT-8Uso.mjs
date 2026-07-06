//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CZT-8Uso.js
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
		preloads: ["/assets/index-B-Z8wIdj.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-B-Z8wIdj.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-qVWmjWsv.js", "/assets/fx-DAE4Qb2f.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-CZf-Kqfh.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-Bj7ZMPBu.js", "/assets/fx-DAE4Qb2f.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-DbPknOKe.js", "/assets/fx-DAE4Qb2f.js"]
	}
} });
//#endregion
export { tsrStartManifest };
