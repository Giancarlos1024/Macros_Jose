import React, { useState, useEffect } from 'react';
import '../css/Formulario.css'; 

export const Formulario = () => {
  const [formData, setFormData] = useState({
    estatus: '',
    nombre: '',
    domicilio: '',
    rpu: '',
    kwh: '',
    importe: '',
    codigo_notificacion: '',
    fecha: '' // Cambiado a fecha para facilitar la gestión
  });
  const [oficinas, setOficinas] = useState([]);
  const [editId, setEditId] = useState(null); // Estado para la oficina a editar

  const [filters, setFilters] = useState({
    codigo_notificacion: '',
    year: ''
  });

  // Función para obtener las oficinas desde el servidor con filtros
  const fetchOficinas = () => {
    fetch('http://localhost:3000/api/oficinas?' + new URLSearchParams(filters))
      .then(response => response.json())
      .then(data => {
        setOficinas(data);
      })
      .catch(error => {
        console.error('Error al obtener las oficinas:', error);
      });
  };

  // Llamar a fetchOficinas cuando el componente se monta
  useEffect(() => {
    fetchOficinas();
  }, []); // Puedes ajustar el array de dependencias si deseas que se actualice en otros casos

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:3000/api/oficinas/${editId}` : 'http://localhost:3000/api/oficinas';
    
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Oficina guardada:', data);
        // Limpiar los datos del formulario
        setFormData({
          estatus: '',
          nombre: '',
          domicilio: '',
          rpu: '',
          kwh: '',
          importe: '',
          codigo_notificacion: '',
          fecha: ''
        });
        setEditId(null); // Resetear el ID de edición
        // Mostrar alerta
        alert(editId ? 'Oficina actualizada exitosamente' : 'Oficina creada exitosamente');
        // Volver a obtener las oficinas después de crear o actualizar
        fetchOficinas();
      })
      .catch(error => {
        console.error('Error al guardar la oficina:', error);
        // Manejar el error aquí, como mostrar un mensaje de error
        alert('Error al guardar la oficina');
      });
  };

  const handleEdit = (oficina) => {
    setFormData({
      estatus: oficina.estatus,
      nombre: oficina.nombre,
      domicilio: oficina.domicilio,
      rpu: oficina.rpu,
      kwh: oficina.kwh,
      importe: oficina.importe,
      codigo_notificacion: oficina.codigo_notificacion,
      fecha: oficina.fecha ? oficina.fecha.slice(0, 10) : '' // Asegúrate de que la fecha esté en formato YYYY-MM-DD
    });
    setEditId(oficina.id); // Guardar el ID para editar
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oficina?')) {
      fetch(`http://localhost:3000/api/oficinas/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.text())
        .then(message => {
          console.log('Oficina eliminada:', message);
          // Mostrar alerta
          alert('Oficina eliminada exitosamente');
          // Volver a obtener las oficinas después de eliminar
          fetchOficinas();
        })
        .catch(error => {
          console.error('Error al eliminar la oficina:', error);
          // Manejar el error aquí, como mostrar un mensaje de error
          alert('Error al eliminar la oficina');
        });
    }
  };

  const applyFilters = () => {
    fetchOficinas();
  };

  const handleCancel = () => {
    setFormData({
      estatus: '',
      nombre: '',
      domicilio: '',
      rpu: '',
      kwh: '',
      importe: '',
      codigo_notificacion: '',
      fecha: ''
    });
    setEditId(null); // Cancelar la edición
  };

  return (
    <div>
      <h1>Registrar Notificación</h1>
      <div className='contenedor-registro'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="estatus">ESTATUS</label>
          <input type="text" name="estatus" value={formData.estatus} onChange={handleChange} />
          <label htmlFor="nombre">NOMBRE</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          <label htmlFor="domicilio">DOMICILIO</label>
          <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} />
          <label htmlFor="rpu">RPU</label>
          <input type="text" name="rpu" value={formData.rpu} onChange={handleChange} />
          <label htmlFor="kwh">KWH</label>
          <input type="text" name="kwh" value={formData.kwh} onChange={handleChange} />
          <label htmlFor="importe">IMPORTE</label>
          <input type="text" name="importe" value={formData.importe} onChange={handleChange} />
          <label htmlFor="codigo_notificacion">NOTIFICACIÓN</label>
          <input type="text" name="codigo_notificacion" value={formData.codigo_notificacion} onChange={handleChange} />
          <label htmlFor="fecha">FECHA</label>
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
          <button className='button-form' type="submit">{editId ? 'Actualizar' : 'Registrar'}</button>
          {editId && <button type="button" onClick={handleCancel} className="button-cancelar">Cancelar</button>}
        </form>
      </div>
      
      <h2>Registro de Datos</h2>
      <div className='FiltrosNotificaciones'>
        <input
          className='filtros'
          type="text" 
          name="codigo_notificacion"
          placeholder='Notificación' 
          value={filters.codigo_notificacion} 
          onChange={handleFilterChange} />

        <input 
          className='filtros'
          type="number" 
          name="year"
          placeholder='Año'
          value={filters.year} 
          onChange={handleFilterChange} />

        <button className='filtros-button' onClick={applyFilters}>Filtrar</button>
      </div>
      
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>ESTATUS</th>
            <th>NOMBRE</th>
            <th>DOMICILIO</th>
            <th>RPU</th>
            <th>KWH</th>
            <th>IMPORTE</th>
            <th>NOTIFICACIÓN</th>
            <th>FECHA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {oficinas.map(oficina => (
            <tr key={oficina.id}>
              {/* <td>{oficina.id}</td> */}
              <td>{oficina.estatus}</td>
              <td>{oficina.nombre}</td>
              <td>{oficina.domicilio}</td>
              <td>{oficina.rpu}</td>
              <td>{oficina.kwh}</td>
              <td>{oficina.importe}</td>
              <td>{oficina.codigo_notificacion}</td>
              <td>{oficina.fecha}</td>
              <td>
                <button className='buttonTable button-editar' onClick={() => handleEdit(oficina)}>Editar</button>
                <button className='buttonTable button-eliminar' onClick={() => handleDelete(oficina.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
