const fs = require('fs');

function testJsonLd(file) {
  if (!fs.existsSync(file)) {
    console.log('File does not exist:', file);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  if (!matches) {
    console.log('No JSON-LD in', file);
    return;
  }
  console.log('=== Checking JSON-LD in:', file, '===');
  matches.forEach((m, idx) => {
    const raw = m.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '');
    try {
      const parsed = JSON.parse(raw);
      console.log(`Script tag ${idx + 1}: Valid JSON-LD!`);
      if (parsed['@graph']) {
        console.log('  @graph types found:', parsed['@graph'].map(item => item['@type']));
        const person = parsed['@graph'].find(item => item['@type'] === 'Person');
        if (person) {
          console.log('  Person name:', person.name);
          console.log('  Person jobTitle:', person.jobTitle);
          console.log('  Person address:', person.address);
          console.log('  Person areaServed count:', person.areaServed ? person.areaServed.length : 0);
          console.log('  Person knowsAbout count:', person.knowsAbout ? person.knowsAbout.length : 0);
        }
      } else {
        console.log('  Type:', parsed['@type']);
      }
    } catch (e) {
      console.error(`Invalid JSON in ${file}:`, e.message);
    }
  });
}

function testMeta(file) {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  console.log('=== Checking Meta in:', file, '===');
  const titleMatch = content.match(/<title>([^<]*)<\/title>/);
  console.log('  Title:', titleMatch ? titleMatch[1] : 'NONE');
  const descMatch = content.match(/<meta name="description" content="([^"]*)"/);
  console.log('  Description:', descMatch ? descMatch[1] : 'NONE');
  const canonMatch = content.match(/<link rel="canonical" href="([^"]*)"/);
  console.log('  Canonical:', canonMatch ? canonMatch[1] : 'NONE');
  const ogImgMatch = content.match(/<meta property="og:image" content="([^"]*)"/);
  console.log('  OG Image:', ogImgMatch ? ogImgMatch[1] : 'NONE');
  const twCardMatch = content.match(/<meta name="twitter:card" content="([^"]*)"/);
  console.log('  Twitter Card:', twCardMatch ? twCardMatch[1] : 'NONE');
  const robotsMatch = content.match(/<meta name="robots" content="([^"]*)"/);
  console.log('  Robots:', robotsMatch ? robotsMatch[1] : 'NONE');
}

console.log('--- HOMEPAGE ---');
testMeta('.next/server/app/index.html');
testJsonLd('.next/server/app/index.html');

console.log('\n--- BLOGS LISTING ---');
testMeta('.next/server/app/blogs.html');
testJsonLd('.next/server/app/blogs.html');

console.log('\n--- BLOG POST SLUG ---');
testMeta('.next/server/app/blogs/broken-object-level-authorization-bola-mitigation-nodejs-nextjs.html');
testJsonLd('.next/server/app/blogs/broken-object-level-authorization-bola-mitigation-nodejs-nextjs.html');

console.log('\n--- SITEMAP & ROBOTS & MANIFEST ---');
console.log('app/robots.js exists:', fs.existsSync('app/robots.js'));
console.log('app/sitemap.js exists:', fs.existsSync('app/sitemap.js'));
console.log('app/manifest.js exists:', fs.existsSync('app/manifest.js'));
console.log('public/robots.txt exists (should be false to avoid conflict):', fs.existsSync('public/robots.txt'));
console.log('public/sitemap.xml exists (should be false to avoid conflict):', fs.existsSync('public/sitemap.xml'));
