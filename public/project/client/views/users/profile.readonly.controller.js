(function() {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("ProfileReadOnlyController", ProfileReadOnlyController);

    function ProfileReadOnlyController($routeParams, UserService, $rootScope) {
        var vm = this;

        var currUser= $rootScope.currentUser;
        vm.followUsers = null;

        if (currUser !== undefined) {
            for (var i = 0; i < currUser.following.length; i++) {
                if (vm.followUsers === null) {
                    vm.followUsers = [currUser.following[i].username];
                } else {
                    vm.followUsers.push(currUser.following[i].username);
                }
            }
        }

        function init() {

        }

        init();

        var otherUser;
        var otherUserId = $routeParams.userId;
        console.log(otherUserId);
        UserService
            .findUserById(otherUserId)
            .then(
                function(response) {
                    console.log(response.data);
                    var user = response.data[0];
                    user.emails = user.emails.toString();
                    vm.user = user;
                    otherUser = user;
                }
            );

        vm.followUser = followUser;

        function followUser() {

            var otherUsr = {
                username : otherUser.username,
                userId : otherUser._id
            };

            UserService
                .followUser(otherUsr, $rootScope.currentUser._id)
                .then(
                    function(response) {
                        if (vm.followUsers === null) {
                            vm.followUsers = [currUser.following.username];
                        } else {
                            vm.followUsers.push(currUser.following.username);
                        }
                        vm.followMessage = "You are now following " + otherUser.username;
                    }
                )
        }



    }
})();