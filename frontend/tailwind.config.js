/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: 
  {

    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '0.5':'0.5px',
      '1':'1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '850px',
      // => @media (min-width: 850px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... },
      '3xl': '1800px'
    },

    extend: {
      borderRadius: {
      '4xl':"3rem"
      },
      colors: {
        green:{
          25: "#5BA547",
          50: "#9fb12a",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          650: "#74966C",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
  
        },
      },
      boxShadow: {
        '3xl': '-10px 28px 32px 4px rgba(0, 0, 0, 0.3)',
      },
      transitionProperty: {
        'border':"border",
        'scale':"scale"
      },
      height: {
        '108': '36rem',
        '116': '42rem',
        '128': '50rem',
        '140': '60rem',
        '160':'70rem'
      },
      spacing: {
        '0.25':'1px',
        '22px':'22px',
        '66px':'66px',
        '90':'22rem',
        '98':'26rem',
        '100':'28rem',
        '108': '36rem',
        '128': '44rem',
        '140': '46rem',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '16': '16px',
        '20':'20px',
        '80':'80px',
        '40':'40px'
      },
      scale: {
        '10': '0.10',
        '20': '0.20',
        '30': '0.30',
        '40': '0.40',
        '60': '0.60',
        '70': '0.70',
        '80': '0.80',
        '90': '0.90',
        '120': '1.20',
        '175':'1.75',
        '500':'5.00',
      },
      fontSize: {
        xxxs: ['7px','9px'],
        xxs: ['9px','12px'],
        xs: ['12px','16px'],
        sm: ['14px', '20px'],
        md: ['15px', '23px'],
        lg: ['19px', '27px'],
        xl: ['24px', '32px'],
      },
      fontFamily: {
        'nuno': ['Noto Sans', 'sans-serif']
      }
    },
  }
}