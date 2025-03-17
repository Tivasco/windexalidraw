import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, logout, loading } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Show loading state
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
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">WebApp Boilerplate</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/components"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  UI Components
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
              <Link
                to="/components"
                className="ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                UI Components
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white">
                {currentUser ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Welcome, {currentUser.username}!</h2>
                    <p className="text-gray-600">You are now logged in.</p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h3 className="text-lg font-medium mb-2">User Information:</h3>
                      <p><strong>ID:</strong> {currentUser.id}</p>
                      <p><strong>Username:</strong> {currentUser.username}</p>
                      <p><strong>Email:</strong> {currentUser.email || 'Not provided'}</p>
                    </div>
                    <div className="mt-6">
                      <Link 
                        to="/components" 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        View UI Components Showcase
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Loading user data...</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard; 