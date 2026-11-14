const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Create Minimal "CM" Monogram Favicon SVG
function createFaviconSvg(size, bgColor = '#171717', textColor = '#FFFFFF', accentColor = '#365CF5') {
  return `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="${bgColor}"/>
  <!-- Geometric "CM" Monogram -->
  <g font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="230" letter-spacing="-14">
    <!-- C in pure white -->
    <text x="64" y="335" fill="${textColor}">C</text>
    <!-- M in electric blue -->
    <text x="215" y="335" fill="${accentColor}">M</text>
  </g>
  <!-- Minimal geometric security dot -->
  <circle cx="430" cy="335" r="22" fill="${accentColor}" />
</svg>`;
}

// 2. Create Editorial OpenGraph Image (1200 x 630)
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

// 3. Create Multi-Resolution ICO buffer
function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4);

  let offset = 6 + (16 * pngBuffers.length);
  const dirEntries = [];

  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
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
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  console.log('Generating Google-Compliant Favicons & Monogram Assets...');
  const svg512 = Buffer.from(createFaviconSvg(512));

  const png16 = await sharp(svg512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svg512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svg512).resize(48, 48).png().toBuffer();
  const png96 = await sharp(svg512).resize(96, 96).png().toBuffer();
  const png180 = await sharp(svg512).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svg512).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svg512).resize(512, 512).png().toBuffer();

  const icoBuffer = createIco([
    { buffer: png16, size: 16 },
    { buffer: png32, size: 32 },
    { buffer: png48, size: 48 }
  ]);

  // Write Google-compliant favicon suite to public/
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), png96);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  console.log('Generating Editorial OpenGraph Image (1200x630)...');
  
  // Read chinmaya.jpg for composite
  const photoPath = path.join(publicDir, 'images', 'chinmaya.jpg');
  let photoDataUri = '';
  if (fs.existsSync(photoPath)) {
    const photoBuffer = fs.readFileSync(photoPath);
    // Resize photo to optimize svg embedding
    const resizedPhoto = await sharp(photoBuffer).resize(400, 500, { fit: 'cover', position: 'top' }).jpeg({ quality: 90 }).toBuffer();
    photoDataUri = `data:image/jpeg;base64,${resizedPhoto.toString('base64')}`;
  }

  const ogSvg = Buffer.from(createOgSvg(photoDataUri));
  const ogPng = await sharp(ogSvg).resize(1200, 630).png({ quality: 95 }).toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogPng);
  fs.writeFileSync(path.join(publicDir, 'opengraph-image.png'), ogPng);

  console.log('All branding and metadata assets generated successfully!');
}

buildAll().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
