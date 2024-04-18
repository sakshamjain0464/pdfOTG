/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["business"],
    base: true,
    styles: true,
    utils: true,
  },
}

