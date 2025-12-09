import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';

// Plugin to ensure public files are copied correctly
function ensurePublicAssets() {
  return {
    name: 'ensure-public-assets',
    writeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const distDir = path.resolve(__dirname, 'dist');
      
      if (!existsSync(publicDir)) return;
      
      function copyRecursive(src: string, dest: string) {
        const entries = readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            if (!existsSync(destPath)) {
              mkdirSync(destPath, { recursive: true });
            }
            copyRecursive(srcPath, destPath);
          } else {
            // Only copy if file doesn't exist or is different
            if (!existsSync(destPath) || statSync(srcPath).size !== statSync(destPath).size) {
              copyFileSync(srcPath, destPath);
            }
          }
        }
      }
      
      copyRecursive(publicDir, distDir);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: 'mgx',
    }),
    react(),
    ensurePublicAssets(),
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

