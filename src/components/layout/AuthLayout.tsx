// src/components/layout/AuthLayout.jsx (Conceptual)
import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  // Simplemente un contenedor centrado para el formulario de Login
  return (
    <div className="auth-background">
      {children}
    </div>
  );
};
export default AuthLayout;