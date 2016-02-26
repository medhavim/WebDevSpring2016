(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope)
    {
        $scope=$rootScope;
        $scope.logout=logout;

        function logout()
        {
            $scope.loggedIn = false;
            $rootScope.user=null;
        }
    }
})();