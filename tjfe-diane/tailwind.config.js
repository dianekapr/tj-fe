module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003DA5',
          light: '#3D6DD1',
        },
        accent: {
          DEFAULT: '#DA291C',
          light: '#E53E3E',
        },
        secondary: {
          DEFAULT: '#00A5B8',
          light: '#00C4D9',
        },
        neutral: {
          dark: '#2D3748',
          medium: '#4A5568',
          light: '#E2E8F0',
        },
        status: {
          success: '#38A169',
          warning: '#D69E2E',
          alert: '#DD6B20',
        },
      },
    },
  },
  plugins: [],
};
