import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash } from "../assets/images";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Star } from "lucide-react";
import { useSignupMutation, useSigninMutation } from "../lib/api/userApi";      
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96h-4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1h-4a12 12 0 0 0 0 10.78l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16.37 12.6c-.03-2.68 2.19-3.97 2.29-4.03-1.25-1.82-3.19-2.07-3.88-2.1-1.65-.17-3.22.97-4.06.97-.84 0-2.13-.95-3.5-.92A5.2 5.2 0 0 0 2.83 9.2c-1.88 3.25-.48 8.07 1.35 10.71.9 1.29 1.96 2.74 3.36 2.69 1.35-.05 1.86-.87 3.49-.87 1.63 0 2.09.87 3.51.84 1.45-.03 2.37-1.31 3.26-2.61a11.5 11.5 0 0 0 1.48-3.03c-.03-.02-2.84-1.09-2.87-4.33ZM13.7 4.73A4.6 4.6 0 0 0 14.78 1.4a4.7 4.7 0 0 0-3.06 1.58 4.4 4.4 0 0 0-1.11 3.2c1.17.09 2.36-.59 3.09-1.45Z" />
    </svg>
  );
}

const inputWrapClass =
  "flex items-center gap-2.5 rounded-xl border border-line-strong bg-white px-3.5 py-3 transition-colors focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10";
const inputClass =
  "w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint";

const AUTH_TILES = [
  { photo: PHOTOS.shopper, className: "col-span-2 h-44", w: 560, h: 352, bg: "#D9D2F0" },
  { photo: PHOTOS.womanPlaid, className: "h-44", w: 280, h: 352, bg: "#F0997B" },
  { photo: PHOTOS.wovenTote, className: "h-28", w: 280, h: 224, bg: "#F7DFA8" },
  { photo: PHOTOS.rackLight, className: "col-span-2 h-28", w: 560, h: 224, bg: "#EAD7E6" },
];

function AuthPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const mode = pathname === "/register" ? "signup" : "login";
  const setMode = (next) => {
    setError("");
    navigate(next === "signup" ? "/register" : "/login");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [signup] = useSignupMutation();   // top level ✅
  const [signin] = useSigninMutation();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const formData=new FormData(e.target);
    const name=formData.get("name");
    const email=formData.get("email");
    const password=formData.get("password");

    if(!email || !password || (mode==="signup" && !name)){
      setError("Fill in all required fields.");
      setSubmitting(false);
      return;
    }

   try {
  if (mode === "signup") {
    await signup({ name, email, password }).unwrap();
    navigate("/");
  } else {
    await signin({ email, password }).unwrap();
    
    navigate("/");
  }
} catch (err) {
  console.log("auth error", err);
  setError(typeof err?.data === "string" ? err.data : "Something went wrong");
} finally {
  setSubmitting(false);
}

    

  }

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

            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex -space-x-2">
                {[PHOTOS.womanPlaid, PHOTOS.manSuit, PHOTOS.shopper, PHOTOS.womanCoat].map((id) => (
                  <img
                    key={id}
                    src={unsplash(id, 64, 64, "&crop=faces")}
                    alt=""
                    className="h-8 w-8 rounded-full bg-ink-soft object-cover ring-2 ring-ink"
                  />
                ))}
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-white">
                  <Star size={13} className="fill-sun text-sun" /> 4.8 / 5
                </p>
                <p className="text-xs text-white/50">rated by 20k+ buyers</p>
              </div>
            </div>
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
                mode === "signup" ? "bg-white text-ink shadow-sm" : "text-subtle"
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

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === "signup" && (
              <div className={inputWrapClass}>
                <User size={16} className="shrink-0 text-subtle" />
                <input name="name" required placeholder="Full name" className={inputClass} />
              </div>
            )}

            <div className={inputWrapClass}>
              <Mail size={16} className="shrink-0 text-subtle" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div className={inputWrapClass}>
              <Lock size={16} className="shrink-0 text-subtle" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder={mode === "signup" ? "Create a password" : "Password"}
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

            {error && <p className="text-xs text-danger">{error}</p>}

            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-line-hover text-brand focus:ring-brand/30"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-medium text-brand hover:text-brand-dark">
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

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs text-subtle">or continue with</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-line-strong py-3 text-sm font-medium text-ink transition-colors hover:border-faint hover:bg-mist"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-line-strong py-3 text-sm font-medium text-ink transition-colors hover:border-faint hover:bg-mist"
            >
              <AppleIcon />
              Apple
            </button>
          </div>

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