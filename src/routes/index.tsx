import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WelcomePage from '../pages/WelcomePage';
import DashboardPage from '../pages/DashboardPage';
import ComponentsShowcase from '../pages/ComponentsShowcase';
import PageLayoutsShowcase from '../pages/PageLayoutsShowcase';
import BoardListPage from '../pages/BoardListPage';
import BoardEditorPage from '../pages/BoardEditorPage';

// Protected route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return authenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<WelcomePage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/components"
        element={
          <ProtectedRoute>
            <ComponentsShowcase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/layouts"
        element={
          <ProtectedRoute>
            <PageLayoutsShowcase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/excalidraw"
        element={
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/excalidraw/:id"
        element={
          <ProtectedRoute>
            <BoardEditorPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}; 