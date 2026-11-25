// Loads Razorpay's checkout script once, only when someone actually pays online.
// Resolves true when window.Razorpay is ready, false if the script failed (offline, blocked...).
const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => {
      script.remove(); // allow a retry on the next click
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
