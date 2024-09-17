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

// Rutas
const loginRoutes = require('./src/Routes/RouterLogin');
const oficinasRoutes = require('./src/Routes/RouterOficinas');

app.use('/', loginRoutes);
app.use('/api', oficinasRoutes); // Prefijo /api para las rutas de oficinas

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
