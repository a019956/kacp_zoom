const bcrypt = require('bcrypt');

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

            //check available zoom account and password at given time
            const appointment = await db.query("SELECT * FROM appointments WHERE date = $1", [date]);
                if (appointment.rows.length === 0) {
                    
                }


            //store request to db until the end time of the zoom meeting

            //store request to database for record

            const user = await db.query("SELECT * FROM login WHERE username = $1", [username]);
                if (user.rows.length === 0) {
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
}




module.exports = Router;