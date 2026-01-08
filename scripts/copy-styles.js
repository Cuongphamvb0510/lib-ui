import { readdir, mkdir, copyFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const srcStylesDir = join(rootDir, 'src', 'styles');
const distStylesDir = join(rootDir, 'dist', 'styles');

async function copyStyles() {
  try {
    // Tạo thư mục dist/styles nếu chưa có
    await mkdir(distStylesDir, { recursive: true });

    // Đọc tất cả files trong src/styles
    const files = await readdir(srcStylesDir);

    // Copy từng file
    for (const file of files) {
      const srcPath = join(srcStylesDir, file);
      const distPath = join(distStylesDir, file);
      
      const stats = await stat(srcPath);
      if (stats.isFile() && file.endsWith('.scss')) {
        await copyFile(srcPath, distPath);
        console.log(`✓ Copied ${file} to dist/styles/`);
      }
    }

    console.log('✓ All SCSS files copied successfully!');
  } catch (error) {
    console.error('Error copying styles:', error);
    process.exit(1);
  }
}

copyStyles();

