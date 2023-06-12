const { Pool } = require('pg');
// connectionString: "postgres://vgfbqjmq:nRcF650YYKV8UMtp_dwT_xVtN0dhxNwh@mahmud.db.elephantsql.com/vgfbqjmq"

const pool = new Pool({
    host: 'localhost',
    user: 'johnprueba',
    password: 'password',
    database: 'nodelogin',
    port: '5432'
});

const getHab = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM habitaciones');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las habitaciones' });
    }
};


const getHabByType = async (req, res) => {
    try {
        const tipoHab = req.params.tipoHab; // Obtiene el parámetro tipoHab de la solicitud

        const response = await pool.query(
            'SELECT * FROM habitaciones WHERE tipo_Hab = $1',
            [tipoHab]
        );

        res.json(response.rows);
    } catch (error) {
        console.error('Error al obtener las habitaciones por tipo_Hab', error);
        res.status(500).json({ error: 'Error al obtener las habitaciones por tipo_Hab' });
    }
};

const getAvailableHabByType = async (req, res) => {
    try {
        const tipoHab = req.params.tipoHab; // Obtiene el parámetro tipoHab de la solicitud

        const response = await pool.query(
            'SELECT COUNT(*) AS cantidad FROM habitaciones WHERE tipo_Hab = $1',
            [tipoHab]
        );

        const cantidadHabitaciones = response.rows[0].cantidad;

        res.json({ cantidad: cantidadHabitaciones });
    } catch (error) {
        console.error('Error al obtener la cantidad de habitaciones por tipo_Hab', error);
        res.status(500).json({ error: 'Error al obtener la cantidad de habitaciones por tipo_Hab' });
    }
};

const getHabDescription = async (req, res) => {
    const { tipo_hab } = req.params; // Obtener el tipo de habitación de los parámetros de la solicitud

    try {
        const response = await pool.query('SELECT descripcion FROM habitaciones WHERE tipo_hab = $1', [tipo_hab]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las descripciones de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener las descripciones de las habitaciones' });
    }
};


const getHabPrice = async (req, res) => {
    const { tipo_hab } = req.params; // Obtener el tipo de habitación de los parámetros de la solicitud

    try {
        const response = await pool.query('SELECT precio FROM habitaciones WHERE tipo_hab = $1', [tipo_hab]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los precios de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener los precios de las habitaciones' });
    }
};


const updateHabByTipoHab = async (req, res) => {
    try {
        const tipo_hab = req.params.tipo_hab; // Obtener el tipo de habitación de los parámetros de la solicitud
        const { descripcion, precio } = req.body; // Obtener los datos actualizados de la habitación del cuerpo de la solicitud

        // Realizar la actualización de la habitación en la base de datos
        await pool.query('UPDATE habitaciones SET descripcion = $1, precio = $2 WHERE tipo_hab = $3', [descripcion, precio, tipo_hab]);

        res.status(200).json({ message: 'Habitación actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la habitación', error);
        res.status(500).json({ error: 'Error al actualizar la habitación' });
    }
};


const createHab = async (req, res) => {
    try {
        const { descripcion, precio } = req.body; // Obtener los datos de la nueva habitación del cuerpo de la solicitud

        // Insertar la nueva habitación en la base de datos
        await pool.query('INSERT INTO habitaciones (descripcion, precio, pisoasig, tipo_hab) VALUES ($1, $2, $3, $4)', [descripcion, precio, pisoasig, tipo_hab]);

        res.status(201).json({ message: 'Habitación creada correctamente' });
    } catch (error) {
        console.error('Error al crear la habitación', error);
        res.status(500).json({ error: 'Error al crear la habitación' });
    }
};


const deleteHabByTipoHab = async (req, res) => {
    try {
        const tipo_hab = req.params.tipo_hab; // Obtener el tipo de habitación de los parámetros de la solicitud

        // Realizar la eliminación de la habitación en la base de datos
        await pool.query('DELETE FROM habitaciones WHERE tipo_hab = $1', [tipo_hab]);

        res.status(200).json({ message: 'Habitación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la habitación', error);
        res.status(500).json({ error: 'Error al eliminar la habitación' });
    }
};




module.exports = {
    getHab,
    getHabByType,
    getAvailableHabByType,
    getHabDescription,
    getHabPrice,
    updateHabByTipoHab,
    createHab,
    deleteHabByTipoHab
}