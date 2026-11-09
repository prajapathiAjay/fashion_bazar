import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll on every route change so new pages open at the top.
// If the URL has a #hash (e.g. /help/faq#shipping), scrolls to that section instead.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default ScrollToTop;
