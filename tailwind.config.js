/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'Nunito': ['Nunito'],
      'Roboto': ['Roboto']
    },
    extend: {
      colors: {
        // primary: "#B11A50",
        purple: {
          100: "#f4ccd9",
          200: "#e999b2",
          300: "#dd668c",
          400: "#d23365",
          500: "#c7003f",
          600: "#9f0032",
          700: "#770026",
          800: "#500019",
          900: "#28000d",
        },
        primary: {
          100: "#ccccff",
          200: "#9999ff",
          300: "#6666ff",
          400: "#3333ff",
          500: "#0000ff",
          600: "#0000cc",
          700: "#000099",
          800: "#000066",
          900: "#000033",
        },
        yellow: {
          100: "#feeecc",
          200: "#fddd99",
          300: "#fccd66",
          400: "#fbbc33",
          500: "#faab00",
          600: "#c88900",
          700: "#966700",
          800: "#644400",
          900: "#322200",
        },
      },
      transitionDuration: "0.5s",
    },
  },
  safelist: [
    {
      pattern:
        /^.+-(primary|accent|secondary|info|success|warning|danger|dark|light|pink)/,
    },
  ],
  plugins: [],
});
