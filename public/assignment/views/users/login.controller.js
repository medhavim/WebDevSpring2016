(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService) {
        $scope.login = login;
        $scope.message = null;

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