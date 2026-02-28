import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CVEvaluation from './pages/hr/CVEvaluation';
import PolicyManagement from './pages/hr/PolicyManagement';
import TechnicalEvaluation from './pages/hr/TechnicalEvaluation';
import Chat from './pages/autosphere/Chat';
import Bookings from './pages/autosphere/Bookings';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hr">
          <Route path="cv-evaluation" element={<CVEvaluation />} />
          <Route path="policy" element={<PolicyManagement />} />
          <Route path="technical" element={<TechnicalEvaluation />} />
        </Route>
        <Route path="autosphere">
          <Route path="chat" element={<Chat />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
