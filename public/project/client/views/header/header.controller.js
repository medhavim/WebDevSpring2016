(function(){
    angular
        .module("PrismaticMusicApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;
        vm.$location = $location;
        vm.logout = logout;

        // This function logs the current user out
        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();