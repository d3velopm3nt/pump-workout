/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#10b981",
          "primary-focus": "#059669",
          "primary-content": "#ffffff",
          "secondary": "#0ea5e9",
          "accent": "#22c55e",
          "neutral": "#171717",
          "base-100": "#0a0a0a",
          "base-200": "#171717",
          "base-300": "#262626",
          "info": "#06b6d4",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
} 