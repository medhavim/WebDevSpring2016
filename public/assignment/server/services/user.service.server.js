module.exports = function(app, userModel) {
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.get("/api/assignment/user?username=:username", findUserByUsername);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        var userResponse = userModel.createUser(user);
        res.json(userResponse);
    }

    function findAllUsers(req, res) {
        if (req.query) {
            findUserByCredentials(req, res);
        } else {
            var userResponse = userModel.findAllUsers();
            res.json(userResponse);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.findUserById(userid);
        res.json(userResponse);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var userResponse = userModel.findUserByUsername(username);
        res.json(userResponse);
    }

    function findUserByCredentials(req, res) {
        var credentials = { username: req.query.username,
            password: req.query.password
        };
        var userResponse = userModel.findUserByCredentials(credentials);
        res.json(userResponse);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var userResponse = userModel.updateUserById(userId, user);
        res.json(userResponse);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.deleteUserById(userId);
        res.json(userResponse);
    }
};