import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll on every route change so new pages open at the top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
