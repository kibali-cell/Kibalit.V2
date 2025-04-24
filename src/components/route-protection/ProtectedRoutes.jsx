// src/components/route-protection/ProtectedRoutes.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Protected Route component - prevents access when not logged in
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login and remember where they were trying to go
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
};

// Auth Route component - prevents access when already logged in
export const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  
  if (isAuthenticated) {
    // Redirect to home if already logged in
    return <Navigate to={from} replace />;
  }
  
  return children;
};