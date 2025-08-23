/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: { base: "#0A0F14", panel: "#0F1720", sunken: "#070B10" },
        text: { primary: "#E6F1FF", muted: "#A3B1C2", hairline: "#0D1B24" },
        neon: {
          green: { DEFAULT: "#39FF14", soft: "#82FF7A", hard: "#00CC2A" },
          pink: { DEFAULT: "#FF2AD1", soft: "#FF7DEB", hard: "#C400A8" },
          blue: { DEFAULT: "#00E5FF", soft: "#7AF2FF", hard: "#00B8D4" }
        }
      },
      boxShadow: {
        "neon-green":
          "0 0 8px rgba(57,255,20,0.60), 0 0 24px rgba(57,255,20,0.40), 0 0 48px rgba(57,255,20,0.20)",
        "neon-pink":
          "0 0 8px rgba(255,42,209,0.60), 0 0 24px rgba(255,42,209,0.40), 0 0 48px rgba(255,42,209,0.20)",
        "neon-blue":
          "0 0 8px rgba(0,229,255,0.60), 0 0 24px rgba(0,229,255,0.40), 0 0 48px rgba(0,229,255,0.20)"
      },
      dropShadow: {
        neonGreen: "0 0 2px #39FF14, 0 0 8px #39FF14",
        neonPink: "0 0 2px #FF2AD1, 0 0 8px #FF2AD1",
        neonBlue: "0 0 2px #00E5FF, 0 0 8px #00E5FF"
      },
      fontFamily: {
        mono: [
          "VT323",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      }
    }
  },
  plugins: []
};