require('dotenv').config()

//required modules for zoom API
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');

//required modules for 
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const session       = require('express-session');
const postgresArray = require('postgres-array')

const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, config.APISecret);

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.appointment(app, db);
        this.getAppointment(app, db);
        this.deleteAppointment(app, db);
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
        app.post('/doAppointment', async (req, res) => {
            const {username, date, durationArray, duration, purpose, startTime, endTime} = req.body;
            var {join_url} = ''
            var {start_url} = ''
            var {meeting_id} = ''

            //loop through zoom accounts
            const zoom = await db.query("SELECT ARRAY(SELECT zoom_username FROM zoom_account)");
            const z_username = zoom.rows[0].array
            var i = 0
            const zoomStartTime = (date+"T"+startTime+"Z")

            //loop through array of zoom accounts to check availability of any of them
            for (let z of z_username) {
                i = 0
                //check the requested appointment time to see if the times are taken
                for (let t of durationArray) {
                    const availability = await db.query("SELECT duration_array FROM appointment WHERE date = $1 AND zoom_username = $2 AND $3=ANY(duration_array)", [date, z, t])

                    //if time is not taken, check the next time
                    if (availability.rows.length === 0) {
                    
                        if (i < durationArray.length) {
                            i += 1
                            continue;
                        }
                    }
                //if time collides with other time with the account, check the next account.
                    else {
                        break;
                    }
                }
                //when all duration for a zoom account is available, go ahead and make the appointment.
                if (i === durationArray.length) { 

                    const email = z
                    //Post request to zoom 
                    //Use req-promise module's .then() method to make req calls.
                    //Store the options for Zoom API which will be used to make an API call later.
                    var options = {
                    //You can use a different uri if you're making an API call to a different Zoom endpoint.
                        method: "POST",
                        uri: "https://api.zoom.us/v2/users/"+email+"/meetings",
                        qs: {
                            status: 'active' 
                        },
                        auth: {
                            'bearer': token
                        },
                        headers: {
                            'User-Agent': 'Zoom-api-Jwt-Request',
                            'content-type': 'application/json'
                        },
                        body: {
                            "topic": purpose,
                            "type": "2",
                            "start_time":date+"T"+startTime+"Z",
                            "duration": duration,
                            "timezone": "America/New_York",
                            "agenda": purpose,
                            },
                        json: true //Parse the JSON string in the res
                    };
                    
                    //Use req-promise module's .then() method to make req calls.
                    rp(options)
                    .then(function (response) {
                        //printing the res on the console
                        start_url = response.start_url
                        join_url = response.join_url
                        meeting_id = response.id
                        
                        db.query("INSERT INTO appointment(date, duration, zoom_username, username, purpose, start_time, end_time, duration_array, join_url, start_url, id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [date, duration, z, username, purpose, startTime, endTime, durationArray, join_url, start_url, meeting_id]);
                    })
                    .catch(function (err) {
                        // API call failed...
                        console.log('API call failed, reason ', err);
                    });

                        res.json({
                            success: true,
                            msg: "Appointment successfully made."
                        })
                        return;
                    }
                }

                //if no zoom account is available for the given time duration, send in error.
                res.json({
                    success: false,
                    msg: "Time is taken, please choose a different time."
                })
            }
        )}

    //Delete meeting
    deleteAppointment(app, db){
        app.post('/deleteAppointment', async (req, res) => {
            const {id} = req.body;

        var options = {
            //You can use a different uri if you're making an API call to a different Zoom endpoint.
                method: "DELETE",
                uri: "https://api.zoom.us/v2/meetings/"+id,
                qs: {
                    status: 'active' 
                },
                auth: {
                    'bearer': token
                },
                headers: {
                    'User-Agent': 'Zoom-api-Jwt-Request',
                    'content-type': 'application/json'
                },
                json: true //Parse the JSON string in the res
            };
            //Use req-promise module's .then() method to make req calls.
            rp(options)
            .then(function (response) {
                //printing the res on the console
                console.log(response)
                
                db.query("DELETE FROM appointment WHERE id = $1", [id]);
            })
            .catch(function (err) {
                // API call failed...
                console.log('API call failed, reason ', err);
            });
            res.json({
                msg: "Appointment successfully deleted.",
                success: true,
            })
        });
    }

    //When user loads their appointment, delete all completed get and return appointments to be displayed for user
    getAppointment(app, db){
        app.post('/getAppointment', async (req, res) => {
            const {username, today} = req.body;
            //delete all appointments that ended
            const delete_array = await db.query("SELECT id FROM appointment WHERE date < $1", [today])
            var length = delete_array.rows.length
            console.log(delete_array.rows.length)
            for (var i=0; i<length; i++) {
                var id = delete_array.rows[i].id
                var options = {
                    //You can use a different uri if you're making an API call to a different Zoom endpoint.
                        method: "DELETE",
                        uri: "https://api.zoom.us/v2/meetings/"+id,
                        qs: {
                            status: 'active' 
                        },
                        auth: {
                            'bearer': token
                        },
                        headers: {
                            'User-Agent': 'Zoom-api-Jwt-Request',
                            'content-type': 'application/json'
                        },
                        json: true //Parse the JSON string in the res
                    };
                    db.query("DELETE FROM appointment WHERE id = $1", [id]);
                    rp(options)
                    .then(function (response) {
                        //printing the res on the console
                        console.log(response)
                    })
                    .catch(function (err) {
                        // API call failed...
                        console.log('API call failed, reason ', err);
                    });
        }
            //get all appointments under the username
            const data = await db.query("SELECT * FROM appointment WHERE username = $1 ORDER BY date ASC, start_time DESC;", [username])
            length = data.rows.length
            var appointments = [];

            //add all appointments 
            for (var i=0; i<length; i++) {
                const appointment = {
                    date: data.rows[i].date,
                    startTime: data.rows[i].start_time,
                    endTime: data.rows[i].end_time,
                    purpose: data.rows[i].purpose,
                    zoom_username: data.rows[i].zoom_username,
                    join_url: data.rows[i].join_url,
                    start_url: data.rows[i].start_url,
                    meeting_id: data.rows[i].id
                    }
                appointments.push(appointment)
                }
                

            res.json({
                success: true,
                appointments: appointments,
            })
        })
    }
}

module.exports = Router;