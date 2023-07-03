const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getReservaHab = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM reserva_habitacion');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las reservas de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las reservas de las habitaciones' });
    }
};

const getReservaHabByID = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM reserva_habitacion');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las reservas de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las reservas de las habitaciones' });
    }
};

const createReservaHab = async (req, res) => {
    const {reserva_id, habitacion_id} = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO reserva_habitacion (reserva_id, habitacion_id) VALUES ($1, $2)',            
            [reserva_id, habitacion_id]
        );
        res.status(201).json({ message: 'Reserva de habitacion creada con exito'});
    } catch (error) {
        console.error('Error al crear el servicio', error);
        res.status(500).json({ error: 'Error al crear reserva de habitacion'});
    }
};

module.exports = {
    getReservaHab,
    createReservaHab,
    getReservaHabByID
};