const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});


const contactoUser = async (req, res) => {
    try {
        const { nombres, apellidos, email, telefono, tipo, mensaje } = req.body;

        // Ejecuta la consulta SQL para insertar los datos en la tabla de contacto
        const query =
            'INSERT INTO contacto (nombres, apellidos, correo_electronico, numero_telefono, tipo, mensaje) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [nombres, apellidos, email, telefono, tipo, mensaje];

        await pool.query(query, values);
        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ error: 'Error al insertar en la base de datos' });
    }
};


const getMensajesPorTipo = async (req, res) => {
    const { tipo } = req.params;

    try {
        const response = await pool.query('SELECT * FROM contacto WHERE tipo = $1', [tipo]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los mensajes por tipo', error);
        res.status(500).json({ error: 'Error al obtener los mensajes por tipo' });
    }
};

const getMensajes = async (req, res) => {
    try {
        const query = 'SELECT * FROM contacto'; // Consulta SQL para seleccionar todos los mensajes
        const response = await pool.query(query);
        const mensajes = response.rows;
        res.status(200).json(mensajes);
    } catch (error) {
        console.error('Error al obtener los mensajes', error);
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
};

const countMensajes = async (req, res) => {
    try {
        const response = await pool.query('SELECT COUNT(*) FROM contacto');
        const count = parseInt(response.rows[0].count);
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al contar los mensajes:', error);
        res.status(500).json({ error: 'Error al contar los mensajes' });
    }
};

module.exports = {
    contactoUser,
    getMensajesPorTipo,
    getMensajes,
    countMensajes
};


