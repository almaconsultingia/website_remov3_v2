import { existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const publicDir = join(process.cwd(), 'public');

function checkFile(filePath, expectedSize) {
  if (!existsSync(filePath)) {
    console.error(`❌ Missing: ${filePath}`);
    return false;
  }
  
  const stats = statSync(filePath);
  if (stats.size === 0) {
    console.error(`❌ Empty file: ${filePath}`);
    return false;
  }
  
  if (expectedSize && stats.size !== expectedSize) {
    console.warn(`⚠️  Size mismatch: ${filePath} (expected ${expectedSize}, got ${stats.size})`);
  }
  
  console.log(`✅ ${filePath} (${stats.size} bytes)`);
  return true;
}

function checkDirectory(srcDir, destDir, basePath = '') {
  if (!existsSync(srcDir)) {
    return true; // Source doesn't exist, skip
  }
  
  const entries = readdirSync(srcDir, { withFileTypes: true });
  let allOk = true;
  
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);
    const relativePath = join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      if (!checkDirectory(srcPath, destPath, relativePath)) {
        allOk = false;
      }
    } else {
      const srcStats = statSync(srcPath);
      if (!checkFile(destPath, srcStats.size)) {
        allOk = false;
      }
    }
  }
  
  return allOk;
}

console.log('🔍 Verifying build output...\n');

// Check critical files
const criticalFiles = [
  'dist/images/quien-soc-2.jpeg',
  'dist/assets/hero.mp4',
  'dist/assets/fisio.jpg',
];

let allOk = true;
for (const file of criticalFiles) {
  const filePath = join(process.cwd(), file);
  if (!checkFile(filePath)) {
    allOk = false;
  }
}

// Check all public files
console.log('\n📁 Checking all public files...\n');
if (!checkDirectory(publicDir, distDir)) {
  allOk = false;
}

if (allOk) {
  console.log('\n✅ All files verified successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Build verification failed!');
  process.exit(1);
}

