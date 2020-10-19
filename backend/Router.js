const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const postgresArray = require('postgres-array')

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.appointment(app, db);
    }

    login(app, db) {
        app.post('/login', async (req, res) => {
            const {username, password} = req.body;
            
            if (username.length > 12 && password.length > 12){
                res.json({
                    success: false,
                    msg: 'username and password does not exist'
                })
                return;
            }
            
            if (username.length > 12) {
                res.json({
                    success: false,
                    msg: 'username does not exist'
                })
                return;
            }

            if (password.length > 12) {
                res.json({
                    success: false,
                    msg: 'password does not exist'
                })
                return;
            }

            const user = await db.query("SELECT * FROM login WHERE username = $1", [username]);
                if (user.rows.length === 1) {
                    bcrypt.hash(user.rows[0].password, 10, function(err, hash){
                        if (err) {}

                        bcrypt.compare(password, hash, function(err, verified) {
                            if (err) {}

                            if (verified) {
                                req.session.userID = user.id;

                                res.json({
                                    success: true,
                                    username: user.username,
                                    msg: "Logged In"
                                })
                                return;
                            }

                            else{
                                res.json({
                                    success: false,
                                    msg: "Invalid Password"
                                })
                            }
                        })
                    })
                }
                else {
                    res.json({
                        success: false,
                        msg: 'Invalid username'
                    })
                }
            
    });
}

    logout(app, db) {

    }

    isLoggedIn(app, db) {

    }


    //Time picker routers

    appointment(app, db) {
        app.post('/appointment', async (req, res) => {
            const {username, date, duration, purpose} = req.body;

            //parse json to string
            console.log('hello')
            const zoom = "{zoom1, zoom2}"
            //const zoom = await db.query("SELECT ARRAY(SELECT zoom_username FROM zoom_account)");
            const z_username = postgresArray.parse(zoom, (value) => (value))
            console.log(z_username)
            

            z_username.forEach(function(z){
                //loop through duration to check if any time for any account is available
                duration.forEach(async function(t){
                const appointment = await db.query("SELECT * FROM appointment WHERE date = $1 AND time = $2 AND zoom_username = $3", [date, t, z]);
                if (appointment.rows.length > 0) {
                        res.json({
                            success: false,
                            msg: 'the time is taken'
                        })
                    }
                })
            })

            duration.forEach((t) => {
                db.query("INSERT INTO appointment(date, time, zoom_username, username, purpose) values($1, $2, $3, $4, $5)", [date, t, zoom, username, purpose]);
            })
            
            res.json({
                success: true,
                msg: "Appointment successfully made."
            })
    });
}
}

module.exports = Router;