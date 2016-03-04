(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, artistSearch) {

        $scope.artistTitle = "Coldplay";

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
            //console.log("search");
            //console.log(response);
            $scope.data = response;
            $scope.medImage = artistSearch.displayMediumImage(response);
        }
    }
})();