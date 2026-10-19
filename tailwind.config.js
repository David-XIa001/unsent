/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#0b0f19',
          800: '#111827',
          700: '#1f293d',
        },
        aurora: {
          blue: '#38bdf8',
          purple: '#c084fc',
          orange: '#fb923c',
          green: '#34d399',
          rose: '#fb7185',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px currentColor)' },
          '100%': { filter: 'drop-shadow(0 0 16px currentColor)' },
        }
      }
    },
  },
  plugins: [],
}
