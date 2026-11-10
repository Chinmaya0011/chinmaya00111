const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Create Favicon SVG (Geometric modern C)
function createFaviconSvg(size, color = '#10B981', bgColor = '#171717') {
  // Center: 256, 256, Radius: 140, Stroke: 56
  // Gap at 42 degrees
  const angle = 42 * (Math.PI / 180);
  const r = 140;
  const cx = 256;
  const cy = 256;
  const x1 = (cx + r * Math.cos(angle)).toFixed(1);
  const y1 = (cy - r * Math.sin(angle)).toFixed(1);
  const x2 = (cx + r * Math.cos(angle)).toFixed(1);
  const y2 = (cy + r * Math.sin(angle)).toFixed(1);

  return `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="${bgColor}"/>
  <path d="M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}" 
        fill="none" 
        stroke="${color}" 
        stroke-width="58" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
</svg>`;
}

// 2. Create OpenGraph Image SVG (1200 x 630)
function createOgSvg() {
  const width = 1200;
  const height = 630;
  
  // C monogram path for OG card
  const r = 48;
  const cx = 130;
  const cy = 130;
  const angle = 42 * (Math.PI / 180);
  const x1 = (cx + r * Math.cos(angle)).toFixed(1);
  const y1 = (cy - r * Math.sin(angle)).toFixed(1);
  const x2 = (cx + r * Math.cos(angle)).toFixed(1);
  const y2 = (cy + r * Math.sin(angle)).toFixed(1);

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B11"/>
      <stop offset="100%" stop-color="#020508"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162638" stroke-width="0.75" stroke-opacity="0.5"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Subtle glow -->
  <circle cx="150" cy="150" r="220" fill="#10B981" opacity="0.06"/>
  <circle cx="1050" cy="480" r="260" fill="#10B981" opacity="0.04"/>

  <!-- Outer Border Frame -->
  <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="20" fill="#060C14" fill-opacity="0.75" stroke="#1F2F40" stroke-width="1.5"/>

  <!-- Top Monogram Badge -->
  <g transform="translate(80, 80)">
    <rect width="84" height="84" rx="18" fill="#171717" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.4"/>
    <path d="M ${x1 - 88} ${y1 - 88} A ${r} ${r} 0 1 0 ${x2 - 88} ${y2 - 88}" 
          fill="none" 
          stroke="#10B981" 
          stroke-width="20" 
          stroke-linecap="round"/>
  </g>

  <!-- Brand Eyebrow -->
  <g transform="translate(186, 115)">
    <text font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#10B981" letter-spacing="2.5">
      DEVELOPER PORTFOLIO // APPSEC
    </text>
    <text y="24" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#64748B" letter-spacing="1">
      chinmayakumarmishra.sbs
    </text>
  </g>

  <!-- Main Name Heading -->
  <text x="80" y="270" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">
    CHINMAYA KUMAR MISHRA
  </text>

  <!-- Professional Title -->
  <text x="80" y="330" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="700" fill="#10B981" letter-spacing="0">
    Full-Stack Developer <tspan fill="#64748B" font-weight="400">|</tspan> Application Security
  </text>

  <!-- Short Summary -->
  <text x="80" y="390" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94A3B8">
    Building secure web applications and developer tools with modern JavaScript.
  </text>
  <text x="80" y="422" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#94A3B8">
    Specializing in Application Security, Web Security, and API Security.
  </text>

  <!-- Divider Line -->
  <line x1="80" y1="480" x2="1120" y2="480" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Footer Metadata Links -->
  <!-- Website -->
  <g transform="translate(80, 528)">
    <circle cx="10" cy="-4" r="4" fill="#10B981"/>
    <text x="24" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#E2E8F0">
      chinmayakumarmishra.sbs
    </text>
  </g>

  <!-- GitHub -->
  <g transform="translate(480, 528)">
    <text font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#94A3B8">
      github.com/<tspan fill="#F1F5F9">chinmaya0011</tspan>
    </text>
  </g>

  <!-- LinkedIn -->
  <g transform="translate(820, 528)">
    <text font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#94A3B8">
      linkedin.com/in/<tspan fill="#38BDF8">chinmaya00111</tspan>
    </text>
  </g>

</svg>`;
}

// 3. Create ICO from PNG buffers
function createIco(pngBuffers) {
  // ICO header: 6 bytes
  // Count: pngBuffers.length
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
  const appDir = path.join(__dirname, '..', 'app');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  console.log('Generating Favicons and App Icons...');
  const svg512 = Buffer.from(createFaviconSvg(512));
  
  const png16 = await sharp(svg512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svg512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svg512).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svg512).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svg512).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svg512).resize(512, 512).png().toBuffer();

  const icoBuffer = createIco([
    { buffer: png16, size: 16 },
    { buffer: png32, size: 32 },
    { buffer: png48, size: 48 }
  ]);

  // Write to public/
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);

  // Write to app/ (Next.js App Router metadata conventions)
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.png'), png32);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);

  console.log('Generating OpenGraph Image (1200x630)...');
  const ogSvg = Buffer.from(createOgSvg());
  const ogPng = await sharp(ogSvg).resize(1200, 630).png({ quality: 95 }).toBuffer();

  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogPng);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogPng);

  console.log('All image assets created successfully!');
}

buildAll().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});

