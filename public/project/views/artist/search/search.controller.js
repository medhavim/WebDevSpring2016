(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistController", ArtistController);

    function ArtistController($scope, $http, $routeParams, $location, artistService) {

        function init() {
            var artistTitle = $routeParams.title;

            if(artistTitle) {
                fetchArtist(artistTitle);
            }
        }
        init();

        function fetchArtist(artistTitle) {
            artistService.findArtistsByTitle(artistTitle, renderArtists);
        }

        function renderArtists(response) {
            $scope.data = artistService.displayArtistImage(response);
        }
    }
})();