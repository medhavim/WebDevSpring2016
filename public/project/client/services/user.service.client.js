(function () {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http){
        var model = {
            userFavoritesMusic: userFavoritesMusic,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            register: register,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserById : findUserById,
            updateUser: updateUser,
            updateUserById: updateUserById,
            login: login,
            logout: logout
        };

        return model;

        function userFavoritesMusic(userId, music) {
            return $http.put('/api/project/user/' + userId + '/music', music);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http.get('/api/project/loggedin');
        }

        function createUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function register(user) {
            return $http.post('/api/project/register', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function findAllUsers(callback) {
            return $http.get('/api/project/admin/user');
        }

        function findUserById(userId) {
            return $http.get('/api/project/admin/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);
        }

        function updateUserById(userId, user)
        {
            return $http.put('/api/project/admin/user/' + userId, user);
        }

        function login(user) {
            return $http.post('/api/project/login', user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }
    }
})();