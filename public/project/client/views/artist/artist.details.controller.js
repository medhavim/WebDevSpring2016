(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistController", ArtistController);

    function ArtistController($routeParams, $rootScope, artistService, displayService, musicService, $location) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        var currentUser = $rootScope.currentUser;
        vm.favoriteUsers = [];
        vm.musicLiked = "no";

        var userId;

        function init() {
            if (currentUser != null) {
                userId = currentUser._id;
                //console.log(userId);
            } else {
                userId = null;
            }

            fetchArtist(mbId);

            trackInfo(mbId);

            musicService.findAllComments(mbId)
                .then(function (response) {
                    //console.log(response.data);
                    if (response.data === null) {
                        vm.comments = null;
                    } else {
                        vm.comments = response.data.comments;
                    }
                });

            getLikes();

            //console.log(vm);
        }

        init();

        function getLikes() {
            musicService
                .findFavoriteUsers(mbId)
                .then(function (response) {
                    //console.log("getLikes");
                    //console.log(response);
                    vm.favoriteUsers = response.data;
                    if (vm.favoriteUsers.length > 0) {
                        vm.musicLiked = "yes";
                    } else {
                        vm.musicLiked = "no";
                    }
                });
        }

        function fetchArtist(mbId) {
            //console.log("in ArtistDetailsController fetchArtist()");
            artistService.findArtistByMbId(mbId)
                .then(function (response) {
                    vm.details = displayService.displayArtistImage(response.data);
                    vm.artistImage = displayService.displayImage(vm.details.image);
                    vm.similar = displayService.displayArtistImage(vm.details.similar);
                    vm.tags = vm.details.tags.tag;
                    vm.stats = vm.details.stats;
                    //console.log("fetchArtist");
                    console.log(vm);
                });
        }

        function trackInfo(mbId) {
            artistService.findTracksByMbId(mbId)
                .then(function (response) {
                    vm.data = response.data;
                    vm.tracks = displayService.displayTrackImage(vm.data.toptracks)
                    //console.log(vm.tracks);
                });
        }

        vm.postComment = postComment;

        function postComment(favMusicData) {
            if (currentUser === undefined) {
                alert("You need to login to post a comment!!");
                $location.path("/login");
            }
            else {
                var comment = {
                    commentId: (new Date).getTime(),
                    userId: $rootScope.currentUser._id,
                    username: $rootScope.currentUser.username,
                    timestamp: new Date(),
                    comment: vm.commentBox
                };
                var musicTitle= favMusicData.name;
                var com = musicService.postComment(mbId, musicTitle, comment)
                    .then(function (response) {
                        //console.log(response.data);
                        if (vm.comments === null) {
                            vm.comments = [comment];
                        } else {
                            vm.comments.push(comment);
                        }
                    });
            }
        }

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            if (currentUser === undefined) {
                alert("You need to login to post a comment!!");
                $location.path("/login");
            }
            else {
                var commentId = vm.comments[index].commentId;
                musicService.deleteComment(mbId, commentId)
                    .then(
                        function (response) {
                            vm.comments.splice(index, 1);
                        }
                    );
            }
        }

        vm.userFavoritesMusic = userFavoritesMusic;

        function userFavoritesMusic(favMusicData) {
            if (currentUser === undefined) {
                alert("You need to login to add to favourites!!");
                $location.path("/login");
            }
            else {
                if (vm.musicLiked == "yes") {
                    vm.musicLiked = "no";
                    musicService.removeFavoriteUser(userId, favMusicData.mbid);
                } else {
                    vm.musicLiked = "yes";
                    var music = {
                        mbId: favMusicData.mbid,
                        musicTitle: favMusicData.name
                    };

                    musicService.postFavoriteUser(userId, currentUser.username, music)
                        .then(function(response) {
                            vm.favoriteUsers.push(currentUser.username);
                        })
                }
            }
            //getLikes();
            init();
        }
    }
})();