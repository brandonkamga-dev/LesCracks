// src/pages/Events.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, X, ArrowRight, Tag as TagIcon, Search, Filter, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { useTheme } from '../contexts/ThemeContext';
import { publicApi } from '../services/publicApi';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: { id_category: number; name: string };
  tags: Array<{ id_tag: number; name: string }>;
  image?: { image_url: string };
}

const Events: React.FC = () => {
  const { isDark } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const eventsRef = useRef<HTMLDivElement>(null);

  // === CHARGEMENT ===
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await publicApi.getEvents();
        if (res.success) {
          setEvents(res.data.events.map((e: any) => ({
            id: e.id_event,
            title: e.title,
            description: e.description,
            date: e.date,
            time: e.time,
            location: e.location,
            category: e.category ? { id_category: e.category.id_category, name: e.category.name } : { id_category: 0, name: 'Général' },
            tags: e.tags?.map((t: any) => ({ id_tag: t.id_tag, name: t.name })) || [],
            image: e.image
          })));
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // === FILTRES DYNAMIQUES ===
  const { categories, tags } = useMemo(() => {
    const catSet = new Set<string>();
    const tagSet = new Set<string>();
    events.forEach(e => {
      catSet.add(`${e.category.id_category}|${e.category.name}`);
      e.tags.forEach(t => tagSet.add(`${t.id_tag}|${t.name}`));
    });
    return {
      categories: Array.from(catSet).map(s => {
        const [id, name] = s.split('|');
        return { id: Number(id), name };
      }),
      tags: Array.from(tagSet).map(s => {
        const [id, name] = s.split('|');
        return { id: Number(id), name };
      })
    };
  }, [events]);

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

  // === FILTRES + RECHERCHE ===
  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(query) || 
        e.description.toLowerCase().includes(query) ||
        e.location.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(e => selectedCategories.includes(e.category.id_category));
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(e => e.tags.some(t => selectedTags.includes(t.id_tag)));
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [events, searchQuery, selectedCategories, selectedTags]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const formatTime = (t: string) => t.slice(0, 5);

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f48ff] mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* HERO COMPACT */}
      <section className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Événements <span className="text-[#1f48ff]">Tech</span>
          </motion.h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Workshops • Bootcamps • Meetups
          </p>
        </div>
      </section>

      {/* FILTRES COMPACTS & STICKY */}
      <section className="sticky top-0 z-40 bg-gray-50 dark:bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 rounded-lg text-sm border ${
                  isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-[#1f48ff]`}
              />
            </div>

            {/* Bouton Filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                hasActiveFilters ? 'bg-[#1f48ff] text-white' : isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700 border'
              }`}
            >
              <Filter size={16} />
              Filtres
              {hasActiveFilters && <span className="ml-1 bg-white text-[#1f48ff] rounded-full w-5 h-5 text-xs flex items-center justify-center">{selectedCategories.length + selectedTags.length}</span>}
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Résultat */}
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Filtres déroulants */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <Filter size={14} /> Catégories
                    </h4>
                    <div className="space-y-1">
                      {categories.map(cat => (
                        <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            className="w-3.5 h-3.5 text-[#1f48ff] rounded"
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <TagIcon size={14} /> Technologies
                    </h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {tags.map(tag => (
                        <label key={tag.id} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => toggleTag(tag.id)}
                            className="w-3.5 h-3.5 text-[#1f48ff] rounded"
                          />
                          {tag.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-4 text-sm text-red-500 hover:underline">
                    Effacer tous les filtres
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* TIMELINE – SCROLL DIRECT */}
      <section ref={eventsRef} className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400">Aucun événement trouvé</p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row gap-5 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Date */}
                  <div className="flex-shrink-0 text-center">
                    <div className="bg-[#1f48ff] text-white px-3 py-1.5 rounded font-bold text-xs">
                      {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase()}
                    </div>
                  </div>

                  {/* Ligne */}
                  <div className="hidden md:block flex-1 h-0.5 bg-[#1f48ff]"></div>

                  {/* Carte */}
                  <div
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 max-w-md cursor-pointer"
                  >
                    <div className={`rounded-xl p-5 shadow-lg hover:shadow-xl transition-all ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                      {event.image?.image_url ? (
                        <img src={event.image.image_url} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                      ) : (
                        <div className="bg-gradient-to-br from-[#1f48ff] to-purple-600 h-40 rounded-lg mb-3 flex items-center justify-center">
                          <Calendar className="w-10 h-10 text-white" />
                        </div>
                      )}
                      <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><Clock size={12} /> {formatTime(event.time)}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                      </div>
                      <p className={`text-sm line-clamp-2 mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs bg-[#1f48ff] text-white px-2.5 py-0.5 rounded-full">
                          {event.category.name}
                        </span>
                        {event.tags.slice(0, 2).map(t => (
                          <span key={t.id_tag} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-6`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-5">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedEvent.title}
                </h2>
                <button onClick={() => setSelectedEvent(null)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X size={20} />
                </button>
              </div>

              {selectedEvent.image?.image_url ? (
                <img src={selectedEvent.image.image_url} alt="" className="w-full h-56 object-cover rounded-xl mb-5" />
              ) : (
                <div className="bg-gradient-to-br from-[#1f48ff] to-purple-600 h-56 rounded-xl mb-5 flex items-center justify-center">
                  <Calendar className="w-14 h-14 text-white" />
                </div>
              )}

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-lg">
                  <Calendar className="text-[#1f48ff]" /> {formatDate(selectedEvent.date)}
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <Clock className="text-[#1f48ff]" /> {formatTime(selectedEvent.time)}
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <MapPin className="text-[#1f48ff]" /> {selectedEvent.location}
                </div>
              </div>

              <p className={`text-base leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedEvent.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs bg-[#1f48ff] text-white px-3 py-1 rounded-full">
                  {selectedEvent.category.name}
                </span>
                {selectedEvent.tags.map(t => (
                  <span key={t.id_tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {t.name}
                  </span>
                ))}
              </div>

              <a
                href={`https://wa.me/237650830057?text=Inscription : ${encodeURIComponent(selectedEvent.title)} - ${formatDate(selectedEvent.date)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-green-600 text-white font-bold rounded-xl transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                S'inscrire
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;