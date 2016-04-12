(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($rootScope, $location, UserService) {

        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {

        } init();
        // This function verifys the credentials of a user and logs then in.
        // If the username or password is incorrect it sends an error message to be displayed.
        function login(user) {
            vm.message = null;
            if(!user || !user.password || !user.username) {
                vm.message = "Enter Login Details";
                return vm.message;
            } else {
                UserService.login(user)
                //UserService.findUserByCredentials({username: user.username, password: user.password})
                    .then(function (response) {
                        console.log("login");
                        console.log(response);
                        if (response.data !== null) {
                            //$rootScope.loggedIn = true;
                            $rootScope.data = response.data;
                            vm.user = response.data;
                            UserService.setCurrentUser(vm.user);
                            $location.path("/profile/" + vm.user.username);

                            console.log($rootScope.currentUser);
                            if ($rootScope.currentUser.roles !== null
                                && typeof($rootScope.currentUser.roles) !== 'undefined'
                                && $rootScope.currentUser.roles.indexOf('admin') >= 0) {
                                $location.path("/admin");
                            } else {
                                $location.path("/profile/" + vm.user.username);
                            }
                        } else {
                            vm.message = "Wrong username and/or password.";
                        }
                    });
            }
        }
    }
})();