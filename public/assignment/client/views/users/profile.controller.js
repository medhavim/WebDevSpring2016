(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, $routeParams, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.user;

        // appends the username to the Url
        if($scope.user) {
            $location.url('/profile/'+$scope.user.username);
        }

        // This function updates the details of a particular user ID
        function update(user) {
            UserService.updateUser($routeParams.userid, user, function(response) {
            });
        }
    }
})();