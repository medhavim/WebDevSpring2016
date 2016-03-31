(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;
        vm.message = null;

        function init() {

        } init();
        // This function registers a user
        // It checks if all the required fields are present and if both the password entered are same.
        // it also checks if the entered username is already present or not.
        // Appropriate error messages are sent if any error occurs.
        // It registers the user and logs them in if no error is encountered.
        function register(user) {
            vm.message = null;
            // Username input is mandatory
            if (user === null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            // Username input is mandatory
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            // Both Password field is mandatory
            if (!user.password || !user.password2) {
                vm.message = "Please provide a password";
                return;
            }
            // Both passwords entered should be the same
            if (user.password !== user.password2) {
                vm.message = "Passwords must match";
                return;
            }

            // checks if the username is entered is present in the system
            UserService.findUserByUsername(user.username)
                .then(function(response){
                    vm.message = null;
                    console.log(response);
                    if(response.data.length !== 0) {
                        vm.message = "User already exists";
                        return ;
                    } else {
                        var newUser = {
                            "firstName": "",
                            "lastName": "",
                            "username": user.username,
                            "password": user.password,
                            "emails": [user.email]};

                        UserService.createUser(newUser)
                            .then(function(response) {
                                $rootScope.data = response;
                                var createdUser = response.data;
                                UserService.setCurrentUser(createdUser);
                                $location.url("/profile/" + createdUser.username);
                            });
                    }
                });
        }
    }
})();
