// tailwind.config.ts
import type { Config } from "tailwindcss"

export default {
  darkMode: "class", // wichtig: kein "media"
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
