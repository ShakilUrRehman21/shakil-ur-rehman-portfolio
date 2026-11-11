/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        sunken: token("sunken"),
        surface: token("surface"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        night: token("night"),
        cobalt: token("cobalt"),
        marigold: token("marigold"),
        orchid: token("orchid"),
        mint: token("mint"),
      },
      fontFamily: {
        display: ["'Anybody Variable'", "Anybody", "system-ui", "sans-serif"],
        sans: ["'Instrument Sans Variable'", "Instrument Sans", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
