module.exports = function(app, userModel) {
    app.get("/api/assignment/user?username=:username&password=:password", findUserByCredentials);
    app.get("/api/assignment/user?username=:username", findUserByUsername);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findAllUsers);
    app.put("/api/assignment/user/:id", updateUser);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        var userResponse = userModel.createUser(user);
        res.json(userResponse);
    }

    function findAllUsers(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);
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
        var username = req.query.username;
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

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var userResponse = userModel.updateUser(userId, user);
        res.json(userResponse);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var userResponse = userModel.deleteUserById(userId);
        res.json(userResponse);
    }
};