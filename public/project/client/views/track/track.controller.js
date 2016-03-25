(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("TrackController", TrackController);

    function TrackController($routeParams, artistService, displayService, trackService) {
        var vm = this;

        var mbId = $routeParams.mb_id;

        function init() {
            fetchTracks(mbId);
        }
        init();

        function fetchTracks(mbId) {
            //console.log("in TrackController fetchTracks()");
            artistService.findTracksByMbId(mbId)
                .then(function(response) {
                    vm.details = displayService.displayTrackImage(response.data.toptracks);
                    //console.log(vm.details);
                });
        }

        function trackInfo(mbId) {
            console.log("in TrackController trackInfo()");
            trackService.findTracksByMbId(mbId)
                .then(function(response) {
                    vm.details = displayService.displayTrackImage(response.data.toptracks);
                    //console.log(vm.details);
                });
        }
    }

})();