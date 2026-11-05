/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F5F2',
          100: '#DCE7E1',
          200: '#BAD0C3',
          300: '#90B3A0',
          400: '#64927C',
          500: '#3D7159',
          600: '#2A5540',
          DEFAULT: '#183D2B', // Primary Forest Green
          700: '#183D2B',
          800: '#122E20',
          900: '#0C1E15',
          950: '#07110C',
        },
        botanical: {
          50: '#F3F7F4',
          100: '#E4EDE7',
          200: '#C9DCD0',
          300: '#A4C3B0',
          400: '#75A487',
          500: '#4E8362',
          DEFAULT: '#315B40', // Botanical Green
          600: '#315B40',
          700: '#264832',
          800: '#1F3A29',
          900: '#1A3022',
        },
        sage: {
          50: '#F5F7F4',
          100: '#E9EFE7',
          200: '#D5E1D2',
          300: '#BDCFB8',
          DEFAULT: '#A3B89B', // Sage Green
          400: '#A3B89B',
          500: '#869F7D',
          600: '#688060',
          700: '#52654B',
          800: '#42513D',
          900: '#384334',
        },
        cream: {
          50: '#FDFAF5',
          DEFAULT: '#F5F1E7', // Cream
          100: '#F5F1E7',
          200: '#EAE2D1',
          300: '#DFD3BB',
          400: '#CEBC95',
          500: '#B69E6E',
        },
        offwhite: '#FCFBF7', // Off White
        earth: {
          50: '#F8F5F2',
          100: '#EFEAE3',
          200: '#DFD3C6',
          300: '#C9B6A3',
          400: '#B0957D',
          DEFAULT: '#8A674B', // Earth Brown
          500: '#8A674B',
          600: '#735239',
          700: '#5C3F2B',
          800: '#4B3323',
          900: '#3F2C1F',
        },
        charcoal: {
          50: '#F6F7F6',
          100: '#E7E9E7',
          200: '#CED2CE',
          300: '#AAB0AA',
          400: '#7E877E',
          500: '#5C655C',
          600: '#424942',
          DEFAULT: '#252A25', // Charcoal
          700: '#252A25',
          800: '#1C201C',
          900: '#141714',
          950: '#0B0D0B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(24, 61, 43, 0.04)',
        'elevated': '0 8px 30px rgba(24, 61, 43, 0.08)',
        'floating': '0 20px 45px rgba(24, 61, 43, 0.12)',
        'inner-warm': 'inset 0 2px 4px rgba(138, 103, 75, 0.06)',
      },
      borderRadius: {
        'editorial': '2px',
        'organic': '16px',
        'leaf': '24px 4px 24px 4px',
        'pill': '9999px',
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tighter': '-0.02em',
        'editorial': '0.04em',
        'widest-editorial': '0.15em',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}

