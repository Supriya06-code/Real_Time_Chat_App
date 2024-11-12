// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//     proxy:{
//       '/api':{
//         target:'http://localhost:3000',
//         secure:false
//       }
//     }
//   }
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'frontend/dist',  // Specify the build output folder
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy for API requests to backend
        secure: false,
      },
    },
  },
});
