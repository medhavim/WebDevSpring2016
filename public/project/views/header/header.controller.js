(function(){
    angular
        .module("PrismaticMusicApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        $scope = $rootScope;
        $scope.$location = $location;
        $scope.logout = logout;

        // This function logs the current user out
        function logout() {
            $scope.loggedIn = false;
            $rootScope.user = null;
        }
    }
})();