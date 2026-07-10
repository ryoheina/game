//#region node_modules/.nitro/vite/services/ssr/assets/visitor-session-9sEIwEFU.js
function ensureVisitorSession() {
	if (typeof window === "undefined") return "";
	const key = "loe_sid";
	try {
		let sid = window.localStorage.getItem(key);
		if (!sid) {
			sid = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
			window.localStorage.setItem(key, sid);
		}
		return sid;
	} catch {
		return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}
}
//#endregion
export { ensureVisitorSession as t };
