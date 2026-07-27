import { useState } from "react";
import { Mail, Check } from "lucide-react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitted

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setStatus("submitted");
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-[#F7F6FA] px-6 py-12 text-center sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-14 -top-14 h-48 w-48 rounded-full bg-[#EEEDFE] blur-3xl" />
        <div className="pointer-events-none absolute -right-14 bottom-0 h-48 w-48 rounded-full bg-[#FDF3DC] blur-3xl" />

        <div className="relative mx-auto max-w-lg">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Mail size={20} className="text-[#5B21B6]" />
          </span>

          <h2 className="font-display mt-5 text-2xl font-bold text-[#1B1523] sm:text-3xl">
            First word on new stalls
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6B6478]">
            New sellers, early drops and bazar-day discounts — straight to
            your inbox, once a week, no spam.
          </p>

          {status === "idle" ? (
            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-[#E4E0EC] bg-white px-5 py-3.5 text-sm text-[#1B1523] outline-none transition-colors placeholder:text-[#9691A4] focus:border-[#5B21B6]/40 focus:ring-4 focus:ring-[#5B21B6]/10 sm:max-w-xs"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[#1B1523] px-6 py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
              >
                Join the list
              </button>
            </form>
          ) : (
            <div className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[#EAF3DE] px-5 py-3.5 text-sm font-medium text-[#3B6D11]">
              <Check size={16} />
              You're on the list — welcome to the bazar.
            </div>
          )}

          <p className="mt-4 text-xs text-[#9691A4]">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;