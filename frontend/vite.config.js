import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://atu-karigari.onrender.com',
        changeOrigin: true,
        secure: true,
        // Remove the rewrite line so /api stays in path
        // rewrite: (path) => path.replace(/^\/api/, ''), // ❌ Remove this
      },
    },
  },
});
