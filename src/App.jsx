import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardHome from './pages/dashboard/DashboardHome.jsx';
import Reports from './pages/reports/Reports.jsx';
import Settings from './pages/settings/Settings.jsx';
import Users from './pages/Users/Users.jsx';
import Business from './pages/Business/Business/Business.jsx';
import ViewBusiness from './pages/Business/ViewBusiness/ViewBusiness.jsx';
import ManageBusiness from './pages/Business/ManageBusiness/ManageBusiness.jsx';
import WhistlezRingtone from './pages/WhistlezRingtone/WhistlezRingtone.jsx';
import Ads from './pages/ads/Ads.jsx';
import Login from './pages/Login/Login.jsx';
import { useAuth } from './context/AuthContext.jsx';
import './App.css';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business"
        element={
          <ProtectedRoute>
            <Business />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business/view"
        element={
          <ProtectedRoute>
            <ViewBusiness />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business/manage"
        element={
          <ProtectedRoute>
            <ManageBusiness />
          </ProtectedRoute>
        }
      />
      <Route
        path="/whistlez-ringtone"
        element={
          <ProtectedRoute>
            <WhistlezRingtone />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ads"
        element={
          <ProtectedRoute>
            <Ads />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  );
}

export default App;
