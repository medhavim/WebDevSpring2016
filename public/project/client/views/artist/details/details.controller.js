(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistDetailsController", ArtistDetailsController);

    function ArtistDetailsController($routeParams, $location, $rootScope, artistService, displayService, musicService, UserService) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;

        function init() {
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
        }
        init();

        function fetchArtist(mbId) {
            console.log("in ArtistDetailsController fetchArtist()");
            artistService.findArtistByMbId(mbId)
                .then(function(response) {
                    vm.details = displayService.displayArtistImage(response.data);
                    vm.artistImage = displayService.displayImage(vm.details.image);
                    vm.similar = displayService.displayArtistImage(vm.details.similar);
                    vm.tags = vm.details.tags.tag;
                    vm.stats = vm.details.stats;
                });
        }

        function trackInfo(mbId) {
            console.log("in ArtistDetailsController trackInfo()");
            artistService.findTracksByMbId(mbId)
            .then(function(response){
                vm.data = response.data;
            });
        }


        var commentsForMusic = musicService.findComments(mbId);
        vm.comments = commentsForMusic;


        vm.postComment = postComment;

        function postComment(mbId) {
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

        vm.deleteComment = deleteComment;

        function deleteComment(index) {
            vm.comments.splice(index, 1);
        }

        vm.userFavoritesMusic = userFavoritesMusic;

        function userFavoritesMusic(favMusicData) {
            console.log(currentUser);
            console.log(favMusicData);
            vm.details.likes = [];
            vm.details.likes.push(currentUser._id);
            var music = {
                mbId : favMusicData.mbid,
                musicTitle : favMusicData.name
            };
            console.log(music);

            UserService
                .userFavoritesMusic(currentUser._id, music)
                .then(function(response) {
                    $rootScope.currentUser.favoriteMusic = response.data;
                });

            musicService
                .postFavoritedUser(mbId, currentUser._id)
                .then(function(response) {
                    var users = response.data;
                    var favoritedUsers = [];
                    for(var u in users) {
                        UserService
                            .findUserById(users[u])
                            .then(function(response) {
                                favoritedUsers.push(response.data.username);
                            });
                    }
                    vm.favoritedUsers = favoritedUsers;
                });
        }
    }
})();