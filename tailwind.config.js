/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./App.jsx",
    "./App.css"
  ],
  safelist: [
    'animate-float',
    'animate-float-slow', 
    'animate-fade-in-out',
    'animate-float-words',
    'backdrop-blur-xl',
    'bg-slate-50',
    'bg-gradient-to-br',
    'from-slate-50',
    'via-blue-50/30',
    'to-indigo-50/50',
    'text-slate-400',
    'text-blue-300/40',
    'text-indigo-300/40',
    'text-slate-400/50',
    'text-blue-400/40',
    'text-indigo-400/45',
    'text-slate-500/40',
    'text-blue-300/35',
    'text-indigo-300/50',
    'text-slate-400/45',
    'text-indigo-400/40',
    'text-slate-500/45',
    'text-indigo-300/45',
    'text-slate-500/35',
    'from-blue-200/20',
    'to-indigo-300/20',
    'blur-xl',
    'transform',
    'rotate-3',
    'rotate-6',
    'rotate-12',
    '-rotate-3',
    '-rotate-6',
    '-rotate-12',
    'rotate-8',
    '-rotate-8',
    'rotate-15',
    '-rotate-15',
    'rotate-10',
    '-rotate-10',
    'rotate-5',
    '-rotate-5',
    'rotate-7',
    '-rotate-7',
    'rotate-9',
    '-rotate-9',
    'rotate-4',
    '-rotate-4',
    'pointer-events-none'
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-in-out': 'fade-in-out 8s ease-in-out infinite',
        'float-words': 'float-words 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-30px) translateX(20px)' },
          '66%': { transform: 'translateY(10px) translateX(-15px)' }
        },
        'fade-in-out': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.8)' },
          '20%': { opacity: '0.7', transform: 'translateY(-10px) scale(1.1)' },
          '50%': { opacity: '0.9', transform: 'translateY(-20px) scale(1)' },
          '80%': { opacity: '0.6', transform: 'translateY(-15px) scale(0.95)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(0.8)' }
        },
        'float-words': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}