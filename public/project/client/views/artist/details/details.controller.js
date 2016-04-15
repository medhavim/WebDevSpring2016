(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistDetailsController", ArtistDetailsController);

    function ArtistDetailsController($routeParams, $rootScope, artistService, displayService, musicService, UserService, $location) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;

        function init() {
            //console.log("currentUser in details");
            //console.log(currentUser);
            fetchArtist(mbId);
            trackInfo(mbId);
            musicService
                .findFavoritedUsers(mbId)
                .then(function(response) {
                    var users = response.data;
                    var favoritedUsers = [];
                    //console.log("users");
                    //console.log(users);
                    for(var u in users) {
                        UserService
                            .findUserById(users[u])
                            .then(function(response) {
                                favoritedUsers.push(response.data.username);
                            });
                    }
                    vm.favoritedUsers = favoritedUsers;
                    //console.log(vm.favoritedUsers);

                });
            console.log(vm);
        }
        init();

        function fetchArtist(mbId) {
            //console.log("in ArtistDetailsController fetchArtist()");
            artistService.findArtistByMbId(mbId)
                .then(function(response) {
                    vm.details = displayService.displayArtistImage(response.data);
                    vm.artistImage = displayService.displayImage(vm.details.image);
                    vm.similar = displayService.displayArtistImage(vm.details.similar);
                    vm.tags = vm.details.tags.tag;
                    vm.stats = vm.details.stats;
                    console.log("fetchArtist");
                    console.log(vm);
                });
        }

        function trackInfo(mbId) {
            //console.log("in ArtistDetailsController trackInfo()");
            artistService.findTracksByMbId(mbId)
            .then(function(response){
                vm.data = response.data;
                vm.tracks = displayService.displayTrackImage(vm.data.toptracks)
            });
        }


        var commentsForMusic = musicService.findComments(mbId);
        vm.comments = commentsForMusic;


        vm.postComment = postComment;

        function postComment(mbId) {
            if (currentUser === undefined) {
                alert("You need to login to post a comment!!");
                $location.path("/login");
            }
            else {
                var comment = {
                    commentId: (new Date).getTime(),
                    mbId: mbId,
                    username: $rootScope.currentUser.username,
                    timestamp: new Date(),
                    comment: vm.commentBox
                };
                var com = musicService.postComment(comment);
                vm.comments.push(com);
            }
        }

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            if (currentUser === undefined) {
                alert("You need to login to delete a comment!!");
                $location.path("/login");
            }
            else {
                vm.comments.splice(index, 1);
            }
        }

        vm.userFavoritesMusic = userFavoritesMusic;

        function userFavoritesMusic(favMusicData) {
            if (currentUser === undefined) {
                alert("You need to login to add to favourites!!");
                $location.path("/login");
            }
            else {
                //console.log(currentUser);
                //console.log(favMusicData);
                vm.details.likes = [];
                vm.details.likes.push(currentUser._id);
                var music = {
                    mbId: favMusicData.mbid,
                    musicTitle: favMusicData.name
                };
                //console.log(music);

                UserService
                    .userFavoritesMusic(currentUser._id, music)
                    .then(function (response) {
                        $rootScope.currentUser.favoriteMusic = response.data;
                    });

                musicService
                    .postFavoritedUser(mbId, currentUser._id, currentUser.username)
                    .then(function (response) {
                        var users = response.data;
                        var favoritedUsers = [];
                        for (var u in users) {
                            UserService
                                .findUserById(users[u])
                                .then(function (response) {
                                    favoritedUsers.push(response.data.username);
                                });
                        }
                        vm.favoritedUsers = favoritedUsers;
                    });
            }
        }
    }
})();