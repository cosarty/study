import { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // colors: {
    //   aaaa:'#1fb6ff'
    // },

    extend: {
      colors: {
        other: {
          a:'red'
        }
      },
      other: {
        abc:'blue'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
} as Config
