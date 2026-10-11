import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const AuthLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-mist">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-sun-50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-50 blur-3xl" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display text-[26px] font-semibold tracking-tight text-ink">
            Fashion<span className="text-gradient">Bazar</span>
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
        >
          <ArrowLeft size={15} />
          Back to shop
        </Link>
      </header>

      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
};
