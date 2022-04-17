module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#00a9e9",
        
"secondary": "#00a9e9",
        
"accent": "#eaf78a",
        
"neutral": "#d1d5db",
          
"base-100": "#f3f4f6",
        
"info": "#5DBBDA",
        
"success": "#30D9C5",
        
"warning": "#FCD92C",
        
"error": "#DB2442",
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
