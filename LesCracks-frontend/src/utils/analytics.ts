/**
 * Configuration Google Analytics
 * Remplacez 'G-XXXXXXXXXX' par votre vrai ID de mesure Google Analytics
 */

// ID de mesure Google Analytics (à configurer)
const GA_MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialiser Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    // Charger le script Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialiser gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    console.log('✅ Google Analytics initialisé');
  }
};

// Suivre une page vue
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Suivre un événement personnalisé
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Événements spécifiques LesCracks
export const trackCourseClick = (courseId: string, courseTitle: string) => {
  trackEvent('course_click', 'Cours', courseTitle, parseInt(courseId));
};

export const trackEventRegistration = (eventId: string, eventTitle: string) => {
  trackEvent('event_registration', 'Événements', eventTitle, parseInt(eventId));
};

export const trackAccompagnementRequest = () => {
  trackEvent('accompagnement_request', 'Accompagnement', 'Demande accompagnement');
};

export const trackYouTubeRedirect = (courseId: string, youtubeUrl: string) => {
  trackEvent('youtube_redirect', 'Cours', youtubeUrl, parseInt(courseId));
};

// Déclaration TypeScript pour window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
