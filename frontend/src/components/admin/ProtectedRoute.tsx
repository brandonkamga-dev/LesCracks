// src/components/admin/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  // ATTENDRE QUE LE CHARGEMENT SOIT TERMINÉ
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // UNIQUEMENT APRÈS loading = false
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;