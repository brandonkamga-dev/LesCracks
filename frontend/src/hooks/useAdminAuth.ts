// src/hooks/useAdminAuth.ts
import { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';

interface Admin {
  id_admin: number;
  name: string;
  email: string;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifie UNIQUEMENT au chargement de la page
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await adminApi.verifyToken();
        if (data?.success) {
          setAdmin(data.data.admin);
          setIsAuthenticated(true);
        }
      } catch {
        localStorage.removeItem('adminToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await adminApi.login(email, password);
      if (response.success) {
        setAdmin(response.data.admin);
        setIsAuthenticated(true); // MET À JOUR ICI
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  const logout = () => {
    adminApi.logout();
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return { isAuthenticated, admin, loading, login, logout };
};