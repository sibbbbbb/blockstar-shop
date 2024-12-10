import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-dvh': '100dvh',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        helvetica: ["var(--font-helvetica-lt-std)"],
        monument: ["var(--font-monument-grotesk)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
