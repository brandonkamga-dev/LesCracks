/**
 * Script pour générer automatiquement le sitemap.xml
 * Exécuter avec : node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://lescracks.griote.org';

// Pages statiques
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/cours', priority: '0.9', changefreq: 'weekly' },
  { url: '/evenements', priority: '0.9', changefreq: 'weekly' },
  { url: '/accompagnement', priority: '0.8', changefreq: 'monthly' },
  { url: '/a-propos', priority: '0.7', changefreq: 'monthly' },
];

// Date actuelle au format ISO
const today = new Date().toISOString().split('T')[0];

// Générer le XML
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

  // Ajouter les pages statiques
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n\n';
  });

  xml += '</urlset>\n';

  return xml;
}

// Écrire le fichier
function writeSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.join(__dirname, '../public/sitemap.xml');

  fs.writeFileSync(outputPath, sitemap, 'utf8');
  console.log('✅ Sitemap généré avec succès !');
  console.log(`📍 Emplacement : ${outputPath}`);
  console.log(`🔗 URL : ${BASE_URL}/sitemap.xml`);
}

// Exécuter
writeSitemap();
