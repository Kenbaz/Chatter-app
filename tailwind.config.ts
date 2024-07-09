import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#3E4C59",
        spanColor: "#52606D",
        tinWhite: "#FFFFFFDE",
      },
    },
  },
  plugins: [],
};