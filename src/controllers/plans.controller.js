const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
});

const getPlans = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM plan');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los planes', error);
        res.status(500).json({ error: 'Error al obtener los planes' });
    }
};

const createPlan = async (req, res) => {
    const { tipo, descripcion, precio } = req.body;

    try {
        const response = await pool.query(
            'INSERT INTO plan (tipo, descripcion, precio) VALUES ($1, $2, $3)',
            [tipo, descripcion, precio]
        );
        res.status(201).json({ message: 'Plan creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el plan', error);
        res.status(500).json({ error: 'Error al crear el plan' });
    }
};

const getPlanByID = async (req, res) => {
    const planId = req.params.planId;

    try {
        const response = await pool.query('SELECT * FROM plan WHERE plan_id = $1', [planId]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Plan no encontrado' });
        } else {
            res.status(200).json(response.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener el plan', error);
        res.status(500).json({ error: 'Error al obtener el plan' });
    }
};

const updatePlan = async (req, res) => {
    const planId = req.params.planId;
    const { tipo, descripcion, precio } = req.body;

    try {
        const response = await pool.query(
            'UPDATE plan SET tipo = $1, descripcion = $2, precio = $3 WHERE plan_id = $4',
            [tipo, descripcion, precio, planId]
        );

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Plan no encontrado' });
        } else {
            res.status(200).json({ message: 'Plan actualizado exitosamente' });
        }
    } catch (error) {
        console.error('Error al actualizar el plan', error);
        res.status(500).json({ error: 'Error al actualizar el plan' });
    }
};

const deletePlan = async (req, res) => {
    const planId = req.params.planId;

    try {
        const response = await pool.query('DELETE FROM plan WHERE plan_id = $1', [planId]);

        if (response.rowCount === 0) {
            res.status(404).json({ error: 'Plan no encontrado' });
        } else {
            res.status(200).json({ message: 'Plan eliminado exitosamente' });
        }
    } catch (error) {
        console.error('Error al eliminar el plan', error);
        res.status(500).json({ error: 'Error al eliminar el plan' });
    }
};


module.exports = {
    getPlans,
    createPlan,
    getPlanByID,
    updatePlan,
    deletePlan
};
