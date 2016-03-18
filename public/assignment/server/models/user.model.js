var mock = require("./user.mock.json");

module.exports = function(app) {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById
    };
    return api;

    function createUser(user) {
        user._id = (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function findAllUsers() {
        return mock;
    }


    // use user model find by id
    function findUserById(userId) {
        for(var u in mock) {
            if (mock[u]._id === userID) {
                return mock[u];
            }
        }
        return null;
    }


    function findUserByUsername(username) {
        for(var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }


    function findUserByCredentials(credentials) {
        console.log("in server user model");
        for(var u in mock) {
            if (mock[u].username === credentials.username && mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if (mock[u]._id === userID) {
                mock.splice(u,1);
            }
        }
    }

    function updateUserById(userId, user) {
        for(var u in mock) {
            if (mock[u]._id === userID) {
                mock[u]=user;
            }
        }
        return null;
    }
};