const pool = require('../Config/conexion');

// Crear una nueva oficina
exports.create = (req, res) => {
  const { estatus, nombre, domicilio, rpu, kwh, importe, codigo_notificacion, fecha } = req.body;
  const sql = 'INSERT INTO oficinas_notificacion (estatus, nombre, domicilio, rpu, kwh, importe, codigo_notificacion, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(sql, [estatus, nombre, domicilio, rpu, kwh, importe, codigo_notificacion, fecha], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear la oficina' });
    } else {
      res.status(201).json({ message: 'Oficina creada exitosamente' });
    }
  });
};

// Obtener todas las oficinas con filtros
exports.getAll = (req, res) => {
  const { codigo_notificacion, year } = req.query;
  let sql = 'SELECT * FROM oficinas_notificacion';
  const queryParams = [];

  if (codigo_notificacion || year) {
    sql += ' WHERE';
    if (codigo_notificacion) {
      sql += ' codigo_notificacion = ?';
      queryParams.push(codigo_notificacion);
    }
    if (year) {
      if (queryParams.length > 0) sql += ' AND';
      sql += ' YEAR(fecha) = ?';
      queryParams.push(year);
    }
  }

  pool.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener las oficinas');
    } else {
      res.status(200).json(results);
    }
  });
};

// Actualizar una oficina
exports.update = (req, res) => {
  const { id } = req.params;
  const { estatus, nombre, domicilio, rpu, kwh, importe, codigo_notificacion, fecha } = req.body;
  const sql = 'UPDATE oficinas_notificacion SET estatus = ?, nombre = ?, domicilio = ?, rpu = ?, kwh = ?, importe = ?, codigo_notificacion = ?, fecha = ? WHERE id = ?';
  pool.query(sql, [estatus, nombre, domicilio, rpu, kwh, importe, codigo_notificacion, fecha, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar la oficina');
    } else {
        res.status(200).json({ message: 'Oficina actualizada' });

    }
  });
};

// Eliminar una oficina
exports.delete = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM oficinas_notificacion WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar la oficina');
    } else {
      res.status(200).send('Oficina eliminada');
    }
  });
};
