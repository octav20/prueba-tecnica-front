// src/modules/auth/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MainLayoutComponent from '../../../components/layout/MainLayout';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth(); // Usar isLoading aquí es clave

  // 1. Si todavía está cargando (leyendo token), no hagas nada, muestra un loader.
  if (isLoading) {
    return <div>Cargando sesión...</div>; 
  }

  // 2. Si NO está logueado, redirige a Login.
  if (!isAuthenticated) {
    // Guarda la ruta actual para redirigir después del login (opcional, pero útil)
    return <Navigate to="/login" replace />; 
  }

  // 3. Si SÍ está logueado, renderiza el contenido
  return (
    <MainLayoutComponent>
      <Outlet /> 
    </MainLayoutComponent>
  );
};

export default PrivateRoute;