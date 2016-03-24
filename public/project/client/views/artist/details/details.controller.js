(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistDetailsController", ArtistDetailsController);

    function ArtistDetailsController($routeParams, artistService, displayService) {
        var vm = this;

        var mbId = $routeParams.mb_id;

        function init() {
            fetchArtist(mbId);
            trackInfo(mbId);
        }
        init();

        function fetchArtist(mbId) {
            artistService.findArtistByMbId(mbId, renderArtistDetails);
        }

        function renderArtistDetails(response) {
            console.log(response);
            vm.details = displayService.displayArtistImage(response);
            vm.artistImage = displayService.displayImage(vm.details.image);
            console.log("vm.details");
            console.log(vm.details);
            vm.similar = displayService.displayArtistImage(vm.details.similar);

            vm.tags = vm.details.tags.tag;
            vm.stats = vm.details.stats;
            //console.log(vm.artistImage);
        }

        function trackInfo(mbId) {
            //console.log("in detailscontroller trackinfo");
            //console.log("mbid = "+mbId);
            artistService.findTracksByMbId(mbId, renderTrackDetails);
        }

        function renderTrackDetails(response) {
            vm.data = response;
        }
    }

})();