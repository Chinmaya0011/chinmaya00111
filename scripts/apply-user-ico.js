// Helper script to regenerate all favicon and icon assets from public/chinmaya.png
const { execSync } = require('child_process');
const path = require('path');

console.log('Running asset generation pipeline...');
require('./generate-assets');
