(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams, artistService, trackService) {
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
            vm.details = response;
            console.log(vm.details);
        }

        function trackInfo(mbId) {
            console.log("in detailscontroller trackinfo");
            console.log("mbid = "+mbId);
            artistService.findTracksByMbId(mbId, renderTrackDetails);
        }

        function renderTrackDetails(response) {
            vm.data = response;
        }
    }

})();