(function(){
    angular
        .module("PrismaticMusicApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        console.log($location);
        $scope.$location = $location;
    }
})();