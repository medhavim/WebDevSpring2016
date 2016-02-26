(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, $routeParams, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.user;

        if($scope.user) {
            $location.url('/profile/'+$scope.user.username);
        }

        function update(user) {
            UserService.updateUser($routeParams.userid, user, function(response) {
            });
        }
    }
})();