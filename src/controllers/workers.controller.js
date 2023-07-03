const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getEmployees = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM empleado');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los empleados', error);
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
};

const createEmployee = async (req, res) => {
    const { dni, nombres, apellidos, email, puesto } = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO empleado (dni, nombres, apellidos, email, puesto) VALUES ($1, $2, $3, $4, $5)',
            [dni, nombres, apellidos, email, puesto]
        );
        res.status(201).json({ message: 'Empleado creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el empleado', error);
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
};

const getEmployeeByDNI = async (req, res) => {
    const dni = req.params.dni;

    try {
        const response = await pool.query('SELECT * FROM empleado WHERE dni = $1', [dni]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Empleado no encontrado' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener el empleado', error);
        res.status(500).json({ error: 'Error al obtener el empleado' });
    }
};

const updateEmployee = async (req, res) => {
    const dni = req.params.dni;
    const { nombres, apellidos, email, puesto } = req.body;

    try {
        const response = await pool.query(
            'UPDATE empleado SET nombres = $1, apellidos = $2, email = $3, puesto = $4 WHERE dni = $5',
            [nombres, apellidos, email, puesto, dni]
        );

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Empleado no encontrado' });
        } else {
            res.status(200).json({ message: 'Empleado actualizado exitosamente' });
        }
    } catch (error) {
        console.error('Error al actualizar el empleado', error);
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
};

const deleteEmployee = async (req, res) => {
    const dni = req.params.dni;

    try {
        const response = await pool.query('DELETE FROM empleado WHERE dni = $1', [dni]);

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Empleado no encontrado' });
        } else {
            res.status(200).json({ message: 'Empleado eliminado exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar el empleado', error);
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
};

const countEmployees = async (req, res) => {
    try {
        const response = await pool.query('SELECT COUNT(*) FROM empleado');
        const count = parseInt(response.rows[0].count);
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al contar los empleados:', error);
        res.status(500).json({ error: 'Error al contar los empleados' });
    }
};

module.exports = {
    getEmployees,
    createEmployee,
    getEmployeeByDNI,
    updateEmployee,
    deleteEmployee,
    countEmployees
};


