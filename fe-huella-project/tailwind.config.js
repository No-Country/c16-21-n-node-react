/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      
      colors:{
        'blue-buttons':"#2589bd",
        'orange-huella': "#fd7e14",
     

      }
      
    },
    
    container:{padding :'2rem'},
  
  },
  plugins: [],
  
  
  


}

