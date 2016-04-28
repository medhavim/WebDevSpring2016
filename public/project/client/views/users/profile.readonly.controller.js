(function() {
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("ProfileReadOnlyController", ProfileReadOnlyController);

    function ProfileReadOnlyController($routeParams, UserService, $rootScope) {
        var vm = this;

        var currUser= $rootScope.currentUser;
        vm.followUsers = null;
        vm.following = currUser.following;
        var otherUser;
        var otherUserId = $routeParams.userId;
        vm.followBtn = "yes";
        vm.otherFollowBtn = "yes";



        function init() {
            if (currUser._id === otherUserId) {
                vm.followBtn = "no";
            } else {
                vm.followBtn = "yes";
            }

            for (var i in vm.following) {
                if (vm.following[i].userId === otherUserId) {
                    vm.otherFollowBtn = "no";
                } else {
                    vm.otherFollowBtn = "yes";
                }
            }

            UserService
                .findUserById(otherUserId)
                .then(
                    function(response) {
                        var user = response.data[0];
                        user.emails = user.emails.toString();
                        vm.user = user;
                        otherUser = user;
                    }
                );

            if (currUser !== undefined) {
                for (var i = 0; i < currUser.following.length; i++) {
                    if (vm.followUsers === null) {
                        vm.followUsers = [currUser.following[i].username];
                    } else {
                        vm.followUsers.push(currUser.following[i].username);
                    }
                }
            }
        }

        init();



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
                        vm.otherFollowBtn="no";
                        vm.followMessage = "You are now following " + otherUser.username;
                    }
                );
            init();
        }

    }
})();