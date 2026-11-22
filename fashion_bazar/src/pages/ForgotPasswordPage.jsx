import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, KeyRound, Loader2, Mail, MailCheck } from "lucide-react";

const inputWrapClass =
  "flex items-center gap-2.5 rounded-xl border border-line-strong bg-white px-3.5 py-3 transition-colors focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10";
const inputClass =
  "w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Enter the email you signed up with.");
      return;
    }
    setSubmitting(true);
    try {
      // TODO(api): call the "forgot password" mutation here with { email }
      setSent(true);
    } catch (err) {
      setError(err?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-84px)] max-w-7xl items-center px-5 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-[0_30px_80px_-20px_rgba(27,21,35,0.18)] sm:p-10">
        {sent ? (
          /* Step 2: email sent */
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-50 text-mint">
              <MailCheck size={26} />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold text-ink">Check your inbox</h1>
            <p className="mt-2 text-sm leading-relaxed text-subtle">
              If an account exists for{" "}
              <span className="font-semibold text-ink">{email}</span>, we've sent a
              link to reset your password. It expires in 15 minutes.
            </p>

            <Link
              to="/login"
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink-hover hover:shadow-lg active:scale-[0.98]"
            >
              Back to log in
              <ArrowRight size={15} />
            </Link>

            <p className="mt-6 text-xs text-subtle">
              Didn't get it? Check spam, or{" "}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="font-medium text-brand hover:text-brand-dark disabled:opacity-60"
              >
                resend the link
              </button>
              {" · "}
              <button
                type="button"
                onClick={() => setSent(false)}
                className="font-medium text-brand hover:text-brand-dark"
              >
                use another email
              </button>
            </p>
          </div>
        ) : (
          /* Step 1: ask for email */
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
              <KeyRound size={22} />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold text-ink">Forgot password?</h1>
            <p className="mt-1.5 text-sm text-subtle">
              No worries. Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className={inputWrapClass}>
                <Mail size={16} className="shrink-0 text-subtle" />
                <input
                  name="email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {error && <p className="text-xs text-danger">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-all hover:bg-ink-hover hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? "Sending..." : "Send reset link"}
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

export default ForgotPasswordPage;
