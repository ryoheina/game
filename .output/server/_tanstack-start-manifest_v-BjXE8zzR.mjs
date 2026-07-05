//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BjXE8zzR.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-MPKTpSO9.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-MPKTpSO9.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-BRSI_WfG.js",
			"/assets/analytics.functions-3Cuvl8oT.js",
			"/assets/fx-BQHwGxwi.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-DVCW4ZQB.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-D4x0S4ry.js", "/assets/fx-BQHwGxwi.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-BO-HIZLJ.js",
			"/assets/analytics.functions-3Cuvl8oT.js",
			"/assets/fx-BQHwGxwi.js",
			"/assets/admin-CgXanHCs.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
