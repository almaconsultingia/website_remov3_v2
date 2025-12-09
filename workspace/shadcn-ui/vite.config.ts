// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import path from 'path';
// import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
// import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';

// // Plugin to ensure public files are copied correctly
// function ensurePublicAssets() {
//   return {
//     name: 'ensure-public-assets',
//     writeBundle() {
//       const publicDir = path.resolve(__dirname, 'public');
//       const distDir = path.resolve(__dirname, 'dist');
      
//       console.log('[ensure-public-assets] Starting file copy...');
//       console.log(`[ensure-public-assets] Public dir: ${publicDir}`);
//       console.log(`[ensure-public-assets] Dist dir: ${distDir}`);
      
//       if (!existsSync(publicDir)) {
//         console.warn('[ensure-public-assets] Public directory does not exist!');
//         return;
//       }
      
//       if (!existsSync(distDir)) {
//         console.warn('[ensure-public-assets] Dist directory does not exist! Creating...');
//         mkdirSync(distDir, { recursive: true });
//       }
      
//       let copiedCount = 0;
//       let skippedCount = 0;
      
//       function copyRecursive(src: string, dest: string) {
//         const entries = readdirSync(src, { withFileTypes: true });
        
//         for (const entry of entries) {
//           const srcPath = path.join(src, entry.name);
//           const destPath = path.join(dest, entry.name);
          
//           if (entry.isDirectory()) {
//             if (!existsSync(destPath)) {
//               mkdirSync(destPath, { recursive: true });
//             }
//             copyRecursive(srcPath, destPath);
//           } else {
//             const srcStats = statSync(srcPath);
//             const needsCopy = !existsSync(destPath) || statSync(destPath).size !== srcStats.size;
            
//             if (needsCopy) {
//               copyFileSync(srcPath, destPath);
//               copiedCount++;
//               console.log(`[ensure-public-assets] Copied: ${path.relative(process.cwd(), destPath)} (${srcStats.size} bytes)`);
//             } else {
//               skippedCount++;
//             }
//           }
//         }
//       }
      
//       copyRecursive(publicDir, distDir);
//       console.log(`[ensure-public-assets] Complete! Copied: ${copiedCount}, Skipped: ${skippedCount}`);
//     },
//   };
// }

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   plugins: [
//     viteSourceLocator({
//       prefix: 'mgx',
//     }),
//     react(),
//     ensurePublicAssets(),
//   ],
//   server: {
//     watch: { usePolling: true, interval: 800 /* 300~1500 */ },
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   // Explicitly configure public directory to ensure assets are copied
//   publicDir: 'public',
//   build: {
//     // Assets from imports (JS/CSS) go to assets folder
//     assetsDir: 'assets',
//     // Ensure public directory is copied (this is default, but being explicit)
//     copyPublicDir: true,
//   },
// }));

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
}));