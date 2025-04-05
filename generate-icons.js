import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const ICONS_DIR = path.join(__dirname, 'public', 'icons');

// Create the icons directory if it doesn't exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// Generate icons for each size
ICON_SIZES.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill with dark background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);
  
  // Draw a comic book style border
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = Math.max(2, size / 30);
  ctx.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);
  
  // Add some text
  const fontSize = Math.floor(size / 5);
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CV', size / 2, size / 2);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(ICONS_DIR, `icon-${size}x${size}.png`), buffer);
  
  console.log(`Created icon: ${size}x${size}`);
});

console.log('All icons generated successfully!');
