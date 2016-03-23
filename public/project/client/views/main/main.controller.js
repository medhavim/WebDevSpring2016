(function() {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("MainController", MainController);

    function MainController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();