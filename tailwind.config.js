/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f2937',
          hover: '#111827',
          light: '#374151',
          dark: '#0f172a',
        },
        secondary: {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          dark: '#475569',
        },
        accent: {
          DEFAULT: '#ff9f1c',
          light: '#ffb347',
          dark: '#cc7a00',
        },
        success: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#15803d',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#b91c1c',
        },
        warning: {
          DEFAULT: '#facc15',
          light: '#fde047',
          dark: '#ca8a04',
        },
        info: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0369a1',
        },
        background: {
          DEFAULT: '#f8fafc',
          dark: '#1e293b',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#111827',
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#334155',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          tertiary: '#718096',
          inverted: '#ffffff',
        },
        muted: '#f1f5f9',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 15px 25px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
      },
      transitionTimingFunction: {
        ease: 'ease',
        'ease-in': 'ease-in',
        'ease-out': 'ease-out',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '2rem',
        },
      },
    },
  },
  plugins: [],
}
