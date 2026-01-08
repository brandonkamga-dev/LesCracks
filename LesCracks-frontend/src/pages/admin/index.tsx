// src/pages/admin/index.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/admin/ProtectedRoute';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminCourses from './AdminCourses';
import AdminEvents from './AdminEvents';
import AdminTags from './AdminTag';
import AdminCategories from './AdminCategories';
import AdminDocuments from './AdminDocuments';

const AdminRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/courses/*" element={<AdminCourses />} />
          <Route path="/events/*" element={<AdminEvents />} />
          <Route path="/tags" element={<AdminTags />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/documents" element={<AdminDocuments />} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminRoutes;