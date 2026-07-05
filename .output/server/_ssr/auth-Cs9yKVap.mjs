import { a as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@react-three/fiber+[...].mjs";
import { t as supabase } from "./client-gykmVtt_.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MouseGlow, r as Particles } from "./fx-D18r9mNv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Cs9yKVap.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Auth() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/admin",
				replace: true
			});
		});
	}, [navigate]);
	const onSubmit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setErr(null);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: window.location.origin + "/admin" }
				});
				if (error) throw error;
			}
			navigate({
				to: "/admin",
				replace: true
			});
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Unable to authenticate.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseGlow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {
				count: 30,
				color: "arcane"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,oklch(0.72_0.19_245/0.18),transparent)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-md rounded-2xl glass p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mb-6 inline-block text-xs uppercase tracking-[0.35em] text-white/50 hover:text-white",
						children: "← Back to site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display text-3xl text-white",
						children: "Admin Gate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-white/60",
						children: "Studio access to the Legends of Eternity dashboard."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								autoComplete: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "Email",
								className: "w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								autoComplete: mode === "signin" ? "current-password" : "new-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Password",
								minLength: 8,
								className: "w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-[color:var(--arcane)]"
							}),
							err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-[color:var(--ember)]",
								children: err
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								className: "w-full rounded-full bg-gradient-to-r from-[color:var(--arcane)] to-[color:var(--gold)] px-6 py-3 text-sm uppercase tracking-[0.25em] text-black transition hover:scale-[1.01] disabled:opacity-60",
								children: busy ? "…" : mode === "signin" ? "Enter" : "Create account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 text-center text-xs text-white/50",
						children: mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["No account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode("signup"),
							className: "text-white hover:underline",
							children: "Create one"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode("signin"),
							className: "text-white hover:underline",
							children: "Sign in"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/30",
						children: "First user must be granted admin role in the database."
					})
				]
			})
		]
	});
}
//#endregion
export { Auth as component };
