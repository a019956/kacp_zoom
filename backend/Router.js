require('dotenv').config()

//  Required modules for zoom API.
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');

//  Required modules for password encryption.
const bcrypt = require('bcryptjs');
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
    

    //  REQUESTS FOR LOGIN PAGE
    //  Upon user log-in request, look for matching username & password in the database.
    login(app, db) {
        app.post('/login', async (req, res) => {
            const {username, password} = req.body;
            //  Change "login" to name of the table to match database.
            const user = await db.query("SELECT * FROM login WHERE username = $1", [username]);
                
                //  If there is a match in username, compare the encrypted input password with the encrypted password from the database.
                if (user.rows.length === 1) {
                    bcrypt.hash(user.rows[0].password, 10, function(err, hash){
                        if (err) {}

                        bcrypt.compare(password, hash, function(err, verified) {
                            if (err) {}

                            //  If given password for the username matches the password from the database, log-in user.
                            if (verified) {
                                // req.session.userID = user.id;

                                res.json({
                                    success: true,
                                    username: user.rows[0].username,
                                    msg: "Logged In"
                                })
                                return;
                            }

                            //  If passwords do not match, return error msg.
                            else{
                                res.json({
                                    success: false,
                                    msg: "Invalid Password"
                                })
                            }
                        })
                    })
                }
                //  If there is no such username in databse, return error msg.
                else {
                    res.json({
                        success: false,
                        msg: 'Invalid username'
                    })
                }
            
    });
}
    //  Upon user log-out, remove data.
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

    //  Check if user is logged-in upon loading application.
    //  If user is logged in, load the application.
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


    //  ROUTES FOR TIME PICKER APPLICATION
    //  When user submits appointment, check for account availabile to use at the given time.
    //  If there is an account available at the given time, 
    appointment(app, db) {
        app.post('/doAppointment', async (req, res) => {
            var {username, date, durationArray, duration, purpose, startTime, endTime, 
                recurrenceOption, recurrenceType, recurrenceWeek, recurrenceDay, 
                recurrenceInterval, recurrenceTime, dateTime, length, join_url, start_url, meeting_id} = req.body;
                
            var recurrenceObject=''

            //loop through zoom accounts
            const zoom = await db.query("SELECT ARRAY(SELECT zoom_username FROM zoom_account)");
            const z_username = zoom.rows[0].array
            var i = 0

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
                //  If time collides with other time with the account, check the next account.
                    else {
                        break;
                    }
                }
                //  When all duration for a zoom account is available, go ahead and make the appointment.
                if (i === durationArray.length) { 

                    //  If user requests for a recurring meeting, set JSON to reflect recurrence options.
                    //  Set up recurrence options depending on the type of recurring meeting
                    if(recurrenceType==2){
                        recurrenceObject={
                            "type": recurrenceType,
                            "repeat_interval": recurrenceInterval,
                            "weekly_days": recurrenceDay,
                            "end_times": recurrenceTime
                            }
                    }

                    else{
                        recurrenceObject={
                            "type": recurrenceType,
                            "repeat_interval": recurrenceInterval,
                            "weekly_days": recurrenceDay,
                            "monthly_week": recurrenceWeek,
                            "monthly_week_day": recurrenceDay,
                            "end_times": recurrenceTime
                        }
                    }
                    
                    const email = z
                    //  Post request to zoom 
                    //  Use req-promise module's .then() method to make req calls.
                    //  Store the options for Zoom API which will be used to make an API call later.

                    var options = {
                    //  You can use a different uri if you're making an API call to a different Zoom endpoint.
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
                            "type": recurrenceOption,
                            "start_time":date+"T"+startTime+"Z",
                            "duration": duration,
                            "timezone": "America/New_York",
                            "agenda": purpose,
                            "recurrence": recurrenceObject,
                            },
                        json: true //Parse the JSON string in the res
                    };
                    
                    //  Use req-promise module's .then() method to make req calls.
                    rp(options)
                    .then(function (response) {
                        //  Printing the res on the console
                        console.log(response)

                        start_url = response.start_url
                        join_url = response.join_url
                        meeting_id = response.id
                        //  For recurring meetings, 
                        if (recurrenceOption==8) {
                            const occurrences = response.occurrences;
                            length = occurrences.length
                            //  Save all the recurring meetings to the appointments database
                            for (let occurence of occurrences){
                                dateTime = occurence.start_time.split('T')
                                meeting_id = occurence.occurrence_id
                                date = dateTime[0]
                                
                                db.query("INSERT INTO appointment(date, duration, zoom_username, username, purpose, start_time, end_time, duration_array, join_url, start_url, id, recurrence_option) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", 
                                [date, duration, z, username, purpose, startTime, endTime, durationArray, join_url, start_url, meeting_id, recurrenceType]);
                                
                            }}
                            //  For one-time meetings, save one meeting to database.
                        else {
                            meeting_id = response.id
                            db.query("INSERT INTO appointment(date, duration, zoom_username, username, purpose, start_time, end_time, duration_array, join_url, start_url, id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", 
                            [date, duration, z, username, purpose, startTime, endTime, durationArray, join_url, start_url, meeting_id]);
                        }
                    })
                    .catch(function (err) {
                        // API call failed...
                        console.log('API call failed, reason ', err);
                        return;
                    });

                        res.json({
                            success: true,
                            msg: "Appointment successfully made."
                        })
                        return;
                    }
                }

                //  If no zoom account is available for the given time duration, send in error.
                res.json({
                    success: false,
                    msg: "Time is taken, please choose a different time."
                })
            }
        )}

    //  Delete Zoom meeting from the database and make delete request with Zoom API.
    deleteAppointment(app, db){
        app.post('/deleteAppointment', async (req, res) => {
            const {id} = req.body;
            db.query("DELETE FROM appointment WHERE id = $1", [id]);
            var options = {
            //  You can use a different uri if you're making an API call to a different Zoom endpoint.
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
                json: true //   Parse the JSON string in the res
            };
            //  Use req-promise module's .then() method to make req calls.
            rp(options)
            .then(function (response) {
                //  Printing the res on the console
                console.log(response)
                
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

    //  Get all appointments under the user to be displayed on the front-end.
    getAppointment(app, db){
        app.post('/getAppointment', async (req, res) => {
            const {username, today} = req.body;
            //  When user loads their appointment, delete all completed get and return appointments to be displayed for user
            const delete_array = await db.query("SELECT id FROM appointment WHERE date < $1", [today])
            for (let appointment of delete_array.rows) {
                var id = appointment.id
                var options = {
                    //  Make delete request to Zoom API.
                    //  You can use a different uri if you're making an API call to a different Zoom endpoint.
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
                        json: true //   Parse the JSON string in the res
                    };
                    db.query("DELETE FROM appointment WHERE id = $1", [id]);
                    rp(options)
                    .then(function (response) {
                        //  Printing the response on the console
                        console.log(response)
                    })
                    .catch(function (err) {
                        // API call failed...
                        console.log('API call failed, reason ', err);
                    });
        }
            //  
            //  Get all appointments under the username
            const A = await db.query("SELECT * FROM appointment WHERE username = $1 ORDER BY date ASC, start_time DESC;", [username])
            var appointments = [];

            //  Add all appointment to the appointments array to be sent to the front-end.
            for (app of A.rows) {
                const appointment = {
                    date: app.date,
                    startTime: app.start_time,
                    endTime: app.end_time,
                    purpose: app.purpose,
                    zoom_username: app.zoom_username,
                    join_url: app.join_url,
                    start_url: app.start_url,
                    meeting_id: app.id
                    }
                    appointments.push(appointment)
                }
                // const R = await db.query("SELECT * FROM appointment WHERE username = $1 ORDER BY date ASC, start_time DESC;", [username])

            res.json({
                success: true,
                appointments: appointments,
            })
        })
    }
}

module.exports = Router;