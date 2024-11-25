const express = require('express');
const db = require('../db'); // Conexión a la base de datos
const router = express.Router();

// Crear un nuevo matrimonio (POST)
router.post('/', (req, res) => {
    const { idEsposo, idEsposa, fecha, lugar } = req.body;

    // Validar que los datos estén presentes
    if (!idEsposo || !idEsposa || !fecha || !lugar) {
        return res.status(400).json({ error: 'Los campos idEsposo, idEsposa, fecha y lugar son obligatorios.' });
    }

    // Consulta SQL para insertar el matrimonio
    const query = `
        INSERT INTO matrimonios (idEsposo, idEsposa, fecha, lugar)
        VALUES (?, ?, ?, ?)
    `;

    // Ejecutar la consulta para insertar el matrimonio
    db.query(query, [idEsposo, idEsposa, fecha, lugar], (err, result) => {
        if (err) {
            console.error('Error al insertar el matrimonio:', err.message);  // Mostrar más detalles del error
            return res.status(500).json({ error: 'Error al insertar el matrimonio en la base de datos.' });
        }
        // Retornar éxito si el matrimonio se ha insertado correctamente
        res.status(201).json({ success: true, matrimonioId: result.insertId });
    });
});

module.exports = router;
