import { Link } from "react-router-dom";
import {
  CreditCard,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
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
      { label: "Track your order", to: "/orders/track" },
      { label: "Shipping & returns", to: "/help/shipping" },
      { label: "FAQs", to: "/help/faq" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

const SOCIALS = [
  { emoji: "📸", url: "https://instagram.com", label: "Instagram", color: "hover:text-pink-500" },
  { emoji: "🐦", url: "https://twitter.com", label: "Twitter", color: "hover:text-blue-400" },
  { emoji: "📘", url: "https://facebook.com", label: "Facebook", color: "hover:text-blue-600" },
  { emoji: "🔗", url: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-700" },
];

const PAYMENT_METHODS = [
  { name: "Visa", icon: "💳" },
  { name: "Mastercard", icon: "💳" },
  { name: "UPI", icon: "📱" },
  { name: "PayPal", icon: "💰" },
];

const CONTACT_INFO = [
  { icon: MapPin, text: "123 Fashion Street, New York, NY 10001" },
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: Mail, text: "support@novamart.com" },
  { icon: Clock, text: "Mon-Fri: 9AM - 6PM EST" },
];

function Footer() {
  return (
    <footer className="bg-[#1B1523] text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="group inline-flex items-center">
              <span className="font-display text-3xl font-bold text-white transition-transform group-hover:scale-105">
                Nova<span className="text-[#F5D488]">Mart</span>
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
                    <Icon size={16} className="text-[#F5D488] shrink-0" />
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
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/5 ${social.color}`}
                >
                  <span className="text-lg">{social.emoji}</span>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-white">Stay updated</p>
              <div className="mt-3 flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-l-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#F5D488] focus:outline-none focus:ring-2 focus:ring-[#F5D488]/20"
                />
                <button className="rounded-r-lg bg-[#F5D488] px-4 py-2 text-sm font-semibold text-[#1B1523] transition-colors hover:bg-[#e8c477]">
                  Subscribe
                </button>
              </div>
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
                        className="opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" 
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
              © {new Date().getFullYear()} NovaMart. All rights reserved.
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
            <CreditCard size={18} className="text-[#F5D488]" />
            <div className="flex items-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span 
                  key={method.name}
                  className="text-xs px-2 py-1 rounded border border-white/10 bg-white/5"
                >
                  {method.icon} {method.name}
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