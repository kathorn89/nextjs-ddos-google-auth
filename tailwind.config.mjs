/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ddos-bg": "url('/assets/ddos_bg.png')",
      },
      fontFamily: {
        sans: ["var(--font-figtree)"],
      },
      colors: {
        navy: "#1B1D34",
        navy_2: "#2E324E",
        red: "#E64A51",
        beige: "#E7E6E0",
        gray_3: "#BBBBBB",
        gray_5: "#E7E6DF",
        blue_gray: "#788590",
        pale_blue_gray: "#A8B7BF",
        border_gray: "rgba(36, 41, 46, 0.12)",
      },
    },
  },
  plugins: [],
};
