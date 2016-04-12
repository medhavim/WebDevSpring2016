(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var vm = this;
        vm.update = update;
        vm.failureMessage = null;
        vm.successMessage = null;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    console.log($rootScope.currentUser);
                    vm.user = response.data;
                    UserService.setCurrentUser(response.data);
                    console.log($rootScope.currentUser);
                });
        } init();

        // This function updates the details of a particular user ID
        function update(modelUser) {
            //var id = $rootScope.currentUser._id;
            var id=modelUser._id;

            var userDetails = {
                "username": modelUser.username,
                "password": modelUser.password,
                "firstName": modelUser.firstName,
                "lastName": modelUser.lastName,
                "emails": modelUser.email
            };
            UserService.updateUser(id, userDetails)
                .then(function(response) {
                    if(response.data)
                    {
                        //console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                        //$rootScope.currentUser = response.data;
                        vm.successMessage = "Profile updated successfully.";
                    } else {
                        vm.failureMessage = "Unable to update profile. Please try again.";
                    }
            });
        }
    }
})();