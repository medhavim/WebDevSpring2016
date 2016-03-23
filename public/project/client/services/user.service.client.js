(function () {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http){
        var model = {
            setCurrentUser: setCurrentUser,
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            updateUserByUsername: updateUserByUsername
        };

        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        // This function creates a new user
        function createUser(user) {
            return $http.post('/api/project/user', user);
        }

        // This function deletes an existing user based on the user ID
        function deleteUserById(userId) {
            return $http.delete('/api/project/user/' + userId);
        }

        // This function provides all the users
        function findAllUsers() {
            return $http.get('/api/project/user');
        }

        // This function finds the correct username and password for a user
        function findUserByCredentials(credentials) {
            return $http.get("/api/project/user?username=" + credentials.username + "&password=" + credentials.password);
        }

        // This function searches for a user based on the username
        function findUserByUsername(username) {
            return $http.get('/api/project/user?username=' + username);
        }

        // This function updates the details of a user
        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);
        }


        function updateUserByUsername(userName, user, callback) {
            var updateUser = null;
            var ind = 0;
            for(ind in model.users) {
                if(model.users[ind].username === userName) {
                    model.users[ind].username = user.username;
                    model.users[ind].password = user.password;
                    model.users[ind].firstName = user.firstName;
                    model.users[ind].lastName = user.lastName;
                    model.users[ind].email_id = user.email_id;
                    model.users[ind].roles = user.roles;
                    updateUser = user[ind];
                    break;
                }
            }
            callback(updateUser);
        }
    }
})();