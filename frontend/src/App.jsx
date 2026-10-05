import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import SymptomChecker from './pages/SymptomChecker';
import ImageChecker from './pages/ImageChecker';
import AnalysisResult from './pages/AnalysisResult';
import NearbyHealthcare from './pages/NearbyHealthcare';
import EmergencyPage from './pages/EmergencyPage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-black text-sky-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        The healthcare page you were looking for doesn't exist or has been relocated.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs shadow-md"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="symptom-checker" element={<SymptomChecker />} />
              <Route path="image-checker" element={<ImageChecker />} />
              <Route path="result" element={<AnalysisResult />} />
              <Route path="nearby-healthcare" element={<NearbyHealthcare />} />
              <Route path="emergency" element={<EmergencyPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />

              {/* Protected User Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
