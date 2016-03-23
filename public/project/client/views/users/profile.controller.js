(function () {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var vm = this;
        vm.update = update;
        vm.failureMessage = null;
        vm.successMessage = null;
        var currUser = $rootScope.currentUser;
        vm.user = currUser;

        function init() {

        } init();

        // This function updates the details of a particular user ID
        function update(modelUser) {
            var id = currUser._id;
            var userDetails = {
                "username": modelUser.username,
                "password": modelUser.password,
                "firstName": modelUser.firstName,
                "lastName": modelUser.lastName,
                "email": modelUser.email
            };
            UserService.updateUser(id, userDetails)
                .then(function(response) {
                    if(response.data !== "null")
                    {
                        $rootScope.data = response;
                        vm.successMessage = "Profile updated successfully.";
                    } else {
                        vm.failureMessage = "Unable to update profile. Please try again.";
                    }
                });
        }
    }
})();