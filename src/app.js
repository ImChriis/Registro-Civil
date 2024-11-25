const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db'); // Ruta correcta a db.js (debe estar en la raíz del proyecto)
const cors = require('cors');

const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para manejar JSON y datos de formularios
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas para personas y matrimonios
const personasRoutes = require('../routes/personas'); // Ruta para CRUD de personas
const matrimoniosRoutes = require('../routes/matrimonios'); // Ruta para CRUD de matrimonios

// Registrar las rutas
app.use('/personas', personasRoutes); // Rutas para personas
app.use('/matrimonios', matrimoniosRoutes); // Rutas para matrimonios

// Puerto donde se ejecutará el servidor
const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
