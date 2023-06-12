const { Pool } = require('pg');
// connectionString: "postgres://vgfbqjmq:nRcF650YYKV8UMtp_dwT_xVtN0dhxNwh@mahmud.db.elephantsql.com/vgfbqjmq"

const pool = new Pool({
    host: 'localhost',
    user: 'johnprueba',
    password: 'password',
    database: 'nodelogin',
    port: '5432'
});

const getServ = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM servicios');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los servicios', error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};


const getServByType = async (req, res) => {
    try {
        const tipoServ = req.params.tipoServ;

        const response = await pool.query(
            'SELECT * FROM servicios WHERE tipo_serv = $1',
            [tipoServ]
        );

        res.json(response.rows);
    } catch (error) {
        console.error('Error al obtener los servicios por tipo', error);
        res.status(500).json({ error: 'Error al obtener los servicios por tipo' });
    }
};


const getServDescription = async (req, res) => {
    const { tipo_serv } = req.params; // Obtener el tipo de servicio de los parámetros de la solicitud

    try {
        const response = await pool.query('SELECT descripcion FROM servicios WHERE tipo_serv = $1', [tipo_serv]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener las descripciones de el servicio', error);
        res.status(500).json({ error: 'Error al obtener las descripciones de el servicio' });
    }
};

const getServPrice = async (req, res) => {
    const { tipo_serv } = req.params; // Obtener el tipo de servicio de los parámetros de la solicitud

    try {
        const response = await pool.query('SELECT precio FROM servicios WHERE tipo_serv = $1', [tipo_serv]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los precios de las habitaciones', error);
        res.status(500).json({ error: 'Error al obtener los precios de las habitaciones' });
    }
};

const updateSerByTipoServ = async (req, res) => {
    try {
        const tipo_serv = req.params.tipo_hab; // Obtener el tipo de servicio de los parámetros de la solicitud
        const { descripcion, precio } = req.body; // Obtener los datos actualizados de la servicio del cuerpo de la solicitud

        // Realizar la actualización de la servicio en la base de datos
        await pool.query('UPDATE servicios SET descripcion = $1, precio = $2 WHERE tipo_serv = $3', [descripcion, precio, tipo_serv]);

        res.status(200).json({ message: 'Servicio actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la servicio', error);
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
};

const createServ = async (req, res) => {
    try {
        const { descripcion, precio } = req.body; // Obtener los datos de el nuevo servicio del cuerpo de la solicitud

        // Insertar el nuevo servicio en la base de datos
        await pool.query('INSERT INTO servicios (tipo_serv, descripcion, precio) VALUES ($1, $2, $3)', [tipo_serv, descripcion, precio]);

        res.status(201).json({ message: 'Servicio creado correctamente' });
    } catch (error) {
        console.error('Error al crear el Servicios', error);
        res.status(500).json({ error: 'Error al crear el Servicios' });
    }
};

const deleteServByTipo = async (req, res) => {
    try {
        const tipo_serv = req.params.tipo_serv; // Obtener el tipo de servicio de los parámetros de la solicitud

        // Realizar la eliminación de el servicio en la base de datos
        await pool.query('DELETE FROM habitaciones WHERE tipo_serv = $1', [tipo_serv]);

        res.status(200).json({ message: 'Servicio eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar el servicio', error);
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
};



module.exports = {
    getServ,
    getServByType,
    getServDescription,
    getServPrice,
    updateSerByTipoServ,
    createServ,
    deleteServByTipo
}