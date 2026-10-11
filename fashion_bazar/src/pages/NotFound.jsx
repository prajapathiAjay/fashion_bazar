import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-100 blur-3xl" />
      <div className="relative mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center sm:px-6 lg:py-32">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(27,21,35,0.08)]">
          <Compass size={28} className="text-brand" strokeWidth={1.75} />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-subtle">Error 404</p>
        <h1 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">
          This stall has moved on
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          The page you're looking for doesn't exist or isn't open yet. Let's get you back to the
          bazar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full border border-line-strong bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-faint"
          >
            Go home
          </Link>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg"
          >
            Browse the shop
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
