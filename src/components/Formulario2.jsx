import React, { useState, useEffect } from 'react';
import '../css/Not_ssb.css';

export const Formulario2 = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    Id: '',
    Falla: '',
    Notif: '',
    Zona: '',
    Agencia: '',
    Nombre: '',
    Tarifa: '',
    RPU: '',
    Cuenta: '',
    Elaboro: '',
    Kwh: '',
    Energia: '',
    Total: '',
    Fecha_Ultimo_Status: '',
    Status_Actual: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [filters, setFilters] = useState({
    notif: '',
    year: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchRecords = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:3000/apinotssb/notssb?page=${page}&pageSize=10`);
      const data = await response.json();
      setRecords(data);
      
      // Obtener el conteo total de registros
      const countResponse = await fetch(`http://localhost:3000/apinotssb/recordcount?notif=${filters.notif}&year=${filters.year}`);
      const countData = await countResponse.json();
      const totalRecords = countData.count;
      setTotalPages(Math.ceil(totalRecords / 10));
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convierte las fechas al formato que el servidor espera
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toISOString();
    };
  
    const formData = {
      ...form,
      Elaboro: formatDate(form.Elaboro),
      Fecha_Ultimo_Status: formatDate(form.Fecha_Ultimo_Status),
    };
  
    try {
      if (editing) {
        await fetch(`http://localhost:3000/apinotssb/notssb/${currentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setRecords(records.map((record) =>
          record.Id === currentId ? { ...formData, Id: currentId } : record
        ));
      } else {
        const response = await fetch('http://localhost:3000/apinotssb/notssb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const newRecord = await response.json();
        setRecords([...records, newRecord]);
      }
      setForm({
        Id: '',
        Falla: '',
        Notif: '',
        Zona: '',
        Agencia: '',
        Nombre: '',
        Tarifa: '',
        RPU: '',
        Cuenta: '',
        Elaboro: '',
        Kwh: '',
        Energia: '',
        Total: '',
        Fecha_Ultimo_Status: '',
        Status_Actual: ''
      });
      setEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/apinotssb/notssb/${id}`);
      const data = await response.json();
  
      // Convierte las fechas al formato requerido por `datetime-local`
      const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 16);
      };
  
      setForm({
        ...data,
        Elaboro: formatDateTime(data.Elaboro),
        Fecha_Ultimo_Status: formatDateTime(data.Fecha_Ultimo_Status),
      });
  
      setEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error fetching record for editing:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/apinotssb/notssb/${id}`, {
        method: 'DELETE',
      });
      setRecords(records.filter((record) => record.Id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const applyFilters = async () => {
    try {
      const queryParams = new URLSearchParams({...filters, page: currentPage, pageSize: 10}).toString();
      const response = await fetch(`http://localhost:3000/apinotssb/notssb?${queryParams}`);
      const data = await response.json();
      setRecords(data);
      
      // Obtener el conteo total de registros
      const countResponse = await fetch(`http://localhost:3000/apinotssb/recordcount?${queryParams}`);
      const countData = await countResponse.json();
      const totalRecords = countData.count;
      setTotalPages(Math.ceil(totalRecords / 10));
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchRecords(newPage);
  };
  

  return (
    <div>
      <h2>{editing ? 'MODIFICAR REGISTRO NOT SSB' : 'CREAR REGISTRO NOT SSB'}</h2>
      <form className='form-notsbb' onSubmit={handleSubmit}>
        {/* <div>
          <label>ID</label>
          <input
            type="text"
            name="Id"
            value={form.Id}
            onChange={handleChange}
            disabled={editing} // No permitir modificar ID al editar
          />
        </div> */}
        <div>
          <div>
            <label>FALLA</label>
            <input
              type="text"
              name="Falla"
              value={form.Falla}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>NOTIF</label>
            <input
              type="text"
              name="Notif"
              value={form.Notif}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>ZONA</label>
            <input
              type="text"
              name="Zona"
              value={form.Zona}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>AGENCIA</label>
            <input
              type="text"
              name="Agencia"
              value={form.Agencia}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>NOMBRE</label>
            <input
              type="text"
              name="Nombre"
              value={form.Nombre}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>TARIFA</label>
            <input
              type="text"
              name="Tarifa"
              value={form.Tarifa}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>RPU</label>
            <input
              type="text"
              name="RPU"
              value={form.RPU}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>CUENTA</label>
            <input
              type="text"
              name="Cuenta"
              value={form.Cuenta}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>ELABORO</label>
            <input
              type="datetime-local"
              name="Elaboro"
              value={form.Elaboro}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>KWH</label>
            <input
              type="text"
              name="Kwh"
              value={form.Kwh}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>ENERGIA</label>
            <input
              type="text"
              name="Energia"
              value={form.Energia}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>TOTAL</label>
            <input
              type="text"
              name="Total"
              value={form.Total}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>FECHA_ULTIMO_STATUS</label>
            <input
              type="datetime-local"
              name="Fecha_Ultimo_Status"
              value={form.Fecha_Ultimo_Status}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>STATUS_ACTUAL</label>
            <input
              type="text"
              name="Status_Actual"
              value={form.Status_Actual}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='botones-bot'>
          <button className='button-notssb' type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
          {editing && <button type="button" className='button-notssb' onClick={() => { setEditing(false); setCurrentId(null); setForm({ Id: '', Falla: '', Notif: '', Zona: '', Agencia: '', Nombre: '', Tarifa: '', RPU: '', Cuenta: '', Elaboro: '', Kwh: '', Energia: '', Total: '', Fecha_Ultimo_Status: '', Status_Actual: '' }); }}>Cancelar</button>}
        </div>
      </form>
      <h2>REGISTROS DE NOT SSB</h2>
      <div className='contenedor-filtro'>
        <input 
          type="text" 
          name="notif" 
          placeholder='Notificación'
          value={filters.notif} 
          onChange={handleFilterChange} 
        />
        <input 
          type="number" 
          name="year"
          placeholder='Año'
          value={filters.year} 
          onChange={handleFilterChange} 
        />
        <button onClick={applyFilters}>Aplicar Filtros</button>
      </div>

      <div className='contenedor-listado'>
        <table>
          <thead className='encabezados-notssb'>
            <tr>
              <th>FALLA</th>
              <th>NOTIF</th>
              <th>ZONA</th>
              <th>AGENCIA</th>
              <th>TARIFA</th>
              <th>RPU</th>
              <th>CUENTA</th>
              <th>NOMBRE</th>
              <th>ELABORO</th>
              <th>KWH</th>
              <th>ENERGIA</th>
              <th>TOTAL</th>
              <th>FECHA_U_S</th>
              <th>STATUS_A</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.Id}>
                <td>{record.Falla}</td>
                <td>{record.Notif}</td>
                <td>{record.Zona}</td>
                <td>{record.Agencia}</td>
                <td>{record.Tarifa}</td>
                <td>{record.RPU}</td>
                <td>{record.Cuenta}</td>
                <td>{record.Nombre}</td>
                <td>{record.Elaboro}</td>
                <td>{record.Kwh}</td>
                <td>{record.Energia}</td>
                <td>{record.Total}</td>
                <td>{record.Fecha_Ultimo_Status}</td>
                <td>{record.Status_Actual}</td>
                <td>
                  <button className='tabla-notsbb tablebutton-editar' onClick={() => handleEdit(record.Id)}>Editar</button>
                  <button className='tabla-notsbb tablebutton-eliminar' onClick={() => handleDelete(record.Id)}>Eliminar</button>
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
