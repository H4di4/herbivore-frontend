import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext); // Auth status from context
  const [localLoading, setLocalLoading] = useState(true);       // Local loading to mimic delay

  useEffect(() => {
    // Simulate a small loading delay (e.g., for smoother UX)
    const timer = setTimeout(() => setLocalLoading(false), 200);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Show loading indicator while auth or local loading is true
  if (loading || localLoading) return <div>Loading...</div>;

  // If authenticated, render child components; otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
