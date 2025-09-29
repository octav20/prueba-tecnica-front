// src/modules/auth/hooks/useAuth.js (Sin el estado 'user')

import { useContext } from 'react';
import AuthContext from '../AuthContext';

/**
 * Hook para acceder al estado y las funciones de autenticación.
 * Provee: { token, isAuthenticated, isLoading, login, logout }
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  // Ya no retornamos 'user'
  return context;
};
