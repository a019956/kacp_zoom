//required modules for time picker app
const path          = require('path');
const { Pool, Client } = require('pg');
const session       = require('express-session');
const Router        = require('./Router');
const db = require('./db')

const express       = require('express');
const app           = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
}));

//  ENV variables
const port = process.env.port || 3000;
//  Database
const pool = new Pool({
})

db.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
});

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'))
});
app.listen(port, () => {
    console.log('server is up on port' + port);
});