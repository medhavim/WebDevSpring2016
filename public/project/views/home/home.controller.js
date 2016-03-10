(function(){
    angular
        .module("PrismaticMusicApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, $rootScope, chartService, displayService) {
        $scope = $rootScope;
        $scope.$location = $location;

        // This function logs the current user out
        function init() {
            fetchTopChart();
        }
        init();

        function fetchTopChart() {
            chartService.findTopTracks(renderTopTracks);
            chartService.findTopArtists(renderTopArtists);
        }

        function renderTopTracks(response) {
            $scope.topTracks = displayService.displayTrackImage(response.tracks);
            console.log($scope.topTracks);
        }

        function renderTopArtists(response) {
            $scope.topArtists = displayService.displayArtistImage(response.artists);
        }

    }
})();