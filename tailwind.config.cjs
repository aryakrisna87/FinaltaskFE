/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btnPink: "#CD2E71",
        inputBg: "#838383",
        payText: "#616161 ",
        backGroundPay: "rgba(205, 46, 113, 0.44)",
        placeHolder: "  #D2D2D2",
      },
    },
  },

  plugins: [require("flowbite/plugin"), require("daisyui")],
};
