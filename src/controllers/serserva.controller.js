const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getReserva = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM reserva');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las reservas de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las reservas de las habitaciones' });
    }
};


const createReserva = async (req, res) => {
    const {id, habitacion_id, plan_id, servicio_id, fecha_inicio, fecha_fin, estado} = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO reserva (id, habitacion_id, plan_id, servicio_id, fecha_inicio, fecha_fin, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)',            
            [id, habitacion_id, plan_id, servicio_id, fecha_inicio, fecha_fin, estado]
        );
        res.status(201).json({message : "Creado con exito"});
    } catch (error) {
        console.error('Error al crear el servicio', error);
        res.status(500).json({ error: 'Error al crear reserva de habitacion'});
    }
};

const getLastReserva = async (req, res) => {
    try {
        const response = await pool.query('SELECT max(reserva_id) from reserva');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las reservas de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las reservas de las habitaciones' });
    }
};

module.exports = {
    getReserva,
    createReserva,
    getLastReserva
};