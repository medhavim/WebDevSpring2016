(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;
        vm.message = null;
        //vm.username = null;

        console.log("In register controller");

        function init() {

            console.log("In init register controller");
        } init();
        // This function registers a user
        // It checks if all the required fields are present and if both the password entered are same.
        // it also checks if the entered username is already present or not.
        // Appropriate error messages are sent if any error occurs.
        // It registers the user and logs them in if no error is encountered.
        function register(user) {
            console.log("In register register controller");
            console.log("user");
            console.log(user);
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
            var checkUser = UserService.findUserByUsername(user.username);

            // if the username entered is present, then an error message is displayed
            if (checkUser !== null) {
                vm.message = "User already exists";
                return;
            }

            // New user is created with the valid entered data
            var newUser = {"firstName": "",
                "lastName": "",
                "username": user.username,
                "password": user.password,
                "email": user.email};

            UserService.createUser(newUser)
                .then(function(response) {
                    $rootScope.data = response;
                    var createdUser = response.data;
                    console.log(createdUser);
                    UserService.setCurrentUser(createdUser[createdUser.length - 1]);
                    $location.url("/profile/"+createdUser[createdUser.length - 1].username);
                //$rootScope.user = response;
                //$rootScope.loggedIn = true;
                //$location.path("profile/"+response.username);
            });
        }
    }
})();