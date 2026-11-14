const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Create Editorial OpenGraph Image SVG (1200 x 630)
function createOgSvg(photoBase64) {
  const width = 1200;
  const height = 630;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="avatar-clip">
      <rect x="760" y="70" width="370" height="490" rx="24" />
    </clipPath>
  </defs>

  <!-- Editorial Warm Canvas Background -->
  <rect width="${width}" height="${height}" fill="#FAF9F6"/>

  <!-- Subtle grid lines -->
  <line x1="70" y1="0" x2="70" y2="${height}" stroke="#E7E5E0" stroke-width="1" />
  <line x1="${width - 70}" y1="0" x2="${width - 70}" y2="${height}" stroke="#E7E5E0" stroke-width="1" />
  <line x1="0" y1="70" x2="${width}" y2="70" stroke="#E7E5E0" stroke-width="1" />
  <line x1="0" y1="${height - 70}" x2="${width}" y2="${height - 70}" stroke="#E7E5E0" stroke-width="1" />

  <!-- Inner Card Frame -->
  <rect x="70" y="70" width="1060" height="490" rx="20" fill="#FFFFFF" stroke="#E7E5E0" stroke-width="1.5"/>

  <!-- Left Content Column -->
  <!-- Top Badge -->
  <g transform="translate(120, 115)">
    <rect width="44" height="44" rx="10" fill="#171717"/>
    <text x="7" y="31" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" letter-spacing="-1">C<tspan fill="#365CF5">M</tspan></text>
    
    <g transform="translate(56, 12)">
      <circle cx="6" cy="10" r="4" fill="#365CF5" />
      <text x="18" y="14" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#365CF5" letter-spacing="1.5">
        FULL-STACK DEVELOPER // APPLICATION SECURITY
      </text>
    </g>
  </g>

  <!-- Name -->
  <text x="120" y="225" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#171717" letter-spacing="-1">
    Chinmaya Kumar Mishra
  </text>

  <!-- Professional Title -->
  <text x="120" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#365CF5">
    Full-Stack Developer | Application Security Engineer
  </text>

  <!-- Tagline -->
  <text x="120" y="325" font-family="Georgia, serif" font-style="italic" font-size="24" fill="#171717">
    &#8220;Building Software. Securing Systems.&#8221;
  </text>

  <!-- Bio Summary -->
  <text x="120" y="375" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#666666">
    High-performance web applications, secure APIs, and AI integrations
  </text>
  <text x="120" y="402" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#666666">
    engineered with an adversarial security mindset.
  </text>

  <!-- Divider -->
  <line x1="120" y1="440" x2="690" y2="440" stroke="#E7E5E0" stroke-width="1.5"/>

  <!-- Footer Metadata -->
  <g transform="translate(120, 480)">
    <text font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600" fill="#171717">
      www.chinmayakumarmishra.sbs
    </text>
    <text x="240" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="500" fill="#666666">
      •  Odisha, India  •  github.com/chinmaya0011
    </text>
  </g>

  <!-- Right Side Photo Card -->
  <g>
    <!-- Photo with clipPath -->
    ${photoBase64 ? `<image href="${photoBase64}" x="760" y="70" width="370" height="490" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar-clip)" />` : ''}
    
    <!-- Photo Border Overlay -->
    <rect x="760" y="70" width="370" height="490" rx="20" fill="none" stroke="#E7E5E0" stroke-width="2"/>

    <!-- Photo Floating Location Badge -->
    <g transform="translate(780, 500)">
      <rect width="180" height="38" rx="10" fill="#171717" fill-opacity="0.9" />
      <circle cx="18" cy="19" r="4" fill="#365CF5" />
      <text x="32" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF">
        Odisha, India
      </text>
    </g>
  </g>

</svg>`;
}

// 2. Create Multi-Resolution ICO buffer
function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4);

  let offset = 6 + (16 * pngBuffers.length);
  const dirEntries = [];

  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function buildAll() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDir = path.join(publicDir, 'images');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  const sourceIconPath = path.join(publicDir, 'chinmaya.png');
  if (!fs.existsSync(sourceIconPath)) {
    throw new Error(`Source icon ${sourceIconPath} not found!`);
  }

  console.log(`Loading source image: ${sourceIconPath}...`);
  const sourceBuffer = fs.readFileSync(sourceIconPath);

  console.log('Generating crisp multi-resolution favicons and touch icons...');
  
  // Icon sizes needed across standard browsers, Google search, Apple iOS, and Android PWA
  const png16 = await sharp(sourceBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(sourceBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(sourceBuffer).resize(48, 48).png().toBuffer();
  const png96 = await sharp(sourceBuffer).resize(96, 96).png().toBuffer();
  const png180 = await sharp(sourceBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(sourceBuffer).resize(192, 192).png().toBuffer();
  const png256 = await sharp(sourceBuffer).resize(256, 256).png().toBuffer();
  const png512 = await sharp(sourceBuffer).resize(512, 512).png().toBuffer();

  // 1. Multi-Resolution ICO containing 16x16, 32x32, 48x48, and 256x256
  const icoBuffer = createIco([
    { buffer: png16, size: 16 },
    { buffer: png32, size: 32 },
    { buffer: png48, size: 48 },
    { buffer: png256, size: 256 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`Saved favicon.ico (${icoBuffer.length} bytes, 4 resolutions)`);

  // 2. Individual PNG favicons and app icons
  const iconFiles = [
    { name: 'favicon-16x16.png', buffer: png16 },
    { name: 'favicon-32x32.png', buffer: png32 },
    { name: 'icon.png', buffer: png32 },
    { name: 'favicon-48x48.png', buffer: png48 },
    { name: 'favicon-96x96.png', buffer: png96 },
    { name: 'apple-icon.png', buffer: png180 },
    { name: 'apple-touch-icon.png', buffer: png180 },
    { name: 'icon-192.png', buffer: png192 },
    { name: 'android-chrome-192x192.png', buffer: png192 },
    { name: 'icon-512.png', buffer: png512 },
    { name: 'android-chrome-512x512.png', buffer: png512 },
  ];

  for (const { name, buffer } of iconFiles) {
    fs.writeFileSync(path.join(publicDir, name), buffer);
    console.log(`Saved ${name} (${buffer.length} bytes)`);
  }

  // 3. Update optimized profile image in public/images/chinmaya.jpg and public/chinmaya.jpg
  const oldPhotoPath = path.join(imagesDir, 'chinmaya.jpg');
  const backupBikePath = path.join(imagesDir, 'chinmaya-bike.jpg');
  if (fs.existsSync(oldPhotoPath) && !fs.existsSync(backupBikePath)) {
    fs.copyFileSync(oldPhotoPath, backupBikePath);
    console.log(`Backed up previous photo to ${backupBikePath}`);
  }

  const optimizedPhotoJpeg = await sharp(sourceBuffer)
    .resize(1024, 1024, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(path.join(imagesDir, 'chinmaya.jpg'), optimizedPhotoJpeg);
  console.log(`Updated public/images/chinmaya.jpg (${optimizedPhotoJpeg.length} bytes)`);

  fs.writeFileSync(path.join(publicDir, 'chinmaya.jpg'), optimizedPhotoJpeg);
  console.log(`Restored/Updated public/chinmaya.jpg (${optimizedPhotoJpeg.length} bytes)`);

  // Ensure public/images/chinmaya.png is synchronized for src="/images/chinmaya.png"
  const destImagesPng = path.join(imagesDir, 'chinmaya.png');
  fs.copyFileSync(sourceIconPath, destImagesPng);
  console.log(`Synced public/images/chinmaya.png (${fs.statSync(destImagesPng).size} bytes)`);

  // 4. Generate Editorial OpenGraph Image (1200x630)
  console.log('Generating Editorial OpenGraph Image (1200x630)...');
  const ogPhotoBuffer = await sharp(sourceBuffer)
    .resize(400, 530, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 92 })
    .toBuffer();
  const photoDataUri = `data:image/jpeg;base64,${ogPhotoBuffer.toString('base64')}`;

  const ogSvg = Buffer.from(createOgSvg(photoDataUri));
  const ogPng = await sharp(ogSvg).resize(1200, 630).png({ quality: 95 }).toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogPng);
  fs.writeFileSync(path.join(publicDir, 'opengraph-image.png'), ogPng);
  console.log('Generated og-image.png and opengraph-image.png');

  console.log('All branding, icon suite, and metadata assets updated successfully!');
}

buildAll().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
