/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./chatapodjavorinou/**/*.{html,js,py}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'brown': {
          DEFAULT: '#603913',
          light: '#7f4c19',
        },
      }
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}

