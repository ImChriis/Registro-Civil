const express = require('express');
const db = require('../db'); // Ruta correcta a db.js
const router = express.Router();

// Crear una nueva persona (POST)
router.post('/', (req, res) => {
    const { esposo, esposa } = req.body; // Extraer los datos de esposo y esposa

    // Validar que los datos obligatorios estén presentes para ambos
    if (!esposo.nombre || !esposo.apellido || !esposo.cedula || !esposa.nombre || !esposa.apellido || !esposa.cedula) {
        return res.status(400).json({ error: 'Los campos nombre, apellido y cédula son obligatorios.' });
    }

    // Consultas SQL para insertar las personas (esposo y esposa)
    const queryEsposo = `
        INSERT INTO personas (nombre, apellido, genero, cedula, telefono, direccion, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const queryEsposa = `
        INSERT INTO personas (nombre, apellido, genero, cedula, telefono, direccion, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al iniciar la transacción.' });
        }

        // Insertar esposo
        db.query(queryEsposo, [esposo.nombre, esposo.apellido, esposo.genero, esposo.cedula, esposo.telefono, esposo.direccion, esposo.email], (err, resultEsposo) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Error al insertar al esposo.' });
                });
            }

            const idEsposo = resultEsposo.insertId;

            // Insertar esposa
            db.query(queryEsposa, [esposa.nombre, esposa.apellido, esposa.genero, esposa.cedula, esposa.telefono, esposa.direccion, esposa.email], (err, resultEsposa) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Error al insertar a la esposa.' });
                    });
                }

                const idEsposa = resultEsposa.insertId;

                // Commit de la transacción si todo ha ido bien
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Error al hacer commit de la transacción.' });
                        });
                    }

                    // Devolver los ids de las personas
                    res.status(201).json({
                        success: true,
                        idEsposo,
                        idEsposa
                    });
                });
            });
        });
    });
});

// Exportar el router
module.exports = router;
