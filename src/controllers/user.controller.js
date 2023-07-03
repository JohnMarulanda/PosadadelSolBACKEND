const express = require('express');
const app = express();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const getUsersByemail = async (req, res) => {
    const email = req.params.email;
    const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
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



/*const updateUsers = async (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, email, contrasena } = req.body;

    const hashedPassword = await bcrypt.hash(contrasena, 10); // El segundo argumento es el "salt" (factor de trabajo

    const response = await pool.query('UPDATE users SET nombres = $1, apellidos = $2, email = $3, contrasena = $4 WHERE id = $5', [
        nombres,
        apellidos,
        email,
        hashedPassword,
        id
    ]);
    console.log(response);
    res.json('User Updated Successfully');
};*/

const updateUsers = async (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, email, contrasena } = req.body;

    // Verificar si se proporciona al menos un campo para actualizar
    if (!nombres && !apellidos && !email && !contrasena) {
        return res.json('No fields provided for update');
    }

    const updateFields = {}; // Objeto para almacenar los campos a actualizar

    if (nombres) updateFields.nombres = nombres;
    if (apellidos) updateFields.apellidos = apellidos;
    if (email) updateFields.email = email;

    if (contrasena) {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        updateFields.contrasena = hashedPassword;
    }

    const updateQueryValues = Object.values(updateFields);
    updateQueryValues.push(id);

    const updateQuery = {
        text: generateUpdateQueryText(updateFields),
        values: updateQueryValues
    };

    const response = await pool.query(updateQuery);

    console.log(response);
    res.json('User Updated Successfully');
};

// Función auxiliar para generar el texto de la consulta de actualización
function generateUpdateQueryText(fields) {
    const setClause = Object.keys(fields).map((key, index) => `${key} = $${index + 1}`).join(', ');
    return `UPDATE users SET ${setClause} WHERE id = $${Object.keys(fields).length + 1}`;
}


const deleteUsers = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`);

};


const countUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT COUNT(*) FROM users');
        const count = parseInt(response.rows[0].count);
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al contar los usuarios:', error);
        res.status(500).json({ error: 'Error al contar los usuarios' });
    }
};

module.exports = {
    getUsers,
    getUsersById,
    getUsersByemail,
    createUsers,
    updateUsers,
    deleteUsers,
    login,
    countUsers
};
