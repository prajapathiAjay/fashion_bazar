// Curated Unsplash photos (free to use under the Unsplash License).
// unsplash() returns a CDN URL cropped to the size each slot needs.

// Photos whose subject is small or off-centre get a default focal-point zoom.
const FOCUS = {
  "1617038220319-276d3cfab638": "&crop=focalpoint&fp-x=0.47&fp-y=0.66&fp-z=2.2", // gold hoops
};

export const unsplash = (id, w = 600, h = 750, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75${extra || FOCUS[id] || ""}`;

// Zoomed crops of the same photo, for product gallery detail shots.
export const unsplashZoom = (id, x, y, zoom, w = 600, h = 750) =>
  unsplash(id, w, h, `&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`);

export const PHOTOS = {
  // lifestyle / editorial
  shopper: "1483985988355-763728e1935b",
  womanCoat: "1539109136881-3be0616acf4b",
  womanPlaid: "1485968579580-b6d095142e6e",
  manSuit: "1617137968427-85924c800a22",
  menswearFlatlay: "1490114538077-0a7f8cb49891",
  kidRaincoat: "1503919545889-aef636e10ad4",
  rackLight: "1490481651871-ab68de25d43d",
  rackKnit: "1445205170230-053b83016050",
  storefront: "1441986300917-64674bd600d8",

  // products
  floralDress: "1496747611176-843222e1e57c",
  bomberJacket: "1591047139829-d91aecb6caea",
  knitTop: "1434389677669-e08b4cac3105",
  wideLegTrousers: "1509631179647-0177331693ae",
  wovenTote: "1590874103328-eac38a683ce7",
  leatherShoes: "1614252235316-8c857d38b5f4",
  floralHeels: "1543163521-1bf539c55dd2",
  sneakers: "1560769629-975ec94e6a86",
  goldHoops: "1617038220319-276d3cfab638",
  goldBangle: "1611591437281-460bfbe1220a",
};
