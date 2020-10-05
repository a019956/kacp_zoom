const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
    }

    login(app, db) {

        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            username = username.toLowerCase();

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

            let cols = [username];
            db.query('SELECT * FROM login WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'An error has occured, please try again'
                    })
                    return;
                }
                // if 1 user with this name was found
                if (data && data.length === 1) {

                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                        
                        if (verified) {

                            req.session.userID = data[0].id;

                            res.json({
                                success: true,
                                username: data[0].username
                            })

                            return;

                        }

                        else{
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }
                    });

                }
                else {
                    res.json({
                        success: false,
                        msg: 'Invalid username'
                    })
                }
            }
            )
        });
    }

    logout(app, db) {

    }

    isLoggedIn(app, db) {

    }
}

module.exports = Router;