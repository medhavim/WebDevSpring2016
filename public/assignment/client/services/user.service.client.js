(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){
        var model = {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            logout: logout
        };

        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            //$http.get('/api/assignment/loggedin');
        }

        function getCurrentUser () {
            return $http.get("/api/assignment/loggedin");
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }

        function findUserByCredentials(credentials) {
            return $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }

        function logout() {
            return $http.post('/api/assignment/logout');
        }
    }
})();