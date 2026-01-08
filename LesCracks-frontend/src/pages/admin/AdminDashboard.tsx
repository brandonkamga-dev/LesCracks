import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Folder, Hash, FileText, Video, Users, TrendingUp } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface DashboardStats {
  courses: number;
  events: number;
  categories: number;
  tags: number;
  documents?: number;
  videos?: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    courses: 0,
    events: 0,
    categories: 0,
    tags: 0,
    documents: 0,
    videos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [coursesRes, eventsRes, categoriesRes, tagsRes] = await Promise.all([
          adminApi.getCourses(),
          adminApi.getEvents(),
          adminApi.getCategories(),
          adminApi.getTags(),
        ]);

        setStats({
          courses: coursesRes.data?.courses?.length || 0,
          events: eventsRes.data?.events?.length || 0,
          categories: categoriesRes.data?.categories?.length || 0,
          tags: tagsRes.data?.tags?.length || 0,
          documents: 0,
          videos: 0,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Cours',
      value: stats.courses,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/courses',
    },
    {
      label: 'Événements',
      value: stats.events,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/events',
    },
    {
      label: 'Catégories',
      value: stats.categories,
      icon: Folder,
      color: 'from-green-500 to-green-600',
      href: '/admin/categories',
    },
    {
      label: 'Tags',
      value: stats.tags,
      icon: Hash,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/tags',
    },
    {
      label: 'Documents',
      value: stats.documents || 0,
      icon: FileText,
      color: 'from-pink-500 to-pink-600',
      href: '/admin/documents',
    },
    {
      label: 'Vidéos',
      value: stats.videos || 0,
      icon: Video,
      color: 'from-red-500 to-red-600',
      href: '/admin/videos',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Bienvenue dans le tableau de bord</h2>
        <p className="text-gray-300">Gérez tous les contenus de votre plateforme LesCracks</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.a
              key={index}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-slate-800 border border-white/10 p-6 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-gray-300 text-sm font-medium mb-1">{card.label}</h3>
                <p className="text-3xl font-bold text-white">{loading ? '-' : card.value}</p>
              </div>

              {/* Border animation */}
              <div className="absolute inset-0 rounded-xl border border-yellow-400/0 group-hover:border-yellow-400/50 transition-all duration-300" />
            </motion.a>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-slate-800 rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/courses"
            className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-yellow-400/50"
          >
            <BookOpen className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Ajouter un cours</span>
          </a>
          <a
            href="/admin/events"
            className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-yellow-400/50"
          >
            <Calendar className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Ajouter un événement</span>
          </a>
          <a
            href="/admin/categories"
            className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 hover:border-yellow-400/50"
          >
            <Folder className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Gérer les catégories</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
