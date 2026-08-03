import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'vendor-framer';
            }
            if (id.includes('@heroui')) {
              return 'vendor-heroui';
            }
            if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            }
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
