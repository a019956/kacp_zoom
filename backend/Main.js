const express       = require('express');
const app           = express();
const path          = require('path');
const { Pool, Client } = require('pg')
const session       = require('express-session');
const MySqlStore    = require('express-mysql-session')(session);
const Router        = require('./Router');
const MySQLStore = require('express-mysql-session');
const db = require('./db')
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());


// ENV variables
const port = 3000;
// Database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kacp_zoom',
    password: '9956',
    port: 5432,
})

db.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
});

app.get("/api/v1/users", async (req, res) => {
    const results = await db.query("SELECT * FROM login");
    console.log(results);
    res.status(200).json({
        status: "success",
        data: {username: ["k"],
            
        },
    });
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86300 * 1000),
    endConnectionOnClose: false,
}, db);

app.use(session({
    key: '999955556666',
    secret: '74227422',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86300 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});
app.listen(port, () => {
    console.log('server is up on port ${port}');
});