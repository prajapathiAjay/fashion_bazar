import { useState } from "react";

// <img> that sits on a solid color while loading, fades in when ready,
// and quietly falls back to the color if the image fails.
function SmartImage({ src, alt, bg = "#F0EDF6", className = "", imgClassName = "", ...props }) {
  const [status, setStatus] = useState("loading"); // loading | loaded | error

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} style={{ backgroundColor: bg }}>
      {src && status !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
}

export default SmartImage;
