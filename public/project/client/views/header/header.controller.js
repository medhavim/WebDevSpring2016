(function(){
    angular
        .module("PrismaticMusicApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;
        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();
        // This function logs the current user out
        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        /*function logout() {
            UserService.logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }*/
    }
})();