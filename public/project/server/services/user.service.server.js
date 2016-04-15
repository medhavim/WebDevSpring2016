/*var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;*/

module.exports = function(app, userModel) {

    app.post('/api/project/login', login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    //app.post('/api/project/admin/user', isAdmin, createUser);
    app.post('/api/project/admin/user', createUser);
    app.get('/api/project/loggedin', loggedin);
    /*app.get('/api/project/admin/user', isAdmin, findAllUsers);
    app.get('/api/project/admin/user/:id', isAdmin, findUserById);*/
    app.get('/api/project/admin/user', findAllUsers);
    app.get('/api/project/admin/user/:id', findUserById);
    app.get('/api/project/user?username=:username', findUserByUsername);
    app.put('/api/project/user/:id', updateUserById);
    /*app.put('/api/project/admin/user/:id', isAdmin, updateUserById);
    app.delete('/api/project/admin/user/:id', isAdmin, deleteUserById);*/
    app.put('/api/project/admin/user/:id', updateUserById);
    app.delete('/api/project/admin/user/:id', deleteUserById);
    app.put('/api/project/user/:id/music', userFavoritesMusic);

    /*passport.use('project', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        console.log("in server localStrategy");
        userModelProject
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    console.log("success");
                    console.log(user);
                    if (user === null) { console.log("if");return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    console.log("error");
                    console.log(err);
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("deserializeUser");
        console.log(user);
        if(user.favoriteMusic) {
            userModelProject
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        } else {
            userModelAssignment
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }*/

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
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
        var user = req.body;
        user.roles = ['user'];

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
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
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    /*function isAdmin(req, res, next) {
        if(req.isAuthenticated()) {
            if(loggedInUser.roles.indexOf("admin") >= 0) {
                next();
            }
        }
        else {
            res.send(403);
        }
    }*/

    function userFavoritesMusic(req, res) {
        var userId = req.params.id;
        var music = req.body;
        console.log(music);
        userModel.userFavoritesMusic(userId, music)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};