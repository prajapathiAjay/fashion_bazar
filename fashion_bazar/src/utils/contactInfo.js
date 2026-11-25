import { useGetStoreSettingsQuery } from "../lib/api/settingsApi";

// The shop's contact details, shared by the Footer, Contact page and legal pages.
// They come from the admin panel (Settings > Store details), not from this file.
//
// useContactInfo() -> { items, supportEmail, storeName, isLoading }
//   items: [{ type, label, text, href? }]  (a detail the admin left empty is skipped)
//   supportEmail: { text, href } | null
export function useContactInfo() {
  const { data: s, isLoading } = useGetStoreSettingsQuery();

  // "+91 98765 43210" -> "tel:+919876543210"
  const phoneHref = s?.supportPhone ? `tel:${s.supportPhone.replace(/[^\d+]/g, "")}` : undefined;
  const emailHref = s?.supportEmail ? `mailto:${s.supportEmail}` : undefined;

  const items = [
    { type: "address", label: "Visit us", text: s?.address },
    { type: "phone", label: "Call us", text: s?.supportPhone, href: phoneHref },
    { type: "email", label: "Email us", text: s?.supportEmail, href: emailHref },
    { type: "hours", label: "Support hours", text: s?.supportHours },
  ].filter((item) => item.text);

  return {
    items,
    supportEmail: s?.supportEmail ? { text: s.supportEmail, href: emailHref } : null,
    storeName: s?.storeName || "Fashion Bazar",
    isLoading,
  };
}
