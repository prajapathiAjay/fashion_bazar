import LegalPage from "../components/LegalPage";

// Template text — have it reviewed by a lawyer before going live.
// Return window, free-delivery limit and commission match FaqPage.jsx; keep them in sync.
const SECTIONS = [
  {
    id: "about",
    title: "About these terms",
    body: [
      "These terms apply when you use Fashion Bazar to browse, buy or sell. By creating an account or placing an order, you agree to them. If you don't agree, please don't use the site.",
      "Fashion Bazar is a marketplace. Products are listed and sold by independent sellers, and we help with payment, delivery and support.",
    ],
  },
  {
    id: "account",
    title: "Your account",
    body: [
      [
        "You must be 18 or over, or use the site with a parent or guardian.",
        "Give accurate details and keep them up to date.",
        "Keep your password private. You are responsible for activity on your account.",
        "Tell us straight away if you think someone else has used your account.",
      ],
    ],
  },
  {
    id: "orders",
    title: "Orders and prices",
    body: [
      "All prices are in Indian Rupees (₹) and include GST unless stated otherwise. The delivery fee, if any, is shown at checkout before you pay.",
      "An order is confirmed only when the seller accepts it. A seller may cancel an order if an item is out of stock or the listing has a clear pricing error. If that happens, you get a full refund.",
      "Product photos are for guidance. Colours can look slightly different depending on your screen.",
    ],
  },
  {
    id: "payment",
    title: "Payment",
    body: [
      "We accept UPI, debit and credit cards, net banking, and cash on delivery on eligible orders. Payments are processed by secure third-party payment partners.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    body: [
      "Delivery is free on orders over ₹999. Most orders arrive in 3–7 working days. Delivery dates are estimates and can change because of courier delays, weather or holidays.",
      "Items from different sellers may arrive in separate parcels.",
    ],
  },
  {
    id: "returns",
    title: "Cancellations, returns and refunds",
    body: [
      [
        "You can cancel an order any time before the seller ships it.",
        "Most items can be returned within 30 days of delivery if they are unused and have their original tags.",
        "Innerwear, swimwear, cosmetics and items marked \"non-returnable\" cannot be returned for hygiene reasons.",
        "Refunds reach UPI and cards in 5–7 working days after the seller receives the return. Cash on delivery orders are refunded to your bank account.",
      ],
    ],
  },
  {
    id: "sellers",
    title: "Selling on Fashion Bazar",
    body: [
      "Sellers must list only genuine products they have the right to sell, describe them accurately, and ship on time. We charge a 10% commission on each sale. Sellers who break these rules may have their listings removed or their account closed.",
    ],
  },
  {
    id: "use",
    title: "Acceptable use",
    body: [
      "Please don't:",
      [
        "Sell or list fake, stolen or illegal products.",
        "Post false reviews or misleading information.",
        "Try to hack, overload or disrupt the site.",
        "Copy our content, design or product listings without permission.",
      ],
      "We may suspend or close accounts that break these rules.",
    ],
  },
  {
    id: "liability",
    title: "Our responsibility",
    body: [
      "We work hard to keep the site accurate and running, but we can't promise it will always be error-free or available. Sellers are responsible for the quality of the products they sell. As far as the law allows, our liability for any order is limited to the amount you paid for it.",
      "Nothing in these terms affects your rights under the Consumer Protection Act, 2019.",
    ],
  },
  {
    id: "law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India. Any dispute will be handled by the courts of Bengaluru, Karnataka.",
      "We may update these terms from time to time. The date at the top shows when they last changed.",
    ],
  },
];

function TermsPage() {
  return (
    <LegalPage
      title="Terms of"
      accent="service"
      intro="The rules for buying and selling on Fashion Bazar, in plain language."
      updated="9 November 2026"
      sections={SECTIONS}
      current="/terms"
    />
  );
}

export default TermsPage;
