import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import SmartImage from "./SmartImage";
import { PHOTOS, unsplash } from "../assets/images";

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
      <div className="grid overflow-hidden rounded-sm bg-mist md:grid-cols-2">
        <div className="relative min-h-64 md:min-h-[420px]">
          <SmartImage
            src={unsplash(PHOTOS.rackLight, 900, 760)}
            alt="Clothing rail with neutral-toned blouses"
            bg="var(--color-shimmer)"
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-brand">
            <span className="h-px w-8 bg-brand" />
            The Bazar letter
          </p>
          <h2 className="mt-5 text-3xl font-medium leading-tight text-ink sm:text-[40px]">
            First word on <span className="text-gradient">new stalls</span>
          </h2>
          <p className="mt-4 max-w-md text-[15px] font-light leading-relaxed text-muted">
            New makers, early drops and members-only bazar days — delivered once a week. Plus 10% off
            your first order.
          </p>

          {status === "idle" ? (
            <form onSubmit={handleSubmit} className="mt-8 flex max-w-md items-end gap-3 border-b border-ink pb-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent py-2 text-[15px] text-ink outline-none placeholder:text-subtle"
              />
              <button
                type="submit"
                className="group flex shrink-0 items-center gap-2 py-2 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-brand"
              >
                Subscribe
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          ) : (
            <p className="mt-8 flex max-w-md items-center gap-2 border-b border-success pb-3 text-sm text-success" role="status">
              <Check size={16} />
              You're on the list — welcome to the bazar.
            </p>
          )}

          <p className="mt-4 text-xs text-subtle">No spam. Unsubscribe any time.</p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
