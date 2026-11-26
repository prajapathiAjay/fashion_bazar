// Form rules for the whole website, in one place.
// They are the SAME rules the backend checks (user.controller.js, user.schema.js, contact.controller.js),
// so the shopper sees the problem under the field straight away instead of after a server round trip.
// The backend still checks everything: someone can call the API without this website.

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PINCODE_PATTERN = /^\d{6}$/;
export const NAME_MAX = 25; // user.schema.js firstName maxLength

// "+91 98765 43210" -> "9876543210" (the backend stores the last 10 digits)
export const phoneDigits = (value) => String(value ?? "").replace(/\D/g, "").slice(-10);
export const isValidPhone = (value) => /^[6-9]\d{9}$/.test(phoneDigits(value));

export const PASSWORD_HINT = "At least 8 characters, with a letter and a number";
export const isStrongPassword = (value) =>
  String(value ?? "").length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value);

// Plain checks for forms that don't use react-hook-form. Each returns a message, or "" when fine.
export const checkEmail = (value) =>
  !String(value ?? "").trim()
    ? "Enter your email"
    : EMAIL_PATTERN.test(String(value).trim())
      ? ""
      : "Enter a valid email, like name@example.com";
export const checkPassword = (value) =>
  !value ? "Enter a password" : isStrongPassword(value) ? "" : PASSWORD_HINT;
export const checkName = (value, label = "First name") =>
  !String(value ?? "").trim()
    ? `Enter your ${label.toLowerCase()}`
    : String(value).trim().length > NAME_MAX
      ? `${label} can be at most ${NAME_MAX} characters`
      : "";

// react-hook-form rules: {...register("email", rules.email)}
export const rules = {
  firstName: {
    validate: (v) => checkName(v) || true,
  },
  lastName: {
    maxLength: { value: 50, message: "Last name can be at most 50 characters" },
  },
  email: {
    validate: (v) => checkEmail(v) || true,
  },
  // optional on the profile, but must be a real mobile number when filled in
  phone: {
    validate: (v) => !String(v ?? "").trim() || isValidPhone(v) || "Enter a 10-digit mobile number (starts with 6–9)",
  },
  dob: {
    validate: (v) => {
      if (!v) return true;
      const date = new Date(v);
      if (Number.isNaN(date.getTime())) return "Enter a valid date";
      if (date > new Date()) return "Date of birth can't be in the future";
      if (date.getFullYear() < 1900) return "Enter a valid year";
      return true;
    },
  },
  line1: {
    validate: (v) => (String(v ?? "").trim() ? true : "Enter the house / street"),
    maxLength: { value: 120, message: "Keep it under 120 characters" },
  },
  line2: { maxLength: { value: 120, message: "Keep it under 120 characters" } },
  city: { validate: (v) => (String(v ?? "").trim() ? true : "Enter your city") },
  state: { required: "Choose your state" },
  pinCode: {
    required: "Enter your 6-digit pincode",
    pattern: { value: PINCODE_PATTERN, message: "Pincode must be exactly 6 digits" },
  },
};
