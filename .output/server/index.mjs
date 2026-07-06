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
		"mtime": "2026-07-06T10:39:51.821Z",
		"size": 104970,
		"path": "../public/favicon.ico"
	},
	"/assets/admin-DbPknOKe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-MlL+0YbLnQ2GJ+pehKLrZQScqZg\"",
		"mtime": "2026-07-06T13:41:32.615Z",
		"size": 7527,
		"path": "../public/assets/admin-DbPknOKe.js"
	},
	"/assets/auth-Bj7ZMPBu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a53-HHEM6Jbkg+aBETfvbXbKePZN07E\"",
		"mtime": "2026-07-06T13:41:32.616Z",
		"size": 2643,
		"path": "../public/assets/auth-Bj7ZMPBu.js"
	},
	"/assets/fx-DAE4Qb2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"763-8MNFsqDFvRxW4jXPMqfhvSmUMxU\"",
		"mtime": "2026-07-06T13:41:32.618Z",
		"size": 1891,
		"path": "../public/assets/fx-DAE4Qb2f.js"
	},
	"/assets/lenis-DdrGTsEx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"478d-mZHPO7Pf1OkK6MydXdG+JjPcikM\"",
		"mtime": "2026-07-06T13:41:32.619Z",
		"size": 18317,
		"path": "../public/assets/lenis-DdrGTsEx.js"
	},
	"/assets/route-CZf-Kqfh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66-/2asRSiZgpYhOvG+DeEX1j/WhYI\"",
		"mtime": "2026-07-06T13:41:32.620Z",
		"size": 102,
		"path": "../public/assets/route-CZf-Kqfh.js"
	},
	"/assets/styles-Bls1oCnA.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16d0f-SqZvzpyhSOhf+7T9iGzoybwmwp8\"",
		"mtime": "2026-07-06T13:41:32.624Z",
		"size": 93455,
		"path": "../public/assets/styles-Bls1oCnA.css"
	},
	"/assets/routes-qVWmjWsv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39887-zoTZlaVpMhcPAGh5lN+lB6Zmgfc\"",
		"mtime": "2026-07-06T13:41:32.622Z",
		"size": 235655,
		"path": "../public/assets/routes-qVWmjWsv.js"
	},
	"/assets/index-B-Z8wIdj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86a8c-ugZcotf/tCYxROG5FPidW90+Ft0\"",
		"mtime": "2026-07-06T13:41:32.614Z",
		"size": 551564,
		"path": "../public/assets/index-B-Z8wIdj.js"
	},
	"/game1.png": {
		"type": "image/png",
		"etag": "\"239916-m1u12UM76spJwvYwyyDuXoOGXs4\"",
		"mtime": "2026-07-06T10:39:51.837Z",
		"size": 2332950,
		"path": "../public/game1.png"
	},
	"/game2.png": {
		"type": "image/png",
		"etag": "\"24c166-wnJi3rPG5xUgSA0A3JZVWaNuuH8\"",
		"mtime": "2026-07-06T10:39:51.855Z",
		"size": 2408806,
		"path": "../public/game2.png"
	},
	"/ZEREVOK.png": {
		"type": "image/png",
		"etag": "\"23cf27-dd4lHKipIKmwumTzFWIB7LtoWTc\"",
		"mtime": "2026-07-06T10:39:51.819Z",
		"size": 2346791,
		"path": "../public/ZEREVOK.png"
	},
	"/AZRAEL.png": {
		"type": "image/png",
		"etag": "\"28ef86-IC8QMM4enbaZRfvGlQOkyQeFbGk\"",
		"mtime": "2026-07-06T10:39:51.756Z",
		"size": 2682758,
		"path": "../public/AZRAEL.png"
	},
	"/game3.png": {
		"type": "image/png",
		"etag": "\"26612d-e1fd+PEpVzvuzXAZZrs36ZT4bEc\"",
		"mtime": "2026-07-06T10:39:51.873Z",
		"size": 2515245,
		"path": "../public/game3.png"
	},
	"/Background.png": {
		"type": "image/png",
		"etag": "\"2b2666-5981RG2D3WJ/wK7GeX+MNRfBSCw\"",
		"mtime": "2026-07-06T10:39:51.777Z",
		"size": 2827878,
		"path": "../public/Background.png"
	},
	"/LUCAS.png": {
		"type": "image/png",
		"etag": "\"28b546-CvmltOxAfSPSdWTSDeOg5tOXOBE\"",
		"mtime": "2026-07-06T10:39:51.810Z",
		"size": 2667846,
		"path": "../public/LUCAS.png"
	},
	"/ELYSIA.png": {
		"type": "image/png",
		"etag": "\"2fd773-QXnVNrFbDb8I7lh9hb4l43Jq8vs\"",
		"mtime": "2026-07-06T10:39:51.797Z",
		"size": 3135347,
		"path": "../public/ELYSIA.png"
	},
	"/3D Game.rar": {
		"type": "application/vnd.rar",
		"etag": "\"139f992-of1Wcsdl6hvZCQyikgZKGEmmNl8\"",
		"mtime": "2026-07-06T10:53:58.606Z",
		"size": 20576658,
		"path": "../public/3D Game.rar"
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
var _lazy_xgfCtg = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_xgfCtg
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
