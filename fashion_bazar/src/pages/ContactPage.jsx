import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { CONTACT_INFO } from "../utils/contactInfo";
import { useSendContactMessageMutation } from "../lib/api/contactApi";

const TOPICS = ["Order or delivery", "Returns & refunds", "Selling on Fashion Bazar", "Something else"];

const ICONS = { address: MapPin, phone: Phone, email: Mail, hours: Clock };

const inputClass =
  "w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sendMessage, { isLoading: sending }] = useSendContactMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // FormData reads every field of the form by its "name"
    const form = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await sendMessage(form).unwrap();
      setSent(true);
    } catch (err) {
      setError(err?.data?.message || "Could not send your message. Please try again.");
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Contact us" title="We're here" accent="to help">
        Questions about an order, a return or selling with us? Send a message and we'll reply
        within one working day.
      </PageHeader>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-5 lg:gap-10 lg:px-8 lg:py-20">
        {/* Contact details */}
        <div className="space-y-3 lg:col-span-2">
          {CONTACT_INFO.map(({ type, label, text, href }) => {
            const Icon = ICONS[type];
            const content = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <Icon size={20} />
                </span>
                <span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-subtle">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-ink">{text}</p>
                </span>
              </>
            );
            const cls = "flex items-center gap-4 rounded-2xl border border-line bg-white p-4";
            return href ? (
              <a key={type} href={href} className={`${cls} transition-colors hover:border-line-hover`}>
                {content}
              </a>
            ) : (
              <div key={type} className={cls}>
                {content}
              </div>
            );
          })}
          <p className="px-1 pt-2 text-sm text-muted">
            Looking for a quick answer?{" "}
            <Link to="/help/faq" className="font-semibold text-brand hover:underline">
              Check the FAQs
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 lg:col-span-3">
          {sent ? (
            <div className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 size={44} className="text-success" />
              <h2 className="mt-4 text-2xl font-bold text-ink">Message sent</h2>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Thanks for writing to us. Our team will get back to you within one working day.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink hover:border-faint"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">Send us a message</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required name="name" placeholder="Your name" className={inputClass} />
                <input required type="email" name="email" placeholder="Email address" className={inputClass} />
              </div>
              <input name="orderId" placeholder="Order ID (optional)" className={inputClass} />
              <select required name="topic" defaultValue="" className={inputClass}>
                <option value="" disabled>
                  What's it about?
                </option>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="How can we help?"
                className={`${inputClass} resize-none`}
              />
              {error && (
                <p role="alert" className="rounded-xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-hover disabled:opacity-60 sm:w-auto"
              >
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
