import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";

const inputWrapClass =
  "flex items-center gap-2.5 rounded-xl border border-line-strong bg-white px-3.5 py-3 transition-colors focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10";
const inputClass =
  "w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint";

// Small checklist under the password field
const RULES = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One letter and one number", test: (v) => /[a-zA-Z]/.test(v) && /\d/.test(v) },
];

// Opened from the link in the reset email: /reset-password/:token
function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!RULES.every((r) => r.test(password))) {
      setError("Your password doesn't meet the rules below.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    try {
      // TODO(api): call the "reset password" mutation here with { token, password }
      console.log("reset password for token", token);
      setDone(true);
    } catch (err) {
      setError(err?.data?.message || "This link is invalid or has expired.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-84px)] max-w-7xl items-center px-5 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-[0_30px_80px_-20px_rgba(27,21,35,0.18)] sm:p-10">
        {done ? (
          /* Password changed */
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-50 text-mint">
              <ShieldCheck size={26} />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold text-ink">Password updated</h1>
            <p className="mt-2 text-sm text-subtle">
              You can now log in with your new password.
            </p>
            <Link
              to="/login"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink-hover hover:shadow-lg active:scale-[0.98]"
            >
              Log in
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          /* New password form */
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
              <Lock size={22} />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold text-ink">Set a new password</h1>
            <p className="mt-1.5 text-sm text-subtle">
              Choose something you haven't used before.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className={inputWrapClass}>
                <Lock size={16} className="shrink-0 text-subtle" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
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

              <div className={inputWrapClass}>
                <Lock size={16} className="shrink-0 text-subtle" />
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm new password"
                  className={inputClass}
                />
              </div>

              <ul className="flex flex-col gap-1.5">
                {RULES.map((r) => {
                  const ok = r.test(password);
                  return (
                    <li
                      key={r.label}
                      className={`flex items-center gap-2 text-xs ${ok ? "text-mint" : "text-subtle"}`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full ${
                          ok ? "bg-mint text-white" : "border border-line-strong"
                        }`}
                      >
                        {ok && <Check size={10} strokeWidth={3.5} />}
                      </span>
                      {r.label}
                    </li>
                  );
                })}
              </ul>

              {error && <p className="text-xs text-danger">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink-hover hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? "Saving..." : "Update password"}
                {!submitting && <ArrowRight size={15} />}
              </button>
            </form>

            <Link
              to="/login"
              className="mt-6 flex items-center justify-center gap-1.5 text-xs font-medium text-subtle hover:text-ink"
            >
              <ArrowLeft size={14} />
              Back to log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
