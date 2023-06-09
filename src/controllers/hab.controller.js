const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getRooms = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM habitacion');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las habitaciones' });
    }
};

const createRoom = async (req, res) => {
    const { numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion } = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO habitacion (numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion]
        );
        res.status(201).json({ message: 'Habitación creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la habitación', error);
        res.status(500).json({ error: 'Error al crear la habitación' });
    }
};

const getRoomByID = async (req, res) => {
    const habitacionId = req.params.habitacionId;

    try {
        const response = await pool.query('SELECT * FROM habitacion WHERE habitacion_id = $1', [habitacionId]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener la habitación', error);
        res.status(500).json({ error: 'Error al obtener la habitación' });
    }
};

const getRoomByType = async (req, res) => {
    const tipo = req.params.tipo;

    try {
        const response = await pool.query('SELECT * FROM habitacion WHERE tipo = $1', [tipo]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
        } else {
            res.status(200).json(response.rows);
        }
    } catch (error) {
        console.error('Error al obtener la habitación por tipo', error);
        res.status(500).json({ error: 'Error al obtener la habitación por tipo' });
    }
};




const updateRoom = async (req, res) => {
    const habitacionId = req.params.habitacionId;
    const { numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion } = req.body;

    try {
        const response = await pool.query(
            'UPDATE habitacion SET numero = $1, tipo = $2, capacidad = $3, precio = $4, servicios_basicos = $5, piso_asignado = $6, fecha_dispo = $7, descripcion = $8 WHERE habitacion_id = $9',
            [numero, tipo, capacidad, precio, servicios_basicos, piso_asignado, fecha_dispo, descripcion, habitacionId]
        );

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
        } else {
            res.status(200).json({ message: 'Habitación actualizada exitosamente' });
        }
    } catch (error) {
        console.error('Error al actualizar la habitación', error);
        res.status(500).json({ error: 'Error al actualizar la habitación' });
    }
};

const deleteRoom = async (req, res) => {
    const habitacionId = req.params.habitacionId;

    try {
        const response = await pool.query('DELETE FROM habitacion WHERE habitacion_id = $1', [habitacionId]);

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
        } else {
            res.status(200).json({ message: 'Habitación eliminada exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar la habitación', error);
        res.status(500).json({ error: 'Error al eliminar la habitación' });
    }
};
/*
const getBestRoom = async (req, res) => {
    const fecha = req.params.fecha;
    const tipo = req.params.tipo;

    try {
        const response = await pool.query('SELECT * FROM habitacion where (tipo = $1 and fecha_dispo <= $2 and fecha_dispo = (select max(fecha_dispo) from habitacion))',
         [tipo, fecha]
         );

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Habitación no encontrada' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener la habitación', error);
        res.status(500).json({ error: 'Error al obtener la habitación' });
    }
};*/

const getBestRoom = async (req, res) => {
    const {tipo, fecha} = req.body;
    try {
        const response = await pool.query('SELECT habitacion_id FROM habitacion where tipo = $1 and fecha_dispo <= $2 and fecha_dispo = (select max(fecha_dispo) from habitacion)',
        [tipo, fecha]
        );
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las habitaciones' });}
    }

const countRooms = async (req, res) => {
    try {
        const response = await pool.query('SELECT COUNT(*) FROM habitacion');
        const count = parseInt(response.rows[0].count);
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al contar las habitaciones:', error);
        res.status(500).json({ error: 'Error al contar las habitaciones' });
    }
};

module.exports = {
    getRooms,
    createRoom,
    getRoomByID,
    updateRoom,
    deleteRoom,
    getRoomByType,
    getBestRoom,
    countRooms
};

