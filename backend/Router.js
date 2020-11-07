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
        this.getZoomMeeting(app, db);
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.appointment(app, db);
        this.getAppointment(app, db);
    }


    //Routes for zoom API
    //Use the ApiKey and APISecret from config.js

    getZoomMeeting(app, db){
        //use userinfo from the form and make a post req to /userinfo
        app.post('/getZoomMeeting', (req, res) => {
            //store the email address of the user in the email variable

            //const email = req.body.email;

            //check if the email was stored in the console
            const email = 'zoom01@kacp.org'
            console.log(email);
            
            //Store the options for Zoom API which will be used to make an API call later.
            var options = {
            //You can use a different uri if you're making an API call to a different Zoom endpoint.
            uri: "https://api.zoom.us/v2/users/"+email,
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
                console.log('User has', response);
                //console.log(typeof res);
                const resp = response
                //Adding html to the page
                var title1 ='<center><h3>Your token: </h3></center>' 
                var result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + token + '</pre></code>';
                var title ='<center><h3>User\'s information:</h3></center>' 
                //Prettify the JSON format using pre tag and JSON.stringify
                var result = title + '<code><pre style="background-color:#aef8f9;">'+JSON.stringify(resp, null, 2)+ '</pre></code>'
                console.log(result1)
                console.log(result)
                console.log(title1)
                res.send(result1 + '<br>' + result);

                console.log(response.personal_meeting_url)
        
            })
            .catch(function (err) {
                // API call failed...
                console.log('API call failed, reason ', err);
            });
        
        
        });

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
            const {username, date, duration, purpose, startTime, endTime} = req.body;

            //loop through zoom accounts
            const zoom = await db.query("SELECT ARRAY(SELECT zoom_username FROM zoom_account)");
            const z_username = zoom.rows[0].array
            var i = 0

            //loop through array of zoom accounts to check availability of any of them
            for (let z of z_username) {
                i = 0
                //check the requested appointment time to see if the times are taken
                for (let t of duration) {
                    const availability = await db.query("SELECT duration FROM appointment WHERE date = $1 AND zoom_username = $2 AND $3=ANY(duration)", [date, z, t])

                    //if time is not taken, check the next time
                    if (availability.rows.length === 0) {
                    
                        if (i < duration.length) {
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
                if (i === duration.length) { 

                    db.query("INSERT INTO appointment(date, duration, zoom_username, username, purpose, start_time, end_time) values($1, $2, $3, $4, $5, $6, $7)", [date, duration, z, username, purpose, startTime, endTime]);
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

    //get and return appointments to be displayed for user
    getAppointment(app, db){
        app.post('/getAppointment', async (req, res) => {
            const {username} = req.body;

            //get all appointments under the username
            const data = await db.query("SELECT * FROM appointment WHERE username = $1", [username])
            const length = data.rows.length
            var appointments = [];

            for (var i=0; i<length; i++) {
                const appointment = {
                    date: data.rows[i].date,
                    startTime: data.rows[i].start_time,
                    endTime: data.rows[i].end_time,
                    purpose: data.rows[i].purpose,
                    zoom_username: data.rows[i].zoom_username,
                    }
                appointments.push(appointment)

                console.log(appointment)
                }

            res.json({
                success: true,
                appointments: appointments,
            })
        })
    }
}

module.exports = Router;