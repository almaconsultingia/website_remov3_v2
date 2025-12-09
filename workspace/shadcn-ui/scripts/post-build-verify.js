import { existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

console.log('🔍 Post-build verification...\n');
console.log(`Dist directory: ${distDir}\n`);

// Check critical image files
const criticalFiles = [
  'images/quien-soc-2.jpeg',
  'assets/hero.mp4',
  'assets/fisio.jpg',
];

let allOk = true;

for (const file of criticalFiles) {
  const filePath = join(distDir, file);
  if (!existsSync(filePath)) {
    console.error(`❌ Missing: ${file}`);
    allOk = false;
  } else {
    const stats = statSync(filePath);
    if (stats.size === 0) {
      console.error(`❌ Empty file: ${file} (0 bytes)`);
      allOk = false;
    } else {
      console.log(`✅ ${file} (${stats.size} bytes)`);
    }
  }
}

// Check directories exist
const dirs = ['images', 'assets'];
for (const dir of dirs) {
  const dirPath = join(distDir, dir);
  if (existsSync(dirPath)) {
    const files = readdirSync(dirPath);
    console.log(`\n📁 ${dir}/ contains ${files.length} files:`);
    files.forEach(file => {
      const filePath = join(dirPath, file);
      const stats = statSync(filePath);
      console.log(`   ${file}: ${stats.size} bytes`);
      if (stats.size === 0) {
        console.error(`   ⚠️  WARNING: ${file} is empty!`);
        allOk = false;
      }
    });
  } else {
    console.error(`❌ Directory missing: ${dir}/`);
    allOk = false;
  }
}

if (allOk) {
  console.log('\n✅ All files verified successfully!');
  process.exit(0);
} else {
  console.error('\n❌ Verification failed! Some files are missing or empty.');
  process.exit(1);
}

