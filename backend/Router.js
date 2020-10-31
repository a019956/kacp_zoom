const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const session       = require('express-session');
const postgresArray = require('postgres-array')

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.appointment(app, db);
        this.getAppointment(app, db);
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
                                // req.session.userID = user.id;

                                res.json({
                                    success: true,
                                    username: user.rows[0].username,
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

        app.post('/logout', (req, res) => {

            if (req.session.userID) {
                req.session.dstroy();
                res.json({
                    success: true
                })

                return true;

            }
            else {
                res.json({
                    success: false
                })
                return false;
            }
        })

    }

    isLoggedIn(app, db) {

        app.post('/isLoggedIn', (req, res) => {

            if (req.username) {

                const user = db.query("SELECT * FROM login WHERE username = $1 LIMIT 1", [username])
                if (user.row && user.row.length === 1){

                    res.json({
                        success: true,
                        username: user.row[0],
                    })
                    return true;
                } else {
                    res.json({
                        success: false
                    })
                }
            }
            else {
                res.json({
                    success: false
                })
            }
        });

    }


    //Time picker routers
    appointment(app, db) {
        app.post('/appointment', async (req, res) => {
            const {username, date, duration, purpose} = req.body;
            console.log("THIS IS APPOINTMENT USERNAME: " + username)

            //parse json to string
            const zoom = await db.query("SELECT ARRAY(SELECT zoom_username FROM zoom_account)");
            const z_username = zoom.rows[0].array
            var i = 0
            //loop through array of zoom accounts to check availability of any of them
            for (let z of z_username) {
                i = 0
                //loop through duration to check if any time for availability of the selected account
                for (let t of duration) {
                    
                    //if any of the time duration collides with the already existing appointment, check next account.
                    const availability = await db.query("SELECT * FROM appointment WHERE date = $1 AND time = $2 AND zoom_username = $3", [date, t, z]);
                    //if time is available, check the next increment.
                    console.log("availability " + availability.rows.length)
                    if (availability.rows.length === 0) {
                        if (i < duration.length) {
                            i += 1
                            console.log(t +  " for " +z + " on " + date + " is good")
                            continue;
                        }
                    }
                    //if time collides with other time with the account, check the next account.
                    else {
                        break;
                    }
                }
                //when all time increments for given account is available, insert to database and pass in success.
                if (i === duration.length) {   
                    
                        duration.forEach((t) => {
                            db.query("INSERT INTO appointment(date, time, zoom_username, username, purpose) values($1, $2, $3, $4, $5)", [date, t, z, username, purpose]);
                        })
                        res.json({
                            success: true,
                            msg: "Appointment successfully made."

                        })
                        return;
                }
            }
        });
    }
    //get and return appointments to be displayed for user
    getAppointment(app, db){
        app.post('/getAppointment', async (req, res) => {
            const {username} = req.body;

            console.log("THIS IS ROUTER USERNAME: " + username)
            const d = await db.query("SELECT ARRAY(SELECT date FROM appointment WHERE username = $1)", [username])
            const t = await db.query("SELECT ARRAY(SELECT time FROM appointment WHERE username = $1)", [username])
            const p = await db.query("SELECT ARRAY(SELECT purpose FROM appointment WHERE username = $1)", [username])
            const date = d.rows[0].array
            const time = t.rows[0].array
            const purpose = p.rows[0].array
            const length = date.length
            var appointments = [];

            for (var i=0; i<length; i++) {
                const appointment = {
                    date: date[i],
                    time: time[i],
                    purpose: purpose[i],
                    }

                appointments.push(appointment)
                }
                console.log(appointments)
                console.log(username)

            res.json({
                success: true,
                appointments: appointments,
            })
        })
    }
}

module.exports = Router;