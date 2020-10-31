require('dotenv').config()
const express       = require('express');
const app           = express();
const path          = require('path');
const { Pool, Client } = require('pg')
const session       = require('express-session');
const Router        = require('./Router');
const db = require('./db')

app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static(path.join(__dirname, '..', 'frontend', 'App.js')));
app.use(express.json());

app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
}));

// ENV variables
const port = 3000;
// Database
const pool = new Pool({
})

//Routes
db.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
});

app.get("/api/v1/users", async (req, res) => {
    const results = await db.query("SELECT * FROM login");
});


new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});
app.listen(port, () => {
    console.log('server is up on port ${port}');
});