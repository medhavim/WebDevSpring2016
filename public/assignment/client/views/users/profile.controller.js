(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.update=update;
        var currentUser = $rootScope.user;

        function init() {
            if(currentUser) {
                $location.url('/profile/'+currentUser.username);
            }
        } init();

        // This function updates the details of a particular user ID
        function update(user) {
            UserService.updateUser($routeParams.userid, user, function(response) {
            });
        }
    }
})();