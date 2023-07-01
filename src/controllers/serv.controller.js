const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getServices = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM servicio');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los servicios', error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

const createService = async (req, res) => {
    const { tipo, descripcion, precio } = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO servicio (tipo, descripcion, precio) VALUES ($1, $2, $3)',
            [tipo, descripcion, precio]
        );
        res.status(201).json({ message: 'Servicio creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el servicio', error);
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
};

const getServiceByID = async (req, res) => {
    const servicioId = req.params.servicioId;

    try {
        const response = await pool.query('SELECT * FROM servicio WHERE servicio_id = $1', [servicioId]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Servicio no encontrado' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener el servicio', error);
        res.status(500).json({ error: 'Error al obtener el servicio' });
    }
};

const getServiceByType = async (req, res) => {
    const tipo = req.params.tipo;

    try {
        const response = await pool.query('SELECT * FROM servicio WHERE tipo = $1', [tipo]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Servicio no encontrado' });
        } else {
            res.status(200).json(response.rows);
        }
    } catch (error) {
        console.error('Error al obtener el servicio por tipo', error);
        res.status(500).json({ error: 'Error al obtener el servicio por tipo' });
    }
};



const updateService = async (req, res) => {
    const servicioId = req.params.servicioId;
    const { tipo, descripcion, precio } = req.body;

    try {
        const response = await pool.query(
            'UPDATE servicio SET tipo = $1, descripcion = $2, precio = $3 WHERE servicio_id = $4',
            [tipo, descripcion, precio, servicioId]
        );

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Servicio no encontrado' });
        } else {
            res.status(200).json({ message: 'Servicio actualizado exitosamente' });
        }
    } catch (error) {
        console.error('Error al actualizar el servicio', error);
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
};

const deleteService = async (req, res) => {
    const servicioId = req.params.servicioId;

    try {
        const response = await pool.query('DELETE FROM servicio WHERE servicio_id = $1', [servicioId]);

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Servicio no encontrado' });
        } else {
            res.status(200).json({ message: 'Servicio eliminado exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar el servicio', error);
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
};




module.exports = {
    getServices,
    createService,
    getServiceByID,
    updateService,
    deleteService,
    getServiceByType
};
