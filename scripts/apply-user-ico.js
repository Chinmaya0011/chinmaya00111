const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function applyUserIcon() {
  const uploadedIcoPath = 'C:/Users/imchi/.gemini/antigravity/brain/72344114-c1a1-4e65-be5f-496b2dbff553/.user_uploaded/media_1794633267803_7eb569c2.ico';
  const publicDir = path.resolve('public');
  const targetFaviconIco = path.join(publicDir, 'favicon.ico');

  // 1. Copy exact .ico file
  fs.copyFileSync(uploadedIcoPath, targetFaviconIco);
  console.log(`Copied user .ico directly to ${targetFaviconIco} (${fs.statSync(targetFaviconIco).size} bytes)`);

  // 2. Load the raw extracted PNG to generate all PNG sizes with sharp
  const rawPngPath = path.join(publicDir, 'user-icon-raw.png');
  if (!fs.existsSync(rawPngPath)) {
    throw new Error('user-icon-raw.png not found');
  }

  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'icon.png', size: 32 },
    { name: 'apple-icon.png', size: 180 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const dest = path.join(publicDir, name);
    await sharp(rawPngPath)
      .resize(size, size, { fit: 'cover', position: 'top' })
      .png({ quality: 95 })
      .toFile(dest);
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // Clean up temporary test files
  const cleanup = ['test-cover-top.png', 'test-cover-center.png', 'user-icon-raw.png'];
  for (const f of cleanup) {
    const fp = path.join(publicDir, f);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }

  console.log('User icon applied across all favicon and mobile touch targets successfully!');
}

applyUserIcon().catch(err => {
  console.error('Error applying user icon:', err);
  process.exit(1);
});
