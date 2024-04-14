/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5A32EA',
        'background': '#bg-[#F5F6F8]',
        'signin-btn' : "#FF9540"
      },
      fontWeight: {
        'md': 700
      }
    },
  },
  plugins: [],
}

