(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.register = register;
        $scope.message = null;
        $scope.username = "";

        function register(user) {
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            var checkUser = UserService.findUserByUsername(user.username);
            if (checkUser != null) {
                $scope.message = "User already exists";
                return;
            }

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