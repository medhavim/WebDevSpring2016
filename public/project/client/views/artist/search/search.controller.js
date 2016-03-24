(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("ArtistController", ArtistController);

    function ArtistController($routeParams, artistService, displayService) {

        var vm = this;
        vm.fetchArtist = fetchArtist;
        function init() {
            var artistTitle = $routeParams.title;

            if(artistTitle) {
                fetchArtist(artistTitle);
            }
        }
        init();

        function fetchArtist(artistTitle) {
            artistService.findArtistsByTitle(artistTitle)
                .then(function (response) {
                    vm.data = displayService.displayArtistImage(response.data.results.artistmatches);
                });
        }
    }
})();