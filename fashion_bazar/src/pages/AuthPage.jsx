import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash } from "../assets/images";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useSignupMutation, useSigninMutation } from "../lib/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, clearSessionExpired } from "../lib/slices/authSlice";
import { NAME_MAX, PASSWORD_HINT, checkEmail, checkName, checkPassword } from "../utils/validation";

// Red message under one field (nothing when there is no problem)
function FieldMessage({ text }) {
  if (!text) return null;
  return (
    <p role="alert" className="mt-1.5 text-[11px] font-semibold text-danger">
      {text}
    </p>
  );
}

const inputWrapClass =
  "flex items-center gap-2.5 rounded-xl border border-line-strong bg-white px-3.5 py-3 transition-colors focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10";
const inputClass =
  "w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint";

const AUTH_TILES = [
  {
    photo: PHOTOS.shopper,
    className: "col-span-2 h-44",
    w: 560,
    h: 352,
    bg: "#D9D2F0",
  },
  {
    photo: PHOTOS.womanPlaid,
    className: "h-44",
    w: 280,
    h: 352,
    bg: "#F0997B",
  },
  { photo: PHOTOS.wovenTote, className: "h-28", w: 280, h: 224, bg: "#F7DFA8" },
  {
    photo: PHOTOS.rackLight,
    className: "col-span-2 h-28",
    w: 560,
    h: 224,
    bg: "#EAD7E6",
  },
];

