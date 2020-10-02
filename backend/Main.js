const express       = require('express');
const app           = express();
const path          = require('path');
const mysql         = require('mysql');
const session       = require('express-session');
const MySqlStore    = require('express-mysql-session')(session);
const Router        = require('./Router');
const MySQLStore = require('express-mysql-session');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database
const db = mysql.createConnection({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '',
    database: 'login'
});

db.connect(function(err) {
    if (err) {
        console.log('DB error')
        throw err;
        return false;
    }
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

app.listen(3000);