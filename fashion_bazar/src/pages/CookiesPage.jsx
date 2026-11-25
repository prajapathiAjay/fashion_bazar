import LegalPage from "../components/LegalPage";

// Matches what the app does today: the login token is kept in localStorage (authSlice.js),
// and there are no analytics or advertising cookies. Update this page if you add any.
const SECTIONS = [
  {
    id: "what",
    title: "What cookies are",
    body: [
      "Cookies are small text files a website saves in your browser. Similar tools, like local storage, let a site remember things between visits. On this page, \"cookies\" covers both.",
    ],
  },
  {
    id: "use",
    title: "What we use",
    body: [
      "We only use storage that is needed for the site to work:",
      [
        "Sign-in: when you log in, we save a secure sign-in token in your browser's local storage so you stay logged in. It is removed when you log out.",
        "Security: our servers may use technical data to protect your account and prevent fraud.",
      ],
      "Your cart and wishlist are saved to your account on our servers, not in cookies, so they follow you across devices.",
    ],
  },
  {
    id: "not",
    title: "What we don't use",
    body: [
      "We do not currently use advertising cookies, and we do not let other companies track you on our site for ads.",
      "If we add analytics or marketing tools in the future, we will update this page and ask for your consent first.",
    ],
  },
  {
    id: "control",
    title: "How to control them",
    body: [
      "You can view and delete cookies and site data in your browser settings:",
      [
        "Chrome: Settings → Privacy and security → Third-party cookies / Site data.",
        "Safari (iPhone): Settings → Safari → Advanced → Website Data.",
        "Firefox: Settings → Privacy & Security → Cookies and Site Data.",
      ],
      "If you clear site data or block storage, you will be logged out and may need to sign in again each visit.",
    ],
  },
];

function CookiesPage() {
  return (
    <LegalPage
      title="Cookie"
      accent="policy"
      intro="What we save in your browser, and how you can control it."
      updated="9 November 2026"
      sections={SECTIONS}
      current="/cookies"
    />
  );
}

export default CookiesPage;
