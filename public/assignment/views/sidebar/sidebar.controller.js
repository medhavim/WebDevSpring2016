(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $rootScope) {
        $scope=$rootScope;
    }
})();