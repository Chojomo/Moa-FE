import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        icon: {
          bg: 'var(--icon-bg)',
          normal: 'var(--icon-normal)',
        },
        btn: {
          bg: 'var(--btn-bg)',
          red: 'var(--btn-red)',
        },
        nav: {
          bg: 'var(--nav-bg)',
          border: 'var(--nav-border)',
        },
        heading: {
          text: 'var(--heading-text)',
          bg: 'var(--heading-bg)',
        },
        body: {
          text: 'var(--body-text)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          normal: 'var(--accent-normal)',
        },
        border: 'var(--border)',
        main: {
          blue: 'var(--main-blue)',
        },
        white: {
          active: 'var(--white-active)',
        },
      },
      keyframes: {
        shimmer: {
          '0%': {
            backgroundPosition: '100%',
          },
          '100%': {
            backgroundPosition: '-200%',
          },
        },
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1s linear infinite',
        marquee: 'marquee 200s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        tooltip: '2px 6px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
