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

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "Women", to: "/categories/women" },
      { label: "Men", to: "/categories/men" },
      { label: "Kids", to: "/categories/kids" },
      { label: "New arrivals", to: "/new-arrivals" },
      { label: "Sale", to: "/deals" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Become a seller", to: "/sell" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Track your order", to: "/account" },
      { label: "Shipping & returns", to: "/help/shipping" },
      { label: "FAQs", to: "/help/faq" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

const SOCIALS = [
  {
    url: "https://instagram.com",
    label: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.12A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    url: "https://x.com",
    label: "X",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z",
  },
  {
    url: "https://facebook.com",
    label: "Facebook",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
  },
  {
    url: "https://pinterest.com",
    label: "Pinterest",
    path: "M12 0a12 12 0 0 0-4.37 23.17c-.1-.95-.2-2.4.04-3.44l1.4-5.96s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.49 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.41 2.56-5.41 5.2 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.78 2.75-7.26 7.92-7.26 4.16 0 7.39 2.96 7.39 6.93 0 4.13-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1 0 12 0Z",
  },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "PayPal", "Amex"];

const CONTACT_INFO = [
  { icon: MapPin, text: "123 Fashion Street, New York, NY 10001" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: Mail, text: "support@fashionbazar.com" },
  { icon: Clock, text: "Mon-Fri: 9AM - 6PM EST" },
];

function Footer() {
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
              Reach 20k+ shoppers, get paid weekly, and keep 90% of every sale.
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
          <div className="lg:col-span-6 lg:pr-10">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="font-display text-3xl font-semibold text-white">
                Fashion<span className="italic text-sun">Bazar</span>
              </span>
            </Link>
            
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Hundreds of independent sellers, one checkout. Fashion from
              across the bazar, refreshed every week.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              {CONTACT_INFO.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 text-sm text-white/40">
                    <Icon size={16} className="text-sun shrink-0" />
                    <span className="hover:text-white/70 transition-colors">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-sun/50 hover:bg-white/5 hover:text-sun"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-white">Stay updated</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-l-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-sun focus:outline-none focus:ring-2 focus:ring-sun/20"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-sun px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-sun-dark"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading} className="lg:col-span-2">
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

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Fashion Bazar. All rights reserved.
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