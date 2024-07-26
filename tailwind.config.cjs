/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screen: {
      sm: "480px",
      bmd: "600px",
      md: "768px",
      lg: "900px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sharpGrotesk: ['"Sharp Grotesk"', 'sans-serif'],
      },
      colors: {
        lightShade: "#e9e4d4",
        // lightShade: "#C3B091",
        darkShade: "#212121",
        faded: "#959492",
        button: "#1f456e",
        playground: "#E0E0E0",
        transluscent: "#2c2c2c",
        opaque: "#B8B8B8",
        yellowBg: "#ffdd8b"
      },
      backgroundImage: {
        'landing-image': "url('https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
      backgroundPosition: {
        'center-10vh': 'center -10vh',
        'center-20vh': 'center -20vh',
        'center-30vh': 'center -30vh',
        'center-40vh': 'center -40vh',
      },
    },
  },
  plugins: [],
};
