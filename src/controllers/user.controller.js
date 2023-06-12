const { Pool } = require('pg');
// connectionString: "postgres://vgfbqjmq:nRcF650YYKV8UMtp_dwT_xVtN0dhxNwh@mahmud.db.elephantsql.com/vgfbqjmq"

const pool = new Pool({
    host: 'localhost',
    user: 'johnprueba',
    password: 'password',
    database: 'nodelogin',
    port: '5432'
});

const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM users');
        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener los usuarios', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const getUsersById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);

};

const createUsers = async (req, res) => {
    const { nombres, apellidos, email, contrasena } = req.body
    if (!nombres || !apellidos || !email || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const response = await pool.query('INSERT INTO users (nombres, apellidos, email, contrasena) VALUES ($1, $2, $3, $4)', [nombres, apellidos, email, contrasena])
    console.log(response);
    res.json({
        message: 'Usser Added Succesfully',
        body: {
            user: { nombres, apellidos, email, contrasena }
        }
    })
};

const login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        // Realiza una consulta para verificar el email y la contraseña en la base de datos
        const query = 'SELECT * FROM users WHERE email = $1 AND contrasena = $2';
        const values = [email, contrasena];
        const result = await pool.query(query, values);

        // Verifica si se encontraron registros que coinciden con las credenciales
        if (result.rows.length > 0) {
            // Usuario autenticado correctamente
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        // Error al realizar la consulta a la base de datos
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const updateUsers = async (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, email, contrasena } = req.body;
    const response = await pool.query('UPDATE users SET nombres = $1, apellidos = $2, email = $3, contrasena = $4 WHERE id = $5', [
        nombres,
        apellidos,
        email,
        contrasena,
        id
    ]);
    console.log(response);
    res.json('User Updated Successfully');
};

const deleteUsers = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);

};


module.exports = {
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    login
}