import type { Config } from "tailwindcss";

const { createThemes } = require('tw-colors')

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
    createThemes({
      light: {
        'primary': '#000D6B',
        'secondary': '#E6A22A',
        'tertiary': '#59619F',
        'surface': '#DFF3FF',
        'special': '#171717'
      },
    }, {
      defaultTheme: 'light'
    })
  ],
} satisfies Config;
