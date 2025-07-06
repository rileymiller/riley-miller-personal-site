/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'glass': {
          'dark': 'rgba(20, 20, 20, 0.7)',
          'darker': 'rgba(30, 30, 30, 0.8)',
          'border': 'rgba(255, 255, 255, 0.1)',
        },
        'primary': '#3b82f6',
        'secondary': '#60a5fa',
        'gold': {
          'DEFAULT': '#FFD700',
          'light': '#FFE55C',
          'dark': '#B8860B',
        },
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}