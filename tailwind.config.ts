import type { Config } from 'tailwindcss'

const config = {
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
        },
        heading: {
          text: 'var(--heading-text)',
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
    },
  },
} satisfies Config

export default config
