const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getManagers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM gerente');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los gerentes', error);
        res.status(500).json({ error: 'Error al obtener los gerentes' });
    }
};

const createManager = async (req, res) => {
    const { dni, nombres, apellidos, email } = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO gerente (dni, nombres, apellidos, email) VALUES ($1, $2, $3, $4)',
            [dni, nombres, apellidos, email]
        );
        res.status(201).json({ message: 'Gerente creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el gerente', error);
        res.status(500).json({ error: 'Error al crear el gerente' });
    }
};

const getManagerByDNI = async (req, res) => {
    const dni = req.params.dni;

    try {
        const response = await pool.query('SELECT * FROM gerente WHERE dni = $1', [dni]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Gerente no encontrado' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener el gerente', error);
        res.status(500).json({ error: 'Error al obtener el gerente' });
    }
};

const updateManager = async (req, res) => {
    const dni = req.params.dni;
    const { nombres, apellidos, email } = req.body;

    try {
        const response = await pool.query(
            'UPDATE gerente SET nombres = $1, apellidos = $2, email = $3 WHERE dni = $4',
            [nombres, apellidos, email, dni]
        );

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Gerente no encontrado' });
        } else {
            res.status(200).json({ message: 'Gerente actualizado exitosamente' });
        }
    } catch (error) {
        console.error('Error al actualizar el gerente', error);
        res.status(500).json({ error: 'Error al actualizar el gerente' });
    }
};

const deleteManager = async (req, res) => {
    const dni = req.params.dni;

    try {
        const response = await pool.query('DELETE FROM gerente WHERE dni = $1', [dni]);

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Gerente no encontrado' });
        } else {
            res.status(200).json({ message: 'Gerente eliminado exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar el gerente', error);
        res.status(500).json({ error: 'Error al eliminar el gerente' });
    }
};

module.exports = {
    getManagers,
    createManager,
    getManagerByDNI,
    updateManager,
    deleteManager
};
