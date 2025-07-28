// This script creates placeholder files for OG image routes
// to prevent Next.js static export from failing

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper function to create placeholder files
function createPlaceholder(outputPath, content = 'Placeholder for OG Image') {
  try {
    ensureDirectoryExists(path.dirname(outputPath));
    fs.writeFileSync(outputPath, content);
    console.log(`Created placeholder: ${outputPath}`);
  } catch (error) {
    console.warn(`Warning: Could not create placeholder at ${outputPath}: ${error.message}`);
  }
}

// Helper to get current working directory for ES modules
function getCWD() {
  return process.cwd();
}

// Main function
async function handleOGRoutes() {
  console.log('Handling OG image routes for static export...');

  const outDir = path.join(getCWD(), 'out');

  // Create blog OG directories
  ensureDirectoryExists(path.join(outDir, 'blog-og'));

  // Create index placeholder to prevent 404s
  createPlaceholder(path.join(outDir, 'blog-og', 'index.html'),
    '<html><body>Blog OG Image Generator</body></html>');

  // Create a default placeholder for direct /blog-og access
  createPlaceholder(path.join(outDir, 'blog-og.html'),
    '<html><body>Blog OG Image Generator</body></html>');

  // Create docs OG directories
  ensureDirectoryExists(path.join(outDir, 'docs-og'));

  // Create index placeholder to prevent 404s
  createPlaceholder(path.join(outDir, 'docs-og', 'index.html'),
    '<html><body>Docs OG Image Generator</body></html>');

  // Create a default placeholder for direct /docs-og access
  createPlaceholder(path.join(outDir, 'docs-og.html'),
    '<html><body>Docs OG Image Generator</body></html>');

  // Create placeholder for index slug fallback
  try {
    // Check if the path exists and is a directory before creating files
    const blogIndexPath = path.join(outDir, 'blog-og', 'index');
    const docsIndexPath = path.join(outDir, 'docs-og', 'index');

    const blogIndexStat = fs.existsSync(blogIndexPath) ? fs.statSync(blogIndexPath) : null;
    const docsIndexStat = fs.existsSync(docsIndexPath) ? fs.statSync(docsIndexPath) : null;

    // Only create the directory and file if it doesn't exist or is a directory
    if (!blogIndexStat || blogIndexStat.isDirectory()) {
      ensureDirectoryExists(blogIndexPath);
      createPlaceholder(path.join(blogIndexPath, 'index.html'),
        '<html><body>Blog OG Image Index</body></html>');
    }

    if (!docsIndexStat || docsIndexStat.isDirectory()) {
      ensureDirectoryExists(docsIndexPath);
      createPlaceholder(path.join(docsIndexPath, 'index.html'),
        '<html><body>Docs OG Image Index</body></html>');
    }
  } catch (error) {
    console.warn(`Warning: Could not create index placeholder files: ${error.message}`);
  }

  console.log('Successfully handled OG image routes!');
}

// Run the function
handleOGRoutes().catch(err => {
  console.error('Error handling OG routes:', err);
  // Don't exit with error code, just log and continue
  // This ensures the build process can continue
  // process.exit(1);
});

// For ES modules, we need to export something
export default handleOGRoutes;
