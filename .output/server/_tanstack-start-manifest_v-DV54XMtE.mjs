//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DV54XMtE.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "E:/eternal-visions-studio-main/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth",
			"/api/public/download"
		],
		preloads: ["/assets/index-BS2c0wya.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BS2c0wya.js"
		} }]
	},
	"/": {
		filePath: "E:/eternal-visions-studio-main/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-BDDOMhJP.js",
			"/assets/analytics.functions-37VdB_KA.js",
			"/assets/fx-CpddcejY.js"
		]
	},
	"/_authenticated": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-D6SIPyF1.js"]
	},
	"/auth": {
		filePath: "E:/eternal-visions-studio-main/src/routes/auth.tsx",
		children: void 0,
		preloads: ["/assets/auth-C-KacB3F.js", "/assets/fx-CpddcejY.js"]
	},
	"/_authenticated/admin": {
		filePath: "E:/eternal-visions-studio-main/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-CqJVvj-n.js",
			"/assets/admin-DwH8Rjux.js",
			"/assets/analytics.functions-37VdB_KA.js",
			"/assets/fx-CpddcejY.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
