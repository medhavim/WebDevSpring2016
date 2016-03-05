(function() {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("MainController", MainController);

    function MainController($scope,$location) {
        $scope.$location = $location;
    }
})();