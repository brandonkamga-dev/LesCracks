import { useState, useEffect, useCallback } from 'react';
import apiService, { Course, Event, AdminStats } from '../services/api';

// Hook pour l'authentification
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(apiService.isAuthenticated());
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.login(username, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: any) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async () => {
    if (!apiService.isAuthenticated()) return;
    
    setLoading(true);
    
    try {
      const userData = await apiService.verifyToken();
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Token invalide:', err);
      setUser(null);
      setIsAuthenticated(false);
      apiService.clearToken();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    verifyToken,
  };
};

// Hook pour les cours
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des cours');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const newCourse = await apiService.createCourse(course);
      setCourses(prev => [newCourse, ...prev]);
      return newCourse;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du cours');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCourse = useCallback(async (id: string, updates: Partial<Course>) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedCourse = await apiService.updateCourse(id, updates);
      setCourses(prev => prev.map(course => 
        course.id === id ? updatedCourse : course
      ));
      return updatedCourse;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour du cours');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCourse = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.deleteCourse(id);
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression du cours');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

// Hook pour les événements
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const newEvent = await apiService.createEvent(event);
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de l\'événement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedEvent = await apiService.updateEvent(id, updates);
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour de l\'événement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.deleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de l\'événement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registerForEvent = useCallback(async (eventId: string, registration: {
    name: string;
    email: string;
    phone?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.registerForEvent(eventId, registration);
      // Mettre à jour le nombre de participants localement
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, current_participants: (event.current_participants || 0) + 1 }
          : event
      ));
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
  };
};

// Hook pour les analytics
export const useAnalytics = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalCourses: 0,
    totalEvents: 0,
    totalClicks: 0,
    totalRegistrations: 0,
    monthlyViews: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  }, []);

  const trackAction = useCallback(async (itemType: string, itemId: string, action: string) => {
    try {
      await apiService.trackAction(itemType, itemId, action);
    } catch (err: any) {
      console.warn('Erreur de tracking:', err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    fetchStats,
    trackAction,
  };
};

// Hook pour le tableau de bord admin
export const useAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.getDashboard();
      setDashboardData(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement du tableau de bord');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardData,
    loading,
    error,
    fetchDashboard,
  };
};
