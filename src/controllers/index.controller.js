const { Pool } = require('pg');

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'G2DS1',
    database: 'firstapi',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
};

const getUsersById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);

};

const createUsers = async (req, res) => {
    const { firstName, lastName, email } = req.body
    const response = await pool.query('INSERT INTO users (firstName, lastName, email) VALUES ($1, $2, $3)', [firstName, lastName, email])
    console.log(response);
    res.json({
        message: 'Usser Added Succesfully',
        body: {
            user: {firstName, lastName, email}
        }
    })
};

const updateUsers = async (req, res) => {
    const id = req.params.id;
    const {firstName, lastName, email} = req.body;
    const response = await pool.query('UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id = $4', [
        firstName,
        lastName,
        email,
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
    deleteUsers
}