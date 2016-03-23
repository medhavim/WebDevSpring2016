(function() {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location) {
        var vm = this;
        vm.$location= $location;
    }
})();