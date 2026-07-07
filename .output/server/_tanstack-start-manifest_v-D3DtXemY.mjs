//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-D3DtXemY.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/game/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/me",
			"/api/admin/dashboard",
			"/api/admin/login",
			"/api/admin/logout",
			"/api/me/login",
			"/api/me/logout",
			"/api/me/stats",
			"/api/public/download",
			"/api/public/mark-extracted"
		],
		preloads: ["/assets/index-D8AaLNC-.js", "/assets/jsx-runtime-D8nDyRPw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-D8AaLNC-.js"
		} }]
	},
	"/": {
		filePath: "E:/game/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-D5VqHSqr.js", "/assets/fx-ByJla8Q8.js"]
	},
	"/_authenticated": {
		filePath: "E:/game/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-ggQhPZVb.js"]
	},
	"/auth": {
		filePath: "E:/game/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-Cm67397B.js", "/assets/fx-ByJla8Q8.js"]
	},
	"/me": {
		filePath: "E:/game/src/routes/me.tsx",
		children: void 0,
		preloads: ["/assets/me-Di_MdLF7.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/game/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: ["/assets/admin-C3RYG77s.js", "/assets/fx-ByJla8Q8.js"]
	}
} });
//#endregion
export { tsrStartManifest };
