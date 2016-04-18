(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, artistService, trackService, albumService, displayService) {

        var vm = this;
        vm.fetchArtist = fetchArtist;
        vm.fetchTrack = fetchTrack;
        vm.fetchAlbum = fetchAlbum;

        function init() {
            var searchTitle = $routeParams.title;

            if(searchTitle) {
                vm.sortType = 'artist';
                vm.sortReverse = false;

                fetchArtist(searchTitle);
                fetchTrack(searchTitle);
                fetchAlbum(searchTitle);
            }
        }
        init();

        function fetchArtist(searchTitle) {
            artistService.findArtistsByTitle(searchTitle)
                .then(function (response) {
                    if(response.data) {
                        vm.artist = displayService.displayArtistImage(response.data.results.artistmatches);
                    } else {
                        vm.artist = response.data;
                    }
                });
        }

        function fetchTrack(searchTitle) {
            trackService.findTracksByTitle(searchTitle)
                .then(function (response) {
                    if(response.data) {
                        vm.track = displayService.displayTrackImage(response.data.results.trackmatches);
                    } else {
                        vm.track = response.data;
                    }
                });
        }

        function fetchAlbum(searchTitle) {
            albumService.findAlbumsByTitle(searchTitle)
                .then(function (response) {

                    if(response.data) {
                        vm.album = displayService.displayAlbumImage(response.data.results.albummatches);
                    } else {
                        vm.album = response.data;
                    }
                });
        }
    }
})();