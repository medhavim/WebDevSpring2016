(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistDetailsController", ArtistDetailsController);

    function ArtistDetailsController($routeParams, artistService, displayService, musicService) {
        var vm = this;

        var mbId = $routeParams.mb_id;

        function init() {
            fetchArtist(mbId);
            trackInfo(mbId);
            userLikes(mbId);
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

        function userLikes(mbId) {
            console.log("in ArtistDetailsController userLikes()");
            musicService
                .findUserLikes (imdbID)
                .then(function(response){
                    vm.music = response.data;
                });
        }
    }

})();