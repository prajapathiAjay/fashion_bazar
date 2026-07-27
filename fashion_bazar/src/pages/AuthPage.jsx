import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

const inputWrapClass =
  "flex items-center gap-2.5 rounded-xl border border-[#E4E0EC] bg-white px-3.5 py-3 transition-colors focus-within:border-[#5B21B6]/40 focus-within:ring-4 focus-within:ring-[#5B21B6]/10";
const inputClass =
  "w-full bg-transparent text-sm text-[#1B1523] outline-none placeholder:text-[#B5B0C1]";

function AuthPage() {
  const [mode, setMode] = useState("login"); // login | signup
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setError("Fill in all required fields.");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // hook up real auth call here
    }, 1000);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-[#ECE9F1] lg:grid-cols-2">
        {/* Visual side — hidden on mobile */}
        <div className="relative hidden flex-col justify-between bg-[#1B1523] p-10 lg:flex">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#5B21B6]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-[#F5D488]/10 blur-3xl" />

          <Link to="/" className="relative font-display text-2xl font-bold text-white">
            Fashion<span className="text-[#F5D488]">Bazar</span>
          </Link>

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

            <div className="mt-8 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5D488]/15">
                <span className="text-xs font-semibold text-[#F5D488]">4.8</span>
              </div>
              <p className="text-xs text-white/50">rated by 20k+ buyers</p>
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="bg-white p-8 sm:p-10 lg:p-12">
          <Link to="/" className="font-display text-xl font-bold text-[#1B1523] lg:hidden">
            Fashion<span className="text-[#5B21B6]">Bazar</span>
          </Link>

          <div className="mt-6 flex rounded-full bg-[#F7F6FA] p-1 lg:mt-0">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                mode === "login" ? "bg-white text-[#1B1523] shadow-sm" : "text-[#9691A4]"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                mode === "signup" ? "bg-white text-[#1B1523] shadow-sm" : "text-[#9691A4]"
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="font-display mt-6 text-2xl font-bold text-[#1B1523]">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-[#9691A4]">
            {mode === "login"
              ? "Log in to pick up where you left off."
              : "Join the bazar in under a minute."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {mode === "signup" && (
              <div className={inputWrapClass}>
                <User size={16} className="shrink-0 text-[#9691A4]" />
                <input name="name" required placeholder="Full name" className={inputClass} />
              </div>
            )}

            <div className={inputWrapClass}>
              <Mail size={16} className="shrink-0 text-[#9691A4]" />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div className={inputWrapClass}>
              <Lock size={16} className="shrink-0 text-[#9691A4]" />
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
                className="shrink-0 text-[#9691A4] hover:text-[#1B1523]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && <p className="text-xs text-[#993C1D]">{error}</p>}

            {mode === "login" && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[#6B6478]">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-[#D9D5E3] text-[#5B21B6] focus:ring-[#5B21B6]/30"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="font-medium text-[#5B21B6] hover:text-[#3C3489]">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[#1B1523] py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
            >
              {submitting
                ? "Please wait..."
                : mode === "login"
                ? "Log in"
                : "Create account"}
              {!submitting && <ArrowRight size={15} />}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#ECE9F1]" />
            <span className="text-xs text-[#9691A4]">or continue with</span>
            <span className="h-px flex-1 bg-[#ECE9F1]" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-[#E4E0EC] py-2.5 text-sm font-medium text-[#1B1523] hover:bg-[#F7F6FA]">
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-[#E4E0EC] py-2.5 text-sm font-medium text-[#1B1523] hover:bg-[#F7F6FA]">
              Apple
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-[#9691A4]">
            {mode === "login" ? (
              <>
                New to the bazar?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-medium text-[#5B21B6] hover:text-[#3C3489]"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-medium text-[#5B21B6] hover:text-[#3C3489]"
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