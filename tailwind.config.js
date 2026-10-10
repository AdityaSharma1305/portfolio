/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07070a",
        "ink-2": "#0e0e13",
        crimson: "#e5132b",
        "crimson-2": "#ff3d5a",
        bone: "#f4f1ec",
        mist: "#a7a6ad",
        smoke: "#6d6c75",
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      spacing: {
        gutter: "var(--gutter)",
      },
    },
  },
  plugins: [],
}
