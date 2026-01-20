/**
 * Script de vérification SEO
 * Vérifie que tous les fichiers SEO sont en place
 * Exécuter avec : node scripts/check-seo.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://lescracks.griote.org';

// Couleurs pour le terminal
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - MANQUANT`, 'red');
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    log(`❌ ${description} - Fichier manquant`, 'red');
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const found = content.includes(searchString);
  
  if (found) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`⚠️  ${description} - Contenu manquant`, 'yellow');
    return false;
  }
}

console.log('\n' + '='.repeat(60));
log('🔍 VÉRIFICATION SEO LESCRACKS', 'blue');
console.log('='.repeat(60) + '\n');

let score = 0;
let total = 0;

// Vérifier les fichiers essentiels
log('📁 Fichiers SEO essentiels:', 'blue');
total++;
if (checkFile('public/sitemap.xml', 'sitemap.xml')) score++;

total++;
if (checkFile('public/robots.txt', 'robots.txt')) score++;

total++;
if (checkFile('public/og-image.png', 'og-image.png (Image Open Graph)')) score++;

total++;
if (checkFile('src/components/SEO.tsx', 'Composant SEO.tsx')) score++;

console.log('');

// Vérifier le contenu des fichiers
log('📝 Contenu des fichiers:', 'blue');

total++;
if (checkFileContent('public/sitemap.xml', BASE_URL, 'Sitemap contient la bonne URL')) score++;

total++;
if (checkFileContent('public/robots.txt', 'Sitemap:', 'robots.txt référence le sitemap')) score++;

total++;
if (checkFileContent('index.html', BASE_URL, 'index.html contient la bonne URL canonique')) score++;

total++;
if (checkFileContent('index.html', 'Former • Innover • Transformer', 'index.html contient le slogan')) score++;

total++;
if (checkFileContent('index.html', 'EducationalOrganization', 'Schema.org JSON-LD présent')) score++;

total++;
if (checkFileContent('src/components/SEO.tsx', 'react-helmet-async', 'Composant SEO utilise react-helmet-async')) score++;

console.log('');

// Vérifier les dépendances
log('📦 Dépendances:', 'blue');

total++;
if (checkFileContent('package.json', 'react-helmet-async', 'react-helmet-async installé')) score++;

console.log('');

// Vérifier la configuration
log('⚙️  Configuration:', 'blue');

total++;
if (checkFile('.env.example', 'Fichier .env.example')) score++;

console.log('');

// Résultats
console.log('='.repeat(60));
const percentage = Math.round((score / total) * 100);
const color = percentage === 100 ? 'green' : percentage >= 80 ? 'yellow' : 'red';

log(`\n📊 SCORE SEO : ${score}/${total} (${percentage}%)`, color);

if (percentage === 100) {
  log('\n🎉 Parfait ! Tous les éléments SEO sont en place.', 'green');
  log('📋 Prochaines étapes :', 'blue');
  log('   1. Déployer sur lescracks.griote.org', 'reset');
  log('   2. Vérifier que les URLs sont accessibles', 'reset');
  log('   3. Créer un compte Google Search Console', 'reset');
  log('   4. Soumettre le sitemap', 'reset');
} else if (percentage >= 80) {
  log('\n⚠️  Presque parfait ! Quelques éléments manquent.', 'yellow');
  log('Consultez les ❌ et ⚠️  ci-dessus pour les corriger.', 'yellow');
} else {
  log('\n❌ Attention ! Plusieurs éléments SEO manquent.', 'red');
  log('Votre site ne sera pas bien référencé.', 'red');
  log('Consultez GUIDE_SEO.md pour plus d\'informations.', 'yellow');
}

console.log('\n' + '='.repeat(60));
log('\n📚 Documentation disponible :', 'blue');
log('   - GUIDE_SEO.md : Guide complet', 'reset');
log('   - ACTIONS_SEO_IMMEDIATES.md : Actions à faire maintenant', 'reset');
log('   - SEO_EXAMPLES.md : Exemples d\'utilisation', 'reset');
console.log('');

// URLs à tester après déploiement
log('🔗 URLs à tester après déploiement :', 'blue');
log(`   ${BASE_URL}/sitemap.xml`, 'reset');
log(`   ${BASE_URL}/robots.txt`, 'reset');
log(`   ${BASE_URL}/og-image.png`, 'reset');
console.log('');

process.exit(percentage === 100 ? 0 : 1);
