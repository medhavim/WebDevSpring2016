module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user?username=:username&password=:password", findUserByCredentials);
    app.get("/api/project/user?username=:username", findUserByUsername);
    app.get("/api/project/user/:id", findUserById);
    app.get("/api/project/user", findAllUsers);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:id/music", userFavoritesMusic);

    function createUser(req, res) {
        console.log("in createUser");
        var user = req.body;
        var userResponse = userModel.createUser(user);
        res.json(userResponse);
    }

    function findAllUsers(req, res) {
        console.log("in findAllUsers");
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
        console.log("in findUserById");
        var userId = Number(req.params.id);
        var userResponse = userModel.findUserById(userId);
        res.json(userResponse);
    }

    function findUserByUsername(req, res) {
        console.log("in findUserByUsername");
        var username = req.query.username;
        var userResponse = userModel.findUserByUsername(username);
        res.json(userResponse);
    }

    function findUserByCredentials(req, res) {
        console.log("in findUserByCredentials");
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

    function userFavoritesMusic(req, res) {
        var userId = Number(req.params.id);
        var music = req.body;
        console.log(music);
        var favoriteMusic = userModel.userFavoritesMusic(userId, music);
        res.json(favoriteMusic);
    }
};