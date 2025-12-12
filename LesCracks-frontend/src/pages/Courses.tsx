import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Search, X, Filter, Eye, Clock, Tag, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { publicApi } from '../services/publicApi';

interface Course {
  id_course: number;  // ← CORRIGÉ
  title: string;
  description: string;
  youtube_link: string;
  click_count: number;
  category?: { id_category: number; name: string };
  tags?: Array<{ id_tag: number; name: string }>;
  image?: { image_url: string };
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'views' | 'recent'>('views');

  // Données
  const [allCategories, setAllCategories] = useState<Array<{ id_category: number; name: string }>>([]);
  const [allTags, setAllTags] = useState<Array<{ id_tag: number; name: string }>>([]);

  // === CHARGEMENT ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, catsRes, tagsRes] = await Promise.all([
          publicApi.getCourses(),
          publicApi.getCategories(),
          publicApi.getTags()
        ]);

        if (coursesRes.success) {
          setCourses(coursesRes.data.courses.map((c: any) => ({
            id_course: c.id_course,  // ← CORRIGÉ
            title: c.title,
            description: c.description,
            youtube_link: c.youtube_link,
            click_count: c.click_count,
            category: c.category,
            tags: c.tags,
            image: c.image
          })));
        }
        if (catsRes.success) setAllCategories(catsRes.data.categories);
        if (tagsRes.success) setAllTags(tagsRes.data.tags);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // === FILTRES UNIQUEMENT SUR COURS EXISTANTS ===
  const usedCategoryIds = useMemo(() => 
    [...new Set(courses.map(c => c.category?.id_category).filter(Boolean))], [courses]
  );

  const usedTagIds = useMemo(() => 
    [...new Set(courses.flatMap(c => c.tags?.map(t => t.id_tag) || []).filter(Boolean))], [courses]
  );

  const filteredCategories = allCategories.filter(cat => usedCategoryIds.includes(cat.id_category));
  const filteredTags = allTags.filter(tag => usedTagIds.includes(tag.id_tag));

  // === FONCTIONS FILTRES ===
  const toggleCategory = (id: number) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTag = (id: number) => {
    setSelectedTags(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  // === FILTRES + RECHERCHE + TRI ===
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    // Recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.description.toLowerCase().includes(query)
      );
    }

    // Catégories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(c => c.category && selectedCategories.includes(c.category.id_category));
    }

    // Tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(c => c.tags?.some(t => selectedTags.includes(t.id_tag)));
    }

    // Tri
    return filtered.sort((a, b) => {
      if (sortBy === 'views') return b.click_count - a.click_count;
      return 0;
    });
  }, [courses, searchQuery, selectedCategories, selectedTags, sortBy]);

  // === TRACKING UNIQUEMENT SUR YOUTUBE ===
  const handleWatchOnYouTube = async (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    await publicApi.trackCourseClick(course.id_course);  // ← CORRIGÉ
    window.open(course.youtube_link, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">...</div>;

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* HERO */}
      <section className="pt-24 pb-12 text-center">
        <h1 className={`text-5xl md:text-6xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Nos <span className="text-[#1f48ff]">Cours</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Gratuits • Pratiques • Concrets</p>
      </section>

      {/* RECHERCHE + FILTRES */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            {/* Recherche */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un cours..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1f48ff]`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Catégories */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Catégories</h3>
                <div className="space-y-2">
                  {filteredCategories.map(cat => (
                    <label key={cat.id_category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id_category)}
                        onChange={() => toggleCategory(cat.id_category)}
                        className="w-4 h-4 text-[#1f48ff] rounded focus:ring-[#1f48ff]"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Technologies</h3>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {filteredTags.map(tag => (
                    <label key={tag.id_tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id_tag)}
                        onChange={() => toggleTag(tag.id_tag)}
                        className="w-4 h-4 text-[#1f48ff] rounded focus:ring-[#1f48ff]"
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtres actifs + Tri */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
              <div className="flex flex-wrap gap-2">
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
                    Effacer tout
                  </button>
                )}
                {selectedCategories.map(id => {
                  const cat = allCategories.find(c => c.id_category === id);
                  return cat ? (
                    <span key={id} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {cat.name} <X size={12} className="cursor-pointer" onClick={() => toggleCategory(id)} />
                    </span>
                  ) : null;
                })}
                {selectedTags.map(id => {
                  const tag = allTags.find(t => t.id_tag === id);
                  return tag ? (
                    <span key={id} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      {tag.name} <X size={12} className="cursor-pointer" onClick={() => toggleTag(id)} />
                    </span>
                  ) : null;
                })}
              </div>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'views' | 'recent')}
                className={`px-4 py-2 rounded-lg text-sm ${isDark ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="views">Plus vus</option>
                <option value="recent">Plus récents</option>
              </select>
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong className="text-[#1f48ff]">{filteredAndSortedCourses.length}</strong> cours trouvés
            </p>
          </div>
        </div>
      </section>

      {/* GRILLE */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCourses.map(course => (
              <motion.div
                key={course.id_course}  // ← CORRIGÉ
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCourse(course)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white dark:bg-gray-800"
              >
                <div className="relative aspect-video">
                  {course.image?.image_url ? (
                    <img src={course.image.image_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Eye size={14} /> {course.click_count}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-[#1f48ff] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.category && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{course.category.name}</span>
                    )}
                    {course.tags?.slice(0, 2).map(t => (
                      <span key={t.id_tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{t.name}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">{selectedCourse.title}</h2>
                <button onClick={() => setSelectedCourse(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {selectedCourse.image?.image_url ? (
                    <img src={selectedCourse.image.image_url} alt="" className="w-full rounded-xl object-cover aspect-video" />
                  ) : (
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl aspect-video flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                    {selectedCourse.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {selectedCourse.category && (
                      <div className="flex items-center gap-2">
                        <Tag size={18} /> <span>{selectedCourse.category.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Eye size={18} /> <span>{selectedCourse.click_count} vues</span>
                    </div>
                  </div>

                  {selectedCourse.tags && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.tags.map(t => (
                          <span key={t.id_tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{t.name}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={(e) => handleWatchOnYouTube(e, selectedCourse)}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all"
                  >
                    <Play size={20} />
                    Regarder sur YouTube
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à passer à l'action ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accompagnement" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1f48ff] text-white font-bold rounded-xl hover:bg-blue-700">
              Démarrer <ArrowRight size={20} />
            </Link>
            <a href="https://wa.me/237650830057" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-600">
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;