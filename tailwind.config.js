/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
         
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
      },
      colors: {
        primaryText: '#1C1C1C',
        secondaryText: '#6B7280',
        buttonText: '#374151',
        appBg: '#EFEFEF',
        sectionBg: '#F5F5F5',
        tableHeaderBg: 'rgba(28, 28, 28, 0.05)',
        buttonPrimary: '#1C1C1C',
        stroke: {
          whiteBg: '#6B7280',
          greyBg: 'rgba(28, 28, 28, 0.2)',
          lightGreyBg: 'rgba(28, 28, 28, 0.1)',
        },
        success: {
          text: '#15803D',
          bg: '#DCFCE7',
        },
        outOfPolicy: {
          text: '#5A189A',
          bg: '#E4C7F5',
        },
        warning: {
          text: '#B91C1C',
          bg: '#FEE2E2',
        },
      },
      fontSize: {
        'heading-1': ['28px', { lineHeight: '36px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'heading-2': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading-3': ['20px', { lineHeight: '28px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'label-1-medium': ['16px', { lineHeight: '18px', letterSpacing: '0em', fontWeight: '500' }],
        'label-1-semibold': ['16px', { lineHeight: '18px', letterSpacing: '0em', fontWeight: '600' }],
        'label-2-medium': ['14px', { lineHeight: '16px', letterSpacing: '0em', fontWeight: '500' }],
        'label-3-medium': ['12px', { lineHeight: '14px', letterSpacing: '0em', fontWeight: '500' }],
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      opacity: {
        80: '0.8',
        40: '0.4',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
