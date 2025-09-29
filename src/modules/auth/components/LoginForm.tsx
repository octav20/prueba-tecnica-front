/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
const LoginFormComponent = () => {
        const { isAuthenticated, login, isLoading } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

           if (isAuthenticated) {
        return <Navigate to="/" replace />; 
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Formulario enviado');

        try {
           await login(username, password);
           navigate('/', { replace: true });
           setMensaje('');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || 'Hubo un problema al intentar iniciar sesión.');
                setMensaje(error.message);
            }
        }
    };

  return (
    <div>
        <div hidden={error === ''} className="toast  toast-top toast-end">
  <div className="alert alert-error">
    <span>{error}</span>
  </div>
</div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Inicio de Sesion</legend>

          <label className="label">Nombre de usuario</label>
          <input
            type="text"
            className="input validator"
            required
            placeholder="Nombre de usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <label className="label">Contraseña</label>
          <input
            type="password"
            className="input validator "
            required
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={!username || !password}
            className="btn btn-neutral "
          >
            Iniciar Sesion
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginFormComponent;
