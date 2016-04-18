(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("TrackController", TrackController);

    function TrackController($routeParams, $rootScope, artistService, displayService, trackService, musicService) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        var currentUser = $rootScope.currentUser;
        vm.favoriteUsers = [];
        vm.musicLiked = "no";

        function init() {
            if (currentUser != null) {
                userId = currentUser._id;
                //console.log(userId);
            } else {
                userId = null;
            }

            fetchTracks(mbId);

            musicService.findAllComments(mbId)
                .then(function (response) {
                    if (response.data === null) {
                        vm.comments = null;
                    } else {
                        vm.comments = response.data.comments;
                    }
                });

            getLikes();
        }
        init();

        function fetchTracks(mbId) {
            trackService.findTracksByMbId(mbId)
                .then(function(response) {
                    console.log(response);
                    vm.details = response.data.track;
                    vm.album = vm.details.album;
                    vm.artist = vm.details.artist;
                    vm.tags = vm.details.toptags.tag;
                    vm.image = displayService.displayImage(vm.album.image);
                    similarTracks(vm.details.mbid);
                    console.log(vm);
                });
        }

        function similarTracks(mbId) {
                trackService.findSimilarTracks(mbId)
                    .then(function (response) {
                        vm.similar = displayService.displayTrackImage(response.data.similartracks);
                    });
        }

        /*function trackInfo(mbId) {
            console.log("in TrackController trackInfo()");
            trackService.findTracksByMbId(mbId)
                .then(function(response) {
                    vm.details = displayService.displayTrackImage(response.data.toptracks);
                });
        }*/

        function getLikes() {
            musicService
                .findFavoriteUsers(mbId)
                .then(function (response) {
                    vm.favoriteUsers = response.data;
                    if (vm.favoriteUsers.length > 0) {
                        vm.musicLiked = "yes";
                    } else {
                        vm.musicLiked = "no";
                    }
                });
        }

        vm.postComment = postComment;

        function postComment() {
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
                var com = musicService.postComment(mbId, comment)
                    .then(function (response) {
                        vm.comments.push(comment);
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

                    console.log(favMusicData);
                    console.log(music);

                    musicService.postFavoriteUser(userId, currentUser.username, music);
                }
            }
            getLikes();
        }
    }

})();