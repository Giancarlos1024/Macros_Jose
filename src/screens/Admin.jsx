import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username'); // Limpia el nombre de usuario también
    navigate('/');
  };

  const confirmLogout = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#81BB49',
      cancelButtonColor: '#B1B1B1',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire(
          'Cerrado!',
          'Tu sesión ha sido cerrada.',
          'success'
        )
      }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className='headerLogo'>
          <img className='logoStyle' src="/img/LogoNotix.jpeg" alt="Error" />
        </div>
        <div className="nav-container">
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/admin/panel"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <div className="active-bar"></div>}
                      <img src={isActive ? "/img/homeActivo.png" : "/img/home.png"} alt="error" className='iconNavDashboard' />
                      Panel de control
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/formulario"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <div className="active-bar"></div>}
                      <img src={isActive ? "/img/ingresarfacturasActivo.png" : "/img/ingresarfacturas.png"} alt="error" className='iconNavDashboard' />
                      Ingresar datos
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <button onClick={confirmLogout} className="logout-button">
          <img src="/img/close.png" alt="error" className='iconNavDashboard' />
          Cerrar sesión
        </button>
      </div>
      <div className="containerPanel">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
