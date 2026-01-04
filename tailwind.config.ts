import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Navy Colors
        navy: {
          900: "#0F1A34",
          800: "#1A2744",
          700: "#1E3A5F",
        },
        // CTA Blue Colors
        cta: {
          DEFAULT: "#4A90D9",
          hover: "#3D83CB",
          active: "#376FB6",
          link: "#5BA3E0",
        },
        // Grayscale
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // Semantic Colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#0EA5E9",
        // Data Visualization
        dv: {
          1: "#1A2744",
          2: "#1E3A5F",
          3: "#2F5E9E",
          4: "#4A90D9",
          5: "#69AFE8",
          6: "#8BC4F4",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Inter",
          "system-ui",
          "-apple-system",
          "Noto Sans KR",
          "sans-serif",
        ],
      },
      fontSize: {
        // Headings
        h1: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.375rem", fontWeight: "400" }],
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "4px",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
} satisfies Config;
