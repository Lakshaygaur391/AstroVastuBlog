/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Professional Navy Blue & White theme
        navy: {
          950: '#060D17',
          900: '#0B192C',
          850: '#112238',
          800: '#1E2E45',
          700: '#1E3E62',
          600: '#205295',
          500: '#2563EB',
          200: '#CBDCEE',
          100: '#E8EEF5',
          50: '#F4F7FB',
        },
        // Refined champagne gold accent
        gold: {
          DEFAULT: '#C5A059',
          light: '#D8B572',
          dark: '#9F7C32',
          pale: '#FBF8F2',
        },
        // Light warm/clean neutrals
        ivory: {
          DEFAULT: '#F8FAFC',
          dark: '#F1F5F9',
          darker: '#E2E8F0',
        },
        charcoal: {
          DEFAULT: '#0F172A',
          light: '#334155',
          muted: '#64748B',
        },
        warm: {
          border: '#E2E8F0',
          surface: '#F8FAFC',
          text: '#0F172A',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        navy: '0 4px 20px rgba(11, 25, 44, 0.08)',
        'navy-md': '0 8px 30px rgba(11, 25, 44, 0.12)',
        'navy-lg': '0 12px 45px rgba(11, 25, 44, 0.16)',
        card: '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
