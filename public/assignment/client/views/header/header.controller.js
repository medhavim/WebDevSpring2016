(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope) {
        $scope = $rootScope;
        $scope.logout = logout;

        // This function logs the current user out
        function logout() {
            $scope.loggedIn = false;
            $rootScope.user = null;
        }
    }
})();