import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: 'mgx',
    }),
    react(),
  ],
  server: {
    watch: { usePolling: true, interval: 800 /* 300~1500 */ },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Explicitly configure public directory to ensure assets are copied
  publicDir: 'public',
  build: {
    // Assets from imports (JS/CSS) go to assets folder
    assetsDir: 'assets',
    // Ensure public directory is copied (this is default, but being explicit)
    copyPublicDir: true,
  },
}));

