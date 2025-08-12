import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,  // Desabilita minificação para teste
    sourcemap: false,
    rollupOptions: {
      external: ['@/components/ui/toaster'],
    },
  }
})
