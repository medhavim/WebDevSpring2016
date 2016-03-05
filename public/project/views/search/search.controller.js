(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, artistSearch) {

        function init() {
            var artistTitle = $routeParams.title;

            if(artistTitle) {
                fetchArtist(artistTitle);
            }
        }
        init();

        function fetchArtist(artistTitle) {
            artistSearch.findArtistsByTitle(artistTitle, renderArtists);
        }

        function renderArtists(response) {
            $scope.data = artistSearch.displayMediumImage(response);
        }
    }
})();