function AuthPage() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const mode = pathname === "/register" ? "signup" : "login";
  // page that sent the user here (e.g. /checkout), so we can go back after login.
  // Only paths inside this site are allowed.
  const from =
    typeof state?.from === "string" && state.from.startsWith("/") && !state.from.startsWith("//")
      ? state.from
      : "/";
  const setMode = (next) => {
    setFieldErrors({});
    setError("");
    // keep "from" when switching between log in and sign up
    navigate(next === "signup" ? "/register" : "/login", { state });
  };
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  // one message per field, shown under that field
  const [fieldErrors, setFieldErrors] = useState({});
  const [signup] = useSignupMutation(); // top level ✅
  const [signin] = useSigninMutation();
  const token = useSelector((s) => s.auth.token);
  // true when we logged the shopper out because their login expired
  const sessionExpired = useSelector((s) => s.auth.sessionExpired);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(clearSessionExpired()); // hide the "session expired" note once they try again
    setSubmitting(true);
    const formData = new FormData(e.target);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    // same rules as the server (utils/validation.js); login only needs something typed in
    const errors =
      mode === "signup"
        ? {
            firstName: checkName(firstName),
            lastName: lastName.length > 50 ? "Last name can be at most 50 characters" : "",
            email: checkEmail(email),
            password: checkPassword(password),
          }
        : { email: checkEmail(email), password: password ? "" : "Enter your password" };
    const shown = Object.fromEntries(Object.entries(errors).filter(([, m]) => m));
    setFieldErrors(shown);
    if (Object.keys(shown).length) {
      setSubmitting(false);
      return;
    }

    try {
      if (mode === "signup") {
        await signup({ firstName,lastName, email, password }).unwrap();
        // log the new shopper straight in and take them where they were going (e.g. checkout)
        const response = await signin({ email, password }).unwrap();
        dispatch(setCredentials(response.token));
        navigate(from, { replace: true });
      } else {
        const response = await signin({ email, password }).unwrap();
        dispatch(setCredentials(response.token));

        navigate(from, { replace: true });
      }
    } catch (err) {
      // the server sends { message } (or plain text for a few errors)
      setError(err?.data?.message || (typeof err?.data === "string" ? err.data : "") || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // already logged in -> no need for this page, go where they were heading
  if (token) return <Navigate to={from} replace />;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-84px)] max-w-7xl items-center px-5 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(27,21,35,0.18)] lg:grid-cols-2">
        {/* Visual side — hidden on mobile */}
        <div className="relative hidden flex-col justify-between gap-10 bg-ink p-10 lg:flex">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-sun/10 blur-3xl" />

          <div className="relative grid grid-cols-3 gap-3">
            {AUTH_TILES.map((tile) => (
              <SmartImage
                key={tile.photo}
                src={unsplash(tile.photo, tile.w, tile.h)}
                alt=""
                bg={tile.bg}
                className={`rounded-2xl ring-1 ring-white/10 ${tile.className}`}
              />
            ))}
          </div>

          <div className="relative">
            <p className="font-display text-3xl font-bold leading-tight text-white">
              Every stall,
              <br />
              one account.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Track orders, save your favorites, and check out faster across
              every seller on the bazar.
            </p>

          </div>
        </div>

        {/* Form side */}
        <div className="bg-white p-8 sm:p-10 lg:p-12">
          <div className="flex rounded-full bg-mist p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                mode === "login" ? "bg-white text-ink shadow-sm" : "text-subtle"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "bg-white text-ink shadow-sm"
                  : "text-subtle"
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="font-display mt-8 text-3xl font-bold text-ink">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-subtle">
            {mode === "login"
              ? "Log in to pick up where you left off."
              : "Join the bazar in under a minute."}
          </p>

          {mode === "login" && sessionExpired && (
            <p
              role="status"
              className="mt-4 rounded-xl border border-sun/40 bg-sun-50 px-4 py-3 text-sm text-ink-soft"
            >
              Your session expired. Please log in again to continue.
            </p>
          )}

          {/* noValidate: our own messages under each field instead of the browser's bubbles;
              typing in a field clears its message */}
          <form
            noValidate
            onSubmit={handleSubmit}
            onChange={(e) => e.target.name && setFieldErrors((fe) => ({ ...fe, [e.target.name]: "" }))}
            className="mt-6 flex flex-col gap-4"
          >
            {mode === "signup" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className={inputWrapClass}>
                    <User size={16} className="shrink-0 text-subtle" />
                    <input
                      name="firstName"
                      maxLength={NAME_MAX}
                      autoComplete="given-name"
                      aria-invalid={Boolean(fieldErrors.firstName)}
                      placeholder="First name"
                      className={inputClass}
                    />
                  </div>
                  <FieldMessage text={fieldErrors.firstName} />
                </div>
                <div>
                  <div className={inputWrapClass}>
                    <User size={16} className="shrink-0 text-subtle" />
                    <input
                      name="lastName"
                      maxLength={50}
                      autoComplete="family-name"
                      placeholder="Last name (optional)"
                      className={inputClass}
                    />
                  </div>
                  <FieldMessage text={fieldErrors.lastName} />
                </div>
              </div>
            )}

            <div>
              <div className={inputWrapClass}>
                <Mail size={16} className="shrink-0 text-subtle" />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <FieldMessage text={fieldErrors.email} />
            </div>

            <div>
            <div className={inputWrapClass}>
              <Lock size={16} className="shrink-0 text-subtle" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                aria-invalid={Boolean(fieldErrors.password)}
                placeholder={
                  mode === "signup" ? "Create a password" : "Password"
                }
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-subtle hover:text-ink"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
              {fieldErrors.password ? (
                <FieldMessage text={fieldErrors.password} />
              ) : (
                mode === "signup" && <p className="mt-1.5 text-[11px] text-subtle">{PASSWORD_HINT}</p>
              )}
            </div>

            {error && <p role="alert" className="text-xs text-danger">{error}</p>}

            {mode === "login" && (
              <div className="flex items-center justify-end text-xs">
                <Link
                  to="/forgot-password"
                  className="font-medium text-brand hover:text-brand-dark"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink-hover hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting
                ? "Please wait..."
                : mode === "login"
                  ? "Log in"
                  : "Create account"}
              {!submitting && <ArrowRight size={15} />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-subtle">
            {mode === "login" ? (
              <>
                New to the bazar?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-medium text-brand hover:text-brand-dark"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-medium text-brand hover:text-brand-dark"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
