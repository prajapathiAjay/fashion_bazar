import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../lib/slices/authSlice";
import { baseApi } from "../lib/api/baseApi";
import { getTokenExpiry } from "../utils/tokenExpiry";

// Logs the shopper out at the exact moment their login expires, if they keep the tab open,
// instead of waiting for the next click to fail. Renders nothing.
// (An already-expired login is dropped at start-up in authSlice.)
function SessionWatcher() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return undefined;
    const expiry = getTokenExpiry(token);
    if (expiry === null) return undefined;

    const msLeft = expiry - Date.now();
    if (msLeft > 2147483647) return undefined; // longer than setTimeout can wait (~24 days)

    const timer = setTimeout(() => {
      dispatch(logout({ expired: true }));
      // forget the old login's cart, wishlist, orders...
      dispatch(baseApi.util.resetApiState());
    }, Math.max(msLeft, 0));
    return () => clearTimeout(timer);
  }, [token, dispatch]);

  return null;
}

export default SessionWatcher;
