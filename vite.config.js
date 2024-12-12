import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Supprimez ou commentez cette ligne si elle pose problème
      allow: ['./'], // Par défaut, autorise tout dans le projet actuel
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias optionnel
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Optimisation du build
        },
      },
    },
  },
});