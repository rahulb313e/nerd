module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: "#00AEEF",
        neon: "#00FF88",
        cyber: "#9D4EDD",
        charcoal: "#0D0D0D",
      },
      dropShadow: {
        neon: "0 0 10px #00FF88, 0 0 20px #00AEEF",
      },
    },
  },
  plugins: [],
}
