// src/components/PrivateRoute.jsx

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // get token from storage
  const isAuthenticated = !!token;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


export default ProtectedRoute;
