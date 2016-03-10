(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("TrackController", TrackController);

    function TrackController($scope, $http, $routeParams, artistService, displayService) {
        var vm = this;

        var mbId = $routeParams.mb_id;

        function init() {
            fetchTracks(mbId);
        }
        init();

        function fetchTracks(mbId) {
            artistService.findTracksByMbId(mbId, renderDetails);
        }

        function renderDetails(response) {
            vm.details = displayService.displayTrackImage(response.toptracks);
        }
    }

})();