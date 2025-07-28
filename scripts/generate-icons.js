const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

// Define icon sizes to generate
const iconSizes = [
  72, 96, 128, 144, 152, 192, 384, 512
];

// Define paths
const iconTemplate = path.join(__dirname, '../public/icons/icon-template.svg');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if required commands are available
async function checkRequirements() {
  try {
    await execPromise('which convert');
    console.log('✅ ImageMagick found');
  } catch (error) {
    console.error('❌ ImageMagick not found. Please install it with:');
    console.error('   brew install imagemagick (macOS)');
    console.error('   apt-get install imagemagick (Ubuntu/Debian)');
    process.exit(1);
  }
}

// Generate a single icon
async function generateIcon(size) {
  const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
  console.log(`Generating ${outputPath}...`);

  try {
    await execPromise(`convert -background none -resize ${size}x${size} "${iconTemplate}" "${outputPath}"`);
    console.log(`✅ Generated ${size}x${size} icon`);
  } catch (error) {
    console.error(`❌ Failed to generate ${size}x${size} icon:`, error.message);
  }
}

// Generate all icons
async function generateAllIcons() {
  console.log('🚀 Starting icon generation...');

  await checkRequirements();

  for (const size of iconSizes) {
    await generateIcon(size);
  }

  // Also create apple-touch-icon.png
  try {
    await execPromise(`convert -background none -resize 180x180 "${iconTemplate}" "${path.join(__dirname, '../public/apple-touch-icon.png')}"`);
    console.log('✅ Generated apple-touch-icon.png');
  } catch (error) {
    console.error('❌ Failed to generate apple-touch-icon.png:', error.message);
  }

  console.log('✨ All icons generated successfully!');
}

// Run the script
generateAllIcons().catch(console.error);
