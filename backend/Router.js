const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
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
            console.log(user.rows[0].password)
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
}

module.exports = Router;