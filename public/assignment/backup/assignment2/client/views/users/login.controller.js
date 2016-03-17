(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService) {
        $scope.login = login;
        $scope.message = null;

        // This function verifys the credentials of a user and logs then in.
        // If the username or password is incorrect it sends an error message to be displayed.
        function login(user) {
            UserService.findUserByCredentials(user.username, user.password, function(response) {
                if (response != null) {
                    $rootScope.loggedIn = true;
                    $rootScope.user = response;
                    $location.path("profile/"+user.username);
                } else {
                    $scope.message = "Wrong username and/or password.";
                }
            });
        }
    }
})();