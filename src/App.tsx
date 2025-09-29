import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import LoginPage from './modules/auth/pages/LoginPage';
import AuthLayout from './components/layout/AuthLayout';
import PrivateRoute from './modules/auth/components/PrivateRoute';
import EmpleadosPageComponent from './modules/empleados/pages/EmpleadosPage';
import ProyectosPageComponent from './modules/proyectos/pages/ProyectosPage';

const App = () => (
  <Router>
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<AuthLayout children={<Outlet />} />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<div>Página de inicio</div>} />
        <Route path="/empleados" element={<EmpleadosPageComponent />} />
        <Route path="/proyectos" element={<ProyectosPageComponent />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
