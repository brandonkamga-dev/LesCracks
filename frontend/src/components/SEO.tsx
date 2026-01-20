import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "LesCracks – Former • Innover • Transformer | Construire une carrière tech remarquable",
  description = "LesCracks accompagne les personnes voulant construire une carrière tech remarquable. Formation pratique, événements tech et accompagnement personnalisé pour se démarquer et accéder aux opportunités professionnelles au Cameroun.",
  keywords = "LesCracks, lescracks, formation tech cameroun, carrière tech, développement web cameroun, bootcamp programmation, workshop tech douala, formation développeur cameroun, accompagnement tech, mentoring développeur, insertion professionnelle tech, formation full stack, bootcamp intensif cameroun, école coding cameroun, tech education africa, griote cameroun",
  image = "https://lescracks.griote.org/og-image.png",
  url = "https://lescracks.griote.org/",
  type = "website"
}: SEOProps) {
  return (
    <Helmet>
      {/* Balises de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook / WhatsApp / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="LesCracks - Former • Innover • Transformer" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@lescracks" />
      <meta name="twitter:creator" content="@lescracks" />
    </Helmet>
  );
}
