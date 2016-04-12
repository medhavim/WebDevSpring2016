var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    //var passport = require('passport');
    var auth = authorized;
    var loggedInUser;

    /*app.post("/api/assignment/user", auth, createUser);
    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.get("/api/assignment/user?username=:username&password=:password", passport.authenticate('local'), findUserByCredentials);
    app.get("/api/assignment/user?username=:username", auth, findUserByUsername);
    app.get("/api/assignment/user/:id", auth, findUserById);
    app.get("/api/assignment/user", findAllUsers);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", auth, deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);*/

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout',         logout);
    app.post('/api/assignment/register',       register);
    app.post('/api/assignment/admin/user', isAdmin, createUser);
    app.get('/api/assignment/loggedin',       loggedin);
    app.get('/api/assignment/admin/user', isAdmin, findAllUsers);
    app.get('/api/assignment/admin/user/:id', isAdmin, findUserById);
    app.get('/api/assignment/user?username=:username', findUserByUsername);
    app.put('/api/assignment/user/:id', auth, updateUserById);
    app.put('/api/assignment/admin/user/:id', isAdmin, updateUserById);
    app.delete('/api/assignment/admin/user/:id', isAdmin, deleteUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    /*function createUser(req, res) {
        var user = req.body;
        var userResponse = userModel.createUser(user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );

    }*/

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if(req.query.username) {
            findUserByUsername(req, res);
        }
        else {
            var users = userModel.findAllUsers()
                .then(
                    function(doc) {
                        res.json(doc);
                    },

                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    /*function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }*/

    /*function findAllUsers(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);
        } else {
            var userResponse = userModel.findAllUsers()
                .then(
                    function(doc) {
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }*/

    function findUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.findUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var userResponse = userModel.findUserByUsername(username)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    /*function findUserByCredentials(req, res) {
        var credentials = { username: req.query.username,
            password: req.query.password
        };
        var userResponse = userModel.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }*/

    /*function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var userResponse = userModel.updateUser(userId, user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }*/

    /*function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }*/

    /*function deleteUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.deleteUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }*/

    /*function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .deleteUserById(req.params.id)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }*/

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        userModel.updateUserById(userId, user)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        loggedInUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user[0] : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    /*function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }*/

    function isAdmin(req, res, next) {
        if(req.isAuthenticated()) {
            if(loggedInUser.roles.indexOf("admin") >= 0) {
                next();
            }
        }
        else {
            res.send(403);
        }
    }

};