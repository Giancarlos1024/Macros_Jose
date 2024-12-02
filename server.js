const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
// Rutas
const loginRoutes = require('./src/Routes/RouterLogin');
const oficinasRoutes = require('./src/Routes/RouterOficinas');
const usuariosRoutes = require('./src/Routes/RouterUsuarios'); // Nueva ruta
const Not_ssb = require('./src/Routes/RouterNot_ssb');
// const Sinot = require('./src/Routes/RouterSinot');
const uploadRoutes = require('./src/Routes/RouterUpload');
const uploadRoutesNot_ssb = require('./src/Routes/RouterUploadNot_ssb');

app.use('/', loginRoutes);
app.use('/api', oficinasRoutes); // Prefijo /api para las rutas de oficinas
app.use('/users', usuariosRoutes); // Prefijo /api para las rutas de usuarios
app.use('/apinotssb', Not_ssb); // Prefijo /api para las rutas de excel
// app.use('/apisinot', Sinot);
app.use('/api', uploadRoutes);
app.use('/apinot', uploadRoutesNot_ssb);
// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
