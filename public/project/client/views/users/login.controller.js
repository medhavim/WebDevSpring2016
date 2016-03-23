(function () {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("LoginController", LoginController);

    function LoginController ($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {
            console.log("in client login controller");
            console.log(vm);
        } init();
        // This function verifys the credentials of a user and logs then in.
        // If the username or password is incorrect it sends an error message to be displayed.
        function login(usr) {
            console.log("in client login controller login()");
            console.log(usr);
            if(!usr){
                vm.message = "Enter Login";
                return vm.message;
            }
            UserService.findUserByCredentials({username:usr.username, password:usr.password})
                .then(function(response) {
                    if (response.data !== "null") {
                        $rootScope.loggedIn = true;
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