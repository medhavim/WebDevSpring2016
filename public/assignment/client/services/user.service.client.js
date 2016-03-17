(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){
        var model = {
            getProfile: getProfile,
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser
        };

        return model;

        function getProfile() {
            return $http.get("/api/project/omdb/profile/"+$rootScope.currentUser._id);
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function findAllUsers(callback) {
            return $http.get('/api/assignment/user');
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function updateUser(userId, user)
        {
            return $http.put('/api/assignment/user/' + userId, user);
        }
    }
})();