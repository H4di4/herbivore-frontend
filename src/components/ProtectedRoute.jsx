import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    // mimic auth load time if needed
    setTimeout(() => setLocalLoading(false), 200);
  }, []);

  if (loading || localLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
