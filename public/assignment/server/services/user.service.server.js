module.exports = function(app, userModel) {
    var passport = require('passport');
    var auth = authorized;
    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user?username=:username&password=:password", passport.authenticate('local'), findUserByCredentials);
    app.get("/api/assignment/user?username=:username", auth, findUserByUsername);
    app.get("/api/assignment/user/:id", auth, findUserById);
    app.get("/api/assignment/user", findAllUsers);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function createUser(req, res) {
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

    }

    function findAllUsers(req, res) {
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

    function findUserByCredentials(req, res) {
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
    }

    function updateUser(req, res) {
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
    }

    function deleteUserById(req, res) {
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
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }
};