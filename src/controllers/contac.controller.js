const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'johnprueba',
    password: 'password',
    database: 'nodelogin',
    port: '5432'
});