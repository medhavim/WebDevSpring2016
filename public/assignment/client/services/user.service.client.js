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
            register: register,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            //findUserByCredentials: findUserByCredentials,
            //findUserByUsername: findUserByUsername,
            findUserById : findUserById,
            updateUser: updateUser,
            updateUserById: updateUserById,
            login: login,
            logout: logout
        };

        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            //$http.get('/api/assignment/loggedin');
        }

        function getCurrentUser () {
            return $http.get('/api/assignment/loggedin');
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function register(user) {
            return $http.post('/api/assignment/register', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function findAllUsers(callback) {
            return $http.get('/api/assignment/admin/user');
        }

        function findUserById(userId) {
            return $http.get('/api/assignment/admin/user/' + userId);
        }

        /*function findUserByCredentials(credentials) {
            return $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);
        }

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }*/

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }

        function updateUserById(userId, user)
        {
            return $http.put('/api/assignment/admin/user/' + userId, user);
        }

        function login(user) {
            return $http.post('/api/assignment/login', user);
        }

        function logout() {
            return $http.post('/api/assignment/logout');
        }
    }
})();