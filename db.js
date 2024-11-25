const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',      // Cambia si tu servidor no está en localhost
  user: 'root',           // Usuario de MySQL
  password: '',           // Contraseña del usuario de MySQL
  database: 'registroCivil', // Cambia al nombre de tu base de datos
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = db;
