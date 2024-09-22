import React, { useState, useEffect } from 'react';
import '../css/Formulario.css';

export const Formulario = () => {
  const [formData, setFormData] = useState({
    Notif: '',
    Fecha_Elab: '',
    rpe_elaboronotif: '',
    Tarifa: '',
    Anomalia: '',
    Programa: '',
    Fecha_Insp: '',
    rpe_inspeccion: '',
    tipo: '',
    Fecha_Cal_Recal: '',
    RPE_Calculo: '',
    Fecha_Inicio: '',
    Fecha_Final: '',
    KHW_Total: '',
    Imp_Energia: '',
    Imp_Total: '',
    Nombre: '',
    Direccion: '',
    rpu: '',
    Ciudad: '',
    Cuenta: '',
    Cve_Agen: '',
    Agencia: '',
    Zona_A: '',
    Zona_B: '',
    medidor_inst: '',
    medidor_ret: '',
    Obs_notif: '',
    Obs_edo: ''
  });

  const [oficinas, setOficinas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({
    notif: '',
    year: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOficinas = () => {
    fetch(`http://localhost:3000/api/oficinas?${new URLSearchParams({ ...filters, page: currentPage, limit: 10 })}`)
      .then(response => response.json())
      .then(data => {
        // Verificar que data.data es un array
        if (Array.isArray(data.data)) {
          setOficinas(data.data);
          setTotalPages(data.totalPages); // Asegúrate de que esto esté en la respuesta del backend
        } else {
          console.error('La respuesta del servidor no tiene la estructura esperada:', data);
          setOficinas([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener las oficinas:', error);
        setOficinas([]); // Establecer un array vacío en caso de error
      });
  };
  

  useEffect(() => {
    fetchOficinas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:3000/api/oficinas/${editId}` : 'http://localhost:3000/api/oficinas';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Oficina guardada:', data);
        setFormData({
          Notif: '',
          Fecha_Elab: '',
          rpe_elaboronotif: '',
          Tarifa: '',
          Anomalia: '',
          Programa: '',
          Fecha_Insp: '',
          rpe_inspeccion: '',
          tipo: '',
          Fecha_Cal_Recal: '',
          RPE_Calculo: '',
          Fecha_Inicio: '',
          Fecha_Final: '',
          KHW_Total: '',
          Imp_Energia: '',
          Imp_Total: '',
          Nombre: '',
          Direccion: '',
          rpu: '',
          Ciudad: '',
          Cuenta: '',
          Cve_Agen: '',
          Agencia: '',
          Zona_A: '',
          Zona_B: '',
          medidor_inst: '',
          medidor_ret: '',
          Obs_notif: '',
          Obs_edo: ''
        });
        setEditId(null);
        alert(editId ? 'Oficina actualizada exitosamente' : 'Oficina creada exitosamente');
        fetchOficinas();
      })
      .catch(error => {
        console.error('Error al guardar la oficina:', error);
        alert('Error al guardar la oficina');
      });
  };

  const handleEdit = (oficina) => {
    setFormData({
      Notif: oficina.Notif,
      Fecha_Elab: oficina.Fecha_Elab ? oficina.Fecha_Elab.slice(0, 10) : '',
      rpe_elaboronotif: oficina.rpe_elaboronotif,
      Tarifa: oficina.Tarifa,
      Anomalia: oficina.Anomalia,
      Programa: oficina.Programa,
      Fecha_Insp: oficina.Fecha_Insp ? oficina.Fecha_Insp.slice(0, 10) : '',
      rpe_inspeccion: oficina.rpe_inspeccion,
      tipo: oficina.tipo,
      Fecha_Cal_Recal: oficina.Fecha_Cal_Recal ? oficina.Fecha_Cal_Recal.slice(0, 10) : '',
      RPE_Calculo: oficina.RPE_Calculo,
      Fecha_Inicio: oficina.Fecha_Inicio ? oficina.Fecha_Inicio.slice(0, 10) : '',
      Fecha_Final: oficina.Fecha_Final ? oficina.Fecha_Final.slice(0, 10) : '',
      KHW_Total: oficina.KHW_Total,
      Imp_Energia: oficina.Imp_Energia,
      Imp_Total: oficina.Imp_Total,
      Nombre: oficina.Nombre,
      Direccion: oficina.Direccion,
      rpu: oficina.rpu,
      Ciudad: oficina.Ciudad,
      Cuenta: oficina.Cuenta,
      Cve_Agen: oficina.Cve_Agen,
      Agencia: oficina.Agencia,
      Zona_A: oficina.Zona_A,
      Zona_B: oficina.Zona_B,
      medidor_inst: oficina.medidor_inst,
      medidor_ret: oficina.medidor_ret,
      Obs_notif: oficina.Obs_notif,
      Obs_edo: oficina.Obs_edo
    });
    setEditId(oficina.Id);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oficina?')) {
      fetch(`http://localhost:3000/api/oficinas/${id}`, { method: 'DELETE' })
        .then(response => response.text())
        .then(message => {
          console.log('Oficina eliminada:', message);
          alert('Oficina eliminada exitosamente');
          fetchOficinas();
        })
        .catch(error => {
          console.error('Error al eliminar la oficina:', error);
          alert('Error al eliminar la oficina');
        });
    }
  };

  const applyFilters = () => {
    fetchOficinas();
  };

  const handleCancel = () => {
    setFormData({
      Notif: '',
      Fecha_Elab: '',
      rpe_elaboronotif: '',
      Tarifa: '',
      Anomalia: '',
      Programa: '',
      Fecha_Insp: '',
      rpe_inspeccion: '',
      tipo: '',
      Fecha_Cal_Recal: '',
      RPE_Calculo: '',
      Fecha_Inicio: '',
      Fecha_Final: '',
      KHW_Total: '',
      Imp_Energia: '',
      Imp_Total: '',
      Nombre: '',
      Direccion: '',
      rpu: '',
      Ciudad: '',
      Cuenta: '',
      Cve_Agen: '',
      Agencia: '',
      Zona_A: '',
      Zona_B: '',
      medidor_inst: '',
      medidor_ret: '',
      Obs_notif: '',
      Obs_edo: ''
    });
    setEditId(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchOficinas();
    }
  };
  
  
  return (
    <div>
      <h2>CREAR REGISTRO SINOT</h2>
      <div className='contenedor-registro'>
        <form onSubmit={handleSubmit}>

            <div>
              <label htmlFor="Notif">Notificación</label>
              <input type="text" name="Notif" value={formData.Notif} onChange={handleChange} />
              <label htmlFor="Fecha_Elab">Fecha de Elaboración</label>
              <input type="date" name="Fecha_Elab" value={formData.Fecha_Elab} onChange={handleChange} />
              <label htmlFor="rpe_elaboronotif">RPE Elaboró Notif</label>
              <input type="text" name="rpe_elaboronotif" value={formData.rpe_elaboronotif} onChange={handleChange} />
              <label htmlFor="Tarifa">Tarifa</label>
              <input type="text" name="Tarifa" value={formData.Tarifa} onChange={handleChange} />
              <label htmlFor="Anomalia">Anomalía</label>
              <input type="text" name="Anomalia" value={formData.Anomalia} onChange={handleChange} />
              <label htmlFor="Programa">Programa</label>
              <input type="text" name="Programa" value={formData.Programa} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Fecha_Insp">Fecha de Inspección</label>
              <input type="date" name="Fecha_Insp" value={formData.Fecha_Insp} onChange={handleChange} />
              <label htmlFor="rpe_inspeccion">RPE Inspección</label>
              <input type="text" name="rpe_inspeccion" value={formData.rpe_inspeccion} onChange={handleChange} />
              <label htmlFor="tipo">Tipo</label>
              <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} />
              <label htmlFor="Fecha_Cal_Recal">Fecha Cal/Recal</label>
              <input type="date" name="Fecha_Cal_Recal" value={formData.Fecha_Cal_Recal} onChange={handleChange} />
              <label htmlFor="RPE_Calculo">RPE Cálculo</label>
              <input type="text" name="RPE_Calculo" value={formData.RPE_Calculo} onChange={handleChange} />
              <label htmlFor="Fecha_Inicio">Fecha de Inicio</label>
              <input type="date" name="Fecha_Inicio" value={formData.Fecha_Inicio} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Fecha_Final">Fecha Final</label>
              <input type="date" name="Fecha_Final" value={formData.Fecha_Final} onChange={handleChange} />
              <label htmlFor="KHW_Total">KHW Total</label>
              <input type="number" name="KHW_Total" value={formData.KHW_Total} onChange={handleChange} />
              <label htmlFor="Imp_Energia">Imp Energía</label>
              <input type="number" name="Imp_Energia" value={formData.Imp_Energia} onChange={handleChange} />
              <label htmlFor="Imp_Total">Imp Total</label>
              <input type="number" name="Imp_Total" value={formData.Imp_Total} onChange={handleChange} />
              <label htmlFor="Nombre">Nombre</label>
              <input type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} />
              <label htmlFor="Direccion">Dirección</label>
              <input type="text" name="Direccion" value={formData.Direccion} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="rpu">RPU</label>
              <input type="text" name="rpu" value={formData.rpu} onChange={handleChange} />
              <label htmlFor="Ciudad">Ciudad</label>
              <input type="text" name="Ciudad" value={formData.Ciudad} onChange={handleChange} />
              <label htmlFor="Cuenta">Cuenta</label>
              <input type="text" name="Cuenta" value={formData.Cuenta} onChange={handleChange} />
              <label htmlFor="Cve_Agen">Clave Agencia</label>
              <input type="text" name="Cve_Agen" value={formData.Cve_Agen} onChange={handleChange} />
              <label htmlFor="Agencia">Agencia</label>
              <input type="text" name="Agencia" value={formData.Agencia} onChange={handleChange} />
              <label htmlFor="Zona_A">Zona A</label>
              <input type="text" name="Zona_A" value={formData.Zona_A} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Zona_B">Zona B</label>
              <input type="text" name="Zona_B" value={formData.Zona_B} onChange={handleChange} />
              <label htmlFor="medidor_inst">Medidor Instalado</label>
              <input type="text" name="medidor_inst" value={formData.medidor_inst} onChange={handleChange} />
              <label htmlFor="medidor_ret">Medidor Retirado</label>
              <input type="text" name="medidor_ret" value={formData.medidor_ret} onChange={handleChange} />
              <label htmlFor="Obs_notif">Observaciones Notif</label>
              <input type="text" name="Obs_notif" value={formData.Obs_notif} onChange={handleChange} />
              <label htmlFor="Obs_edo">Observaciones Edo</label>
              <input type="text" name="Obs_edo" value={formData.Obs_edo} onChange={handleChange} />
            </div>
          
          <div>
            <button type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>

      

      <h1>Registros de SINOT</h1>
      <div className='contenedor-filtro'>
        
        <input 
        type="text" 
        name="notif" 
        placeholder='Notificación'
        value={filters.Notif} 
        onChange={handleFilterChange} />
      
        <input 
        type="number" 
        name="year"
        placeholder='Año'
        value={filters.year} 
        onChange={handleFilterChange} /> 

        <button onClick={applyFilters}>Aplicar Filtros</button>
      </div>
      <div className='contenedor-listado'>
        <table>
          <thead className='encabezados-sinot'>
            <tr>
              <th>NOTIF</th>
              <th>FECHA_ELAB</th>
              <th>KHW_TOTAL</th>
              <th>IMP_TOTAL</th>
              <th>NOMBRE</th>
              <th>DIRECCION</th>
              <th>RPU</th>
              <th>CIUDAD</th>
              <th>CUENTA</th>
              <th>AGENCIA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {oficinas.map(oficina => (
              <tr key={oficina.Id}>
                <td>{oficina.Notif}</td>
                <td>{oficina.Fecha_Elab?.slice(0, 10)}</td>
                <td>{oficina.KHW_Total}</td>
                <td>{oficina.Imp_Total}</td>
                <td>{oficina.Nombre}</td>
                <td>{oficina.Direccion}</td>
                <td>{oficina.rpu}</td>
                <td>{oficina.Ciudad}</td>
                <td>{oficina.Cuenta}</td>
                <td>{oficina.Agencia}</td>
                <td>
                  <button className='button-sinot button-sinoteditar' onClick={() => handleEdit(oficina)}>Editar</button>
                  <button className='button-sinot button-sinoteliminar' onClick={() => handleDelete(oficina.Id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pagination-controls'>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage <= 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
