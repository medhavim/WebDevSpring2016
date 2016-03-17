(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.register = register;
        $scope.message = null;
        $scope.username = "";

        // This function registers a user
        // It checks if all the required fields are present and if both the password entered are same.
        // it also checks if the entered username is already present or not.
        // Appropriate error messages are sent if any error occurs.
        // It registers the user and logs them in if no error is encountered.
        function register(user) {
            // Username input is mandatory
            if (user === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            // Username input is mandatory
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            // Both Password field is mandatory
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            // Both passwords entered should be the same
            if (user.password !== user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            // checks if the username is entered is present in the system
            var checkUser = UserService.findUserByUsername(user.username);

            // if the username entered is present, then an error message is displayed
            if (checkUser !== null) {
                $scope.message = "User already exists";
                return;
            }

            // New user is created with the valid entered data
            var newUser = {"firstName": "",
                "lastName": "",
                "username": user.username,
                "password": user.password,
                "email": user.email};

            UserService.createUser(newUser, function(response) {
                $rootScope.user = response;
                $rootScope.loggedIn = true;
                $location.path("profile/"+response.username);
            });
        }
    }
})();