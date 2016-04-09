(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;

        // This function logs the current user out
        function logout() {
            //UserService.setCurrentUser(null);
            //$location.url("/home");
            UserService.logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
    }
})();