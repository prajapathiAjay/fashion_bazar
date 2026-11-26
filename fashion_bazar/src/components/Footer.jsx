import { Link } from "react-router-dom";
import {
  CreditCard,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Store,
  ArrowRight,
} from "lucide-react";
import { useContactInfo } from "../utils/contactInfo";

const CONTACT_ICONS = { address: MapPin, phone: Phone, email: Mail, hours: Clock };

const FOOTER_LINKS = [
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Become a seller", to: "/sell" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Track your order", to: "/account" },
      { label: "Shipping & returns", to: "/help/faq#shipping" },
      { label: "FAQs", to: "/help/faq" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

const PAYMENT_METHODS = ["UPI", "RuPay", "Visa", "Mastercard", "Net banking", "COD"];

function Footer() {
  const { items: contactItems, storeName } = useContactInfo();
  return (
    <footer className="relative bg-ink text-white/70">
      <div className="h-1.5 bg-gradient-to-r from-brand via-pop to-sun" />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        {/* Seller CTA */}
        <div className="relative mb-14 overflow-hidden rounded-3xl bg-brand-gradient p-6 sm:p-8 lg:mb-16 lg:flex lg:items-center lg:justify-between lg:p-10">
          <span className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 animate-blob rounded-full bg-sun/30 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-mint/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              <Store size={13} /> For makers & brands
            </span>
            <p className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Got a stall? Open it on Fashion Bazar.
            </p>
            <p className="mt-2 max-w-lg text-sm text-white/80">
              List your products and reach shoppers across India from one simple dashboard.
            </p>
          </div>
          <Link
            to="/sell"
            className="group relative mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink shadow-lg transition-transform hover:-translate-y-0.5 lg:mt-0"
          >
            Start selling
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="font-display text-3xl font-semibold text-white">
                Fashion<span className="italic text-sun">Bazar</span>
              </span>
            </Link>
            
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Independent sellers, one checkout. Fashion from
              across the bazar.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              {contactItems.map((item) => {
                const Icon = CONTACT_ICONS[item.type];
                const Tag = item.href ? "a" : "span";
                return (
                  <div key={item.type} className="flex items-center gap-3 text-sm text-white/40">
                    <Icon size={16} className="text-sun shrink-0" />
                    <Tag href={item.href} className="hover:text-white/70 transition-colors">
                      {item.text}
                    </Tag>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscribe column — sits right after the brand, above the links on mobile */}
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay updated
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              New drops and offers from the bazar. No spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-l-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sun focus:outline-none focus:ring-2 focus:ring-sun/20"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-sun px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sun-dark"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Footer Links — side by side even on mobile */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-4">
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-semibold text-white uppercase tracking-wider">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      <ChevronRight
                        size={12}
                        className="-ml-4 text-sun opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                to="/privacy" 
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Privacy policy
              </Link>
              <Link 
                to="/terms" 
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Terms of service
              </Link>
              <Link 
                to="/cookies" 
                className="text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Cookies
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 text-white/40">
            <CreditCard size={18} className="text-sun" />
            <div className="flex flex-wrap items-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white/60"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;