(function () {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("LoginController", LoginController);

    function LoginController ($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {

        } init();
        // This function verifys the credentials of a user and logs then in.
        // If the username or password is incorrect it sends an error message to be displayed.
        function login(usr) {
            if(!usr){
                vm.message = "Enter login details.";
                return vm.message;
            }
            UserService.findUserByCredentials({username:usr.username, password:usr.password})
                .then(function(response) {
                    if (response.data !== "null") {
                        vm.usr = response.data;
                        UserService.setCurrentUser(vm.usr);
                        $location.path("/profile/" + vm.usr.username);
                    } else {
                        vm.message = "Wrong username and/or password.";
                    }
                });
        }
    }
})();