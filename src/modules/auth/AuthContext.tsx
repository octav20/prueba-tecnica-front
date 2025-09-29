
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { loginApi } from '../../api/auth'; 

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // El estado principal ahora almacena el JWT
    const [token, setToken] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState(true); 

    // Cargar token desde el almacenamiento local al inicio
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Configurar el token para TODAS las peticiones de Axios/Fetch
            // API.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        setIsLoading(false);
    }, []);

    // Funcionalidad de LOGIN
    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await loginApi(username, password);
            const receivedToken = response.token;
            
            localStorage.setItem('token', receivedToken);
            
            setToken(receivedToken);
            
        } catch (error) {
            if (error instanceof Error) {
                console.error("Login failed:", error.message);
            } else {
                console.error("Login failed:", error);
            }
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    // Funcionalidad de LOGOUT
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        // delete API.defaults.headers.common['Authorization']; 
    };

    // El objeto de valor que proveeremos a toda la aplicación
    const contextValue = useMemo(() => ({
        token,
        isAuthenticated: !!token, // La autenticación se basa solo en la existencia del token
        isLoading,
        login,
        logout,
    }), [token, isLoading]);

    // if (isLoading) {
    //     return <div>Cargando sesión...</div>; 
    // }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;