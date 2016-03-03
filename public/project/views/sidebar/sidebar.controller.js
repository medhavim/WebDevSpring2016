(function() {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope) {
        $scope = $rootScope;
    }
})();