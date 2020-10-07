require('dotenv').config()
const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kacp_zoom',
    password: '9956',
    port: 5432,
})
module.exports = {
    query: (text, params) => pool.query(text, params),
};