/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    colors: {
     /*blue*/
     blue100: '#E7EEFF',
     blue200: '#D2DFFC',
     blue300: '#A6BFFA',
     blue400: '#799FF7',
     blue500: '#4C7FF4',
     blue600: '#336DF2',
     blue700: '#1852D6',
     blue800: '#0E3FB0',
     blue900: '#022B87',
     blue950: '#001C59',
     /*grey*/
     grey100: '#EFEFF2',
     grey200: '#E6E7EB',
     grey300: '#CCD0D7',
     grey400: '#B3B8C4',
     grey500: '#9AA1B0',
     grey600: '#80899C',
     grey700: '#646C80',
     grey800: '#4B5160',
     grey900: '#323640',
     grey950: '#232630',
     /* Purple */
     purple100: '#ECE6FF',
     purple900: '#4512B4',
     /* Yellow */
     yellow100: '#FFF3D4',
     yellow900: '#6E5000',
     /* Green */
     green100: '#DFF9F6',
     green900: '#00596C',
     /* Utilty */
     black: '#000000',
     white: '#FFFFFF',
     red: '#C82438',
     bg: '#F3F4F7',
     pink: 'rgb(252 231 243)',
     lime: 'rgb(236 252 203)',
     amber: 'rgb(254 243 199)',
     brown: 'rgb(154 52 18)',
     stone: 'rgb(120 113 108)',
     cyan: 'rgb(14 116 144)'
    },
    extend: {}
  },
  plugins: [require("daisyui")],
}


