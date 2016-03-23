(function(){
    angular
        .module("PrismaticMusicApp")
        .controller("HomeController", HomeController);

    function HomeController($location, chartService, displayService) {
        var vm = this;
        vm.$location = $location;


        function init() {
            fetchTopChart();
        }
        init();

        function fetchTopChart() {
            chartService.findTopTracks(renderTopTracks);
            chartService.findTopArtists(renderTopArtists);
        }

        function renderTopTracks(response) {
            vm.topTracks = displayService.displayTrackImage(response.tracks);
        }

        function renderTopArtists(response) {
            vm.topArtists = displayService.displayArtistImage(response.artists);
        }

    }
})();