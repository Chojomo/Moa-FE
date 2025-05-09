import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

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
        inverse: 'var(--inverse)',
        black: 'var(--black)',
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
          DEFAULT: 'var(--white)',
          active: 'var(--white-active)',
        },
        preview: {
          bg: 'var(--preview-bg)',
          nav: 'var(--preview-nav)',
          heading: 'var(--preview-heading)',
          blockquote: 'var(--preview-blockquote)',
        },
        container: {
          bg: 'var(--container-bg)',
        },
        modal: {
          bg: 'var(--modal-bg)',
          input: 'var(--modal-input)',
          button: 'var(--modal-button)',
          text: 'var(--modal-text)',
        },
        nonActive: {
          text: 'var(--nonActive-text)',
        },
        toggle: {
          bg: 'var(--toggle-bg)',
        },
        banner: {
          bg: 'var(--banner-bg)',
        },
        sort: {
          bg: 'var(--sort-bg)',
        },
        soft: {
          bg: 'var(--soft-bg)',
        },
        tooltip: {
          bg: 'var(--tooltip-bg)',
        },
        suika: {
          bg: 'var(--suika-bg)',
        },
        canvas: {
          bg: 'var(--canvas-bg)',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        resetL: {
          '0%': {
            transform: 'rotate(var(--tw-rotate))',
            top: '40px',
            left: '100px',
          },
          '100%': {
            transform: 'rotate(0deg)',
            top: '0px',
            left: '0px',
          },
        },
        resetR: {
          '0%': {
            transform: 'rotate(var(--tw-rotate))',
            top: '40px',
            right: '100px',
          },
          '100%': {
            transform: 'rotate(0deg)',
            top: '0px',
            right: '0px',
          },
        },
        resetT: {
          '0%': {
            top: '100px',
          },
          '100%': {
            top: '0px',
          },
        },
        resetB: {
          '0%': {
            bottom: '100px',
          },
          '100%': {
            bottom: '0px',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0.7',
            transform: 'translateY(5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fade: {
          '0%': {
            opacity: '0.3',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeUp: {
          '0%': {
            opacity: '0.3',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        customBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shake: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(60deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        slideDown: {
          '0%': { maxHeight: '0px', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1s linear infinite',
        slideLeft: 'slideLeft 20s linear infinite',
        float: 'float 2.5s ease-in-out infinite',
        floatL1: 'float2 2.3s ease-in-out infinite',
        resetL: 'resetL 1s 0.2s ease-out forwards',
        resetR: 'resetR 1s 0.2s ease-out forwards',
        resetT: 'resetT 1s 0.2s ease-out forwards',
        resetB: 'resetB 1s 0.2s ease-out forwards',
        fade: 'fade 1s ease-in-out',
        fadeFast: 'fade 0.2s ease',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeUp: 'fadeUp 1s ease-in-out',
        fadeSlow: 'fadeUp 3s ease-in-out',
        customBounce: 'customBounce 0.8s ease',
        shake: 'shake 1.5s ease-in-out infinite',
        slideDown: 'slideDown 0.3s ease-in-out',
        spin: 'spin 50s linear infinite',
        spinList: 'spin 5s linear infinite',
      },
      boxShadow: {
        tooltip: '2px 6px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.12)',
        button: '1px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      rotate: {
        '-8': '-8deg',
        '8': '8deg',
      },
    },
    backgroundImage: {
      'gradient-to-b': 'linear-gradient(0deg, #f5f1c4, #cfa76f, #a0633b)',
    },
  },
  plugins: [tailwindcssAnimate, typography],
  safelist: ['ReactModal__Overlay', 'ReactModal__Content'],
}

export default config
