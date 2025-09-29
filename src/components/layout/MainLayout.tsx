// src/components/layout/MainLayout.jsx (Conceptual)
import React from 'react'; // Si tienes un Header
import NavbarComponent from './Navbar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom'; // O NavLink si estás usando React Router
type MainLayoutProps = React.PropsWithChildren<object>;

const MainLayoutComponent: React.FC<MainLayoutProps> = ({ children }) => {

  
    
  return (

    <div id='sidebar' className='drawer' >
  <input id="my-drawer" type="checkbox"  className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
            <NavbarComponent />
    <main>{children}</main>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    {/* Icono de Administrador */}
    
    <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
    {/* Modulos Empleados y proyectos */}
    <li><Link className='mb-4' to='/empleados'>
    <PeopleAltIcon fontSize='large' className='inline mr-2' />
      
      Modulo Empleados</Link></li>
    <li><Link className='mb-4' to='/proyectos'>
      <ListAltIcon fontSize='large' className='inline mr-2' />
      Modulo Proyectos</Link></li>
    </ul>
  </div>
</div>
    // <div className="app-container">
    //   <Sidebar />
    //   <div className="content-area">
    //     <Header />
    //     <main>{children}</main> // Aquí se inyectará el contenido de la página (Ej. EmployeeList)
    //   </div>
    // </div>
  );
};
export default MainLayoutComponent;