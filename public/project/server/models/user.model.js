var mock = require("./user.mock.json");

module.exports = function () {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
        console.log("in model createUser");
        user._id = (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function findAllUsers() {
        console.log("in model findAllUsers");
        return mock;
    }


    // use user model find by id
    function findUserById(userId) {
        console.log("in model findUserById");
        for(var u in mock) {
            if (mock[u]._id === userId) {
                return mock[u];
            }
        }
        return null;
    }


    function findUserByUsername(username) {
        console.log("in model findUserByUsername");
        for(var u in mock) {
            console.log("mock[u]");
            console.log(mock[u]);
            if (mock[u].username === username) {
                console.log(mock[u]);
                return mock[u];
            }
        }
        return null;
    }


    function findUserByCredentials(credentials) {
        console.log("in model findUserByCredentials");
        for(var u in mock) {
            if (mock[u].username === credentials.username && mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        console.log("in model deleteUserById");
        for(var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(u,1);
            }
        }
        return (mock);
    }

    function updateUser(userId, user) {
        console.log("in model updateUser");
        for(var u in mock) {
            if (mock[u]._id === userId) {
                mock[u]=user;
                return (mock[u]);
            }
        }
        return null;
    }
};