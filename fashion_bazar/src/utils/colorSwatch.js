// Swatches for common colour names. Colours are typed freely in the admin panel,
// so any other name falls back to itself (the browser understands names like "teal").
const COLOR_HEX = {
  violet: "#6D4C74",
  coral: "#D99A80",
  gold: "#CDAF72",
  pink: "#C98B96",
  black: "#1C1714",
  sage: "#9CAE98",
  white: "#FFFFFF",
  red: "#C0392B",
  blue: "#3B6EA8",
  green: "#4F8A5B",
  yellow: "#E3C567",
  grey: "#8E8E93",
  gray: "#8E8E93",
  brown: "#7B5B45",
  beige: "#E8DCC8",
  navy: "#1F2A44",
};

export const swatchFor = (name = "") => COLOR_HEX[name.toLowerCase()] ?? name.toLowerCase();
