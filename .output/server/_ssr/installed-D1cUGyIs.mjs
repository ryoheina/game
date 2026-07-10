import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as ensureVisitorSession } from "./visitor-session-9sEIwEFU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/installed-D1cUGyIs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Installed() {
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		const incomingSid = params.get("sid");
		const validIncomingSid = incomingSid && incomingSid.length >= 8 && incomingSid.length <= 64 ? incomingSid : null;
		if (validIncomingSid) try {
			window.localStorage.setItem("loe_sid", validIncomingSid);
		} catch {}
		const sessionId = validIncomingSid || ensureVisitorSession();
		const token = params.get("token");
		fetch("/api/public/installed", {
			method: "POST",
			credentials: "same-origin",
			keepalive: true,
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				sessionId,
				token,
				file: params.get("file") || "LegendsofEternity.exe"
			})
		}).catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center overflow-hidden bg-black",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "max-h-dvh max-w-full object-contain",
			src: "/background2.mp4",
			autoPlay: true,
			muted: true,
			loop: true,
			playsInline: true,
			preload: "auto"
		})
	});
}
//#endregion
export { Installed as component };
