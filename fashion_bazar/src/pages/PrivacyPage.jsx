import LegalPage from "../components/LegalPage";

// Template text — have it reviewed by a lawyer before going live.
const SECTIONS = [
  {
    id: "collect",
    title: "Information we collect",
    body: [
      "We collect only what we need to run the store and deliver your orders:",
      [
        "Account details: your name, email address, phone number and password (stored encrypted).",
        "Order details: delivery addresses, items you buy, and order and return history.",
        "Payment details: handled by our payment partners. We never see or store your full card number, CVV or UPI PIN.",
        "Activity on the site: items in your cart and wishlist, and products you view.",
        "Messages you send us through the contact form or by email.",
      ],
    ],
  },
  {
    id: "use",
    title: "How we use it",
    body: [
      [
        "To create and manage your account.",
        "To process payments, ship orders, and handle cancellations, returns and refunds.",
        "To send order updates by email or SMS.",
        "To answer your questions and support requests.",
        "To keep the site safe and prevent fraud.",
        "To send offers and newsletters, only if you subscribe. You can unsubscribe at any time.",
      ],
    ],
  },
  {
    id: "share",
    title: "Who we share it with",
    body: [
      "We do not sell your personal data. We share it only when needed to complete your order or when the law requires it:",
      [
        "Sellers: your name, delivery address and phone number, so they can pack and ship your order.",
        "Courier partners: your delivery address and phone number.",
        "Payment partners: to process your payment securely.",
        "Government or law enforcement: when we are legally required to.",
      ],
    ],
  },
  {
    id: "storage",
    title: "How we store and protect it",
    body: [
      "Your data is stored on secure servers. Passwords are encrypted, and the site uses HTTPS so data sent between your browser and our servers is protected.",
      "We keep your data while your account is active, and longer only when the law requires it (for example, tax records for orders).",
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: [
      "Under India's Digital Personal Data Protection Act, 2023, you can:",
      [
        "See and update your profile and addresses in your Account.",
        "Ask for a copy of the personal data we hold about you.",
        "Ask us to correct or delete your data.",
        "Withdraw consent for marketing messages at any time.",
      ],
      "To make a request, email our support team. We reply within 30 days.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "Fashion Bazar is meant for people aged 18 and over. If you are under 18, please use the site with a parent or guardian.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. When we do, we will change the date at the top of this page, and tell you by email if the change is significant.",
    ],
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      accent="policy"
      intro="What we collect, why we collect it, and how we keep it safe."
      updated="9 November 2026"
      sections={SECTIONS}
      current="/privacy"
    />
  );
}

export default PrivacyPage;
