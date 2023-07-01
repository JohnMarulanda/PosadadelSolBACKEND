const express = require('express');
const app = express();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// connectionString: "postgres://vgfbqjmq:nRcF650YYKV8UMtp_dwT_xVtN0dhxNwh@mahmud.db.elephantsql.com/vgfbqjmq"

const pool = new Pool({
    connectionString: "postgres://nztheprj:0cUVGbNh02RlQVmrW05nviiuMVTM6p7I@silly.db.elephantsql.com/nztheprj"
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
    const { nombres, apellidos, email, contrasena } = req.body;

    if (!nombres || !apellidos || !email || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Genera un hash de la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(contrasena, 10); // El segundo argumento es el "salt" (factor de trabajo)

        const response = await pool.query('INSERT INTO users (nombres, apellidos, email, contrasena) VALUES ($1, $2, $3, $4)', [nombres, apellidos, email, hashedPassword]);
        console.log(response);
        res.json({
            message: 'Usuario agregado exitosamente',
            body: {
                user: { nombres, apellidos, email }
            }
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const login = async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Verifica la contraseña cifrada utilizando bcrypt
            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

            if (isPasswordValid) {
                // Genera el token con el ID de usuario
                const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

                res.status(200).json({ token }); // Envía el token al cliente
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
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