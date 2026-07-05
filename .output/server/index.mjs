globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"19a0a-MKXLxbA4hvZ2k37/YIralha8PDI\"",
		"mtime": "2026-07-05T00:12:02.000Z",
		"size": 104970,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-AhC-9EFw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ecb-COLtJVFllcVyRtcRalCEVeheQa4\"",
		"mtime": "2026-07-05T20:14:50.738Z",
		"size": 16075,
		"path": "../public/assets/admin-AhC-9EFw.js"
	},
	"/assets/admin-DpzkYCPy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d3-Egyf95j+pH5R2Ee/HCBZLq3RRq0\"",
		"mtime": "2026-07-05T20:14:50.740Z",
		"size": 467,
		"path": "../public/assets/admin-DpzkYCPy.js"
	},
	"/assets/analytics.functions-DXW_CSD5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1295-DngnMsv7jVqH9HuJv1Sh7BLEuaU\"",
		"mtime": "2026-07-05T20:14:50.743Z",
		"size": 4757,
		"path": "../public/assets/analytics.functions-DXW_CSD5.js"
	},
	"/assets/auth-DZ4xXxK1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c86-wW5TMLmB4QaxvDm1lgDAqRsQrzk\"",
		"mtime": "2026-07-05T20:14:50.744Z",
		"size": 3206,
		"path": "../public/assets/auth-DZ4xXxK1.js"
	},
	"/assets/fx-CAiW9EXT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76b-cph8O0rFfIe43zeFkeFBnI2Xlhw\"",
		"mtime": "2026-07-05T20:14:50.746Z",
		"size": 1899,
		"path": "../public/assets/fx-CAiW9EXT.js"
	},
	"/assets/lenis-DdrGTsEx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"478d-mZHPO7Pf1OkK6MydXdG+JjPcikM\"",
		"mtime": "2026-07-05T20:14:50.747Z",
		"size": 18317,
		"path": "../public/assets/lenis-DdrGTsEx.js"
	},
	"/assets/route-DG6HQrAH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66-lqWvoGGfKbN3yFuoajqp7o+d1Vg\"",
		"mtime": "2026-07-05T20:14:50.749Z",
		"size": 102,
		"path": "../public/assets/route-DG6HQrAH.js"
	},
	"/assets/styles-BDKXGIsc.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"171e3-zqOx7pf7tsH27PoIyPmp9s1hMxs\"",
		"mtime": "2026-07-05T20:14:50.751Z",
		"size": 94691,
		"path": "../public/assets/styles-BDKXGIsc.css"
	},
	"/assets/routes-DxJCfAaK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38581-B526IiZ5N7shRmvOqZUzCi18h7o\"",
		"mtime": "2026-07-05T20:14:50.750Z",
		"size": 230785,
		"path": "../public/assets/routes-DxJCfAaK.js"
	},
	"/assets/index-Dxh-_mdQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15ea41-nQLwrLzcyvem66g38ZAZ7Db2oNc\"",
		"mtime": "2026-07-05T20:14:50.737Z",
		"size": 1436225,
		"path": "../public/assets/index-Dxh-_mdQ.js"
	},
	"/game1.png": {
		"type": "image/png",
		"etag": "\"239916-m1u12UM76spJwvYwyyDuXoOGXs4\"",
		"mtime": "2026-07-05T14:24:48.139Z",
		"size": 2332950,
		"path": "../public/game1.png"
	},
	"/game2.png": {
		"type": "image/png",
		"etag": "\"24c166-wnJi3rPG5xUgSA0A3JZVWaNuuH8\"",
		"mtime": "2026-07-05T14:24:44.190Z",
		"size": 2408806,
		"path": "../public/game2.png"
	},
	"/AZRAEL.png": {
		"type": "image/png",
		"etag": "\"28ef86-IC8QMM4enbaZRfvGlQOkyQeFbGk\"",
		"mtime": "2026-07-05T14:30:16.597Z",
		"size": 2682758,
		"path": "../public/AZRAEL.png"
	},
	"/Background.png": {
		"type": "image/png",
		"etag": "\"2b2666-5981RG2D3WJ/wK7GeX+MNRfBSCw\"",
		"mtime": "2026-07-05T14:28:18.165Z",
		"size": 2827878,
		"path": "../public/Background.png"
	},
	"/ZEREVOK.png": {
		"type": "image/png",
		"etag": "\"23cf27-dd4lHKipIKmwumTzFWIB7LtoWTc\"",
		"mtime": "2026-07-05T14:32:53.302Z",
		"size": 2346791,
		"path": "../public/ZEREVOK.png"
	},
	"/game3.png": {
		"type": "image/png",
		"etag": "\"26612d-e1fd+PEpVzvuzXAZZrs36ZT4bEc\"",
		"mtime": "2026-07-05T14:24:36.983Z",
		"size": 2515245,
		"path": "../public/game3.png"
	},
	"/LUCAS.png": {
		"type": "image/png",
		"etag": "\"28b546-CvmltOxAfSPSdWTSDeOg5tOXOBE\"",
		"mtime": "2026-07-05T14:35:07.122Z",
		"size": 2667846,
		"path": "../public/LUCAS.png"
	},
	"/ELYSIA.png": {
		"type": "image/png",
		"etag": "\"2fd773-QXnVNrFbDb8I7lh9hb4l43Jq8vs\"",
		"mtime": "2026-07-05T14:37:52.663Z",
		"size": 3135347,
		"path": "../public/ELYSIA.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_U9FOPC = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_U9FOPC
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
