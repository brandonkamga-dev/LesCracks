// src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, Plus, TrendingUp, Eye, Activity,
  AlertCircle, Loader2
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { format, isValid, eachDayOfInterval, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { adminApi } from '../../services/adminApi';

// === TYPES ===
interface Course {
  id_course: number;
  title: string;
  click_count: number;
  createdAt: string;
  category?: { name: string };
}

interface Event {
  id_event: number;
  title: string;
  date: string;
  time: string;
  click_count: number;
  createdAt: string;
  category?: { name: string };
}

interface CategoryData {
  name: string;
  value: number;
}

interface DashboardData {
  stats: {
    totalCourses: number;
    totalEvents: number;
    totalClicks: number;
    avgClicksPerContent: number;
    growthThisWeek: number;
  };
  charts: {
    viewsLast7Days: Array<{ date: string; vues: number }>;
    contentByCategory: CategoryData[];
    topCourses: Course[];
    topEvents: Event[];
    recentActivity: Array<{ type: 'course' | 'event'; item: Course | Event; timeAgo: string }>;
  };
  insights: string[];
}

// === COULEURS ===
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // === FORMATAGE SÉCURISÉ ===
  const safeDate = (dateStr: string): Date | null => {
    const d = new Date(dateStr);
    return isValid(d) ? d : null;
  };

  const timeAgo = (dateStr: string): string => {
    const d = safeDate(dateStr);
    if (!d) return 'inconnue';
    const diff = Date.now() - d.getTime();
    if (diff < 0) return 'dans le futur';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'à l\'instant';
    if (hours < 24) return `il y a ${hours}h`;
    return `il y a ${Math.floor(hours / 24)}j`;
  };

  // === CHARGEMENT ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [coursesRes, eventsRes] = await Promise.all([
          adminApi.getCourses(),
          adminApi.getEvents()
        ]);

        const courses: Course[] = coursesRes.data?.courses || [];
        const events: Event[] = eventsRes.data?.events || [];

        // Stats
        const totalCourses = courses.length;
        const totalEvents = events.length;
        const totalClicks = courses.reduce((s, c) => s + c.click_count, 0) +
                            events.reduce((s, e) => s + e.click_count, 0);
        const avgClicks = totalCourses + totalEvents > 0
          ? Math.round(totalClicks / (totalCourses + totalEvents))
          : 0;

        // Vues sur 7 jours
        const last7Days = eachDayOfInterval({
          start: subDays(new Date(), 6),
          end: new Date()
        });

        const viewsLast7Days = last7Days.map(day => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const dayClicks = courses
            .filter(c => format(safeDate(c.createdAt) || new Date(), 'yyyy-MM-dd') === dayStr)
            .reduce((s, c) => s + c.click_count, 0) +
            events
            .filter(e => format(safeDate(e.createdAt) || new Date(), 'yyyy-MM-dd') === dayStr)
            .reduce((s, e) => s + e.click_count, 0);
          return { date: format(day, 'EEE', { locale: fr }), vues: dayClicks };
        });

        // Catégories
        const categoryMap = new Map<string, number>();
        [...courses, ...events].forEach(item => {
          const cat = item.category?.name || 'Sans catégorie';
          categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
        });
        const contentByCategory: CategoryData[] = Array.from(categoryMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);

        // Top
        const topCourses = [...courses].sort((a, b) => b.click_count - a.click_count).slice(0, 5);
        const topEvents = [...events].sort((a, b) => b.click_count - a.click_count).slice(0, 5);

        // Activité récente
        const recentActivity = [...courses, ...events]
          .map(item => ({
            type: 'id_course' in item ? 'course' as const : 'event' as const,
            item,
            timeAgo: timeAgo(item.createdAt)
          }))
          .sort((a, b) =>
            (safeDate(b.item.createdAt)?.getTime() || 0) -
            (safeDate(a.item.createdAt)?.getTime() || 0)
          )
          .slice(0, 8);

        // Insights
        const insights: string[] = [];
        if (totalClicks > 500) insights.push("Plus de 500 clics cette semaine !");
        if (topCourses[0]?.click_count > 100) insights.push(`"${topCourses[0].title}" cartonne !`);

        setData({
          stats: { totalCourses, totalEvents, totalClicks, avgClicksPerContent: avgClicks, growthThisWeek: 12 },
          charts: { viewsLast7Days, contentByCategory, topCourses, topEvents, recentActivity },
          insights
        });
      } catch (err: any) {
        setError(err.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // === RENDER ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <p className="text-red-700">{error || 'Données indisponibles'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold">Tableau de bord</h1>
        <p className="text-xl mt-2 opacity-90">
          {format(new Date(), "EEEE d MMMM yyyy", { locale: fr })}
        </p>
        <p className="mt-4 text-sm opacity-80">
          {data.insights[0] || "Tout est sous contrôle"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cours</p>
              <p className="text-3xl font-bold">{data.stats.totalCourses}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Événements</p>
              <p className="text-3xl font-bold">{data.stats.totalEvents}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl">
              <Calendar className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clics</p>
              <p className="text-3xl font-bold">{data.stats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-xl">
              <Eye className="w-7 h-7 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Moyenne</p>
              <p className="text-3xl font-bold">{data.stats.avgClicksPerContent}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <Activity className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* GRAPHIQUES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Vues sur 7 jours</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.charts.viewsLast7Days}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="vues" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Par catégorie</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data.charts.contentByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const total = data.charts.contentByCategory.reduce((s: number, c: CategoryData) => s + c.value, 0);
                  const pct = total > 0 ? (entry.value / total) * 100 : 0;
                  return `${entry.name} ${pct.toFixed(0)}%`;
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.charts.contentByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP & ACTIVITÉ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Top 5 Cours</h3>
          {data.charts.topCourses.map((c, i) => (
            <div key={c.id_course} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium truncate max-w-xs">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.click_count} clics</p>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
          {data.charts.recentActivity.map((act, i) => (
            <div key={i} className="flex items-center gap-3 py-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${act.type === 'course' ? 'bg-blue-600' : 'bg-green-600'}`} />
              <div>
                <p className="font-medium">
                  {act.type === 'course' ? 'Cours' : 'Événement'} : <span className="text-blue-600">"{(act.item as any).title}"</span>
                </p>
                <p className="text-xs text-gray-500">{act.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/admin/courses/new" className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-semibold flex items-center gap-3 shadow-md">
          <Plus className="w-6 h-6" /> Créer un cours
        </Link>
        <Link to="/admin/events/new" className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl font-semibold flex items-center gap-3 shadow-md">
          <Plus className="w-6 h-6" /> Créer un événement
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;