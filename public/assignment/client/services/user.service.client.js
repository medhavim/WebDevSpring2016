(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){
        var model = {
            setCurrentUser: setCurrentUser,
            //getProfile: getProfile,
            //getUserProfile: getUserProfile,
            createUser: createUser,
            deleteUserById: deleteUserById,
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser
        };

        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

/*        function getProfile() {
            return $http.get("/api/assignment/profile/"+$rootScope.currentUser._id);
        }

        function getUserProfile(username) {
            return $http.get("/api/assignment/profile/" + username);
        }*/

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function findUserByCredentials(credentials) {
            return $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }
    }
})();