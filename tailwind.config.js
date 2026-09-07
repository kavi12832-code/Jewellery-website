/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#060403',
          900: '#0D0906',
          850: '#110C08',
          800: '#150F0A',
          700: '#231812',
          600: '#3A281E',
          500: '#533B2D',
        },
        gold: {
          50: '#FAF6E9',
          100: '#F3E8C4',
          200: '#E7D18C',
          300: '#DCBD59',
          400: '#D2AB3B',
          500: '#C9A227', // 24k signature warm gold
          600: '#A9841B',
          700: '#866514',
          800: '#63470D',
          900: '#432E08',
        },
        champagne: {
          50: '#FCF9F6',
          100: '#F7F0E8',
          200: '#EEDFCC',
          300: '#E8C9A0', // signature champagne rose
          400: '#DEB37E',
          500: '#CE9A5E',
        },
        ruby: {
          400: '#9C2738',
          500: '#7A1F2B', // signature ruby accent
          600: '#5F1420',
          700: '#450D15',
          800: '#2F080D',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A227 0%, #E8C9A0 50%, #C9A227 100%)',
        'gold-subtle': 'linear-gradient(135deg, rgba(201,162,39,0.15) 0%, rgba(232,201,160,0.05) 50%, rgba(201,162,39,0.15) 100%)',
        'gold-border': 'linear-gradient(90deg, rgba(201,162,39,0.1) 0%, rgba(201,162,39,0.8) 50%, rgba(201,162,39,0.1) 100%)',
        'luxury-vignette': 'radial-gradient(ellipse at center, rgba(21,15,10,0.4) 0%, rgba(13,9,6,0.95) 80%, rgba(13,9,6,1) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(201, 162, 39, 0.25)',
        'gold-glow-lg': '0 0 60px -10px rgba(201, 162, 39, 0.35)',
        'ruby-glow': '0 0 45px -5px rgba(122, 31, 43, 0.4)',
        'luxury-card': '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(201, 162, 39, 0.12)',
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'super-wide': '0.5em',
      }
    },
  },
  plugins: [],
};
