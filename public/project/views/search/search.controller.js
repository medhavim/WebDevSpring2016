(function(){
    var BASE_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json";

    angular
        .module("PrismaticMusicApp")
        .controller("SearchController", SearchController);

    function imageTfr (images){
        for (var i in images){
            images[images[i]['size']] = images[i]['#text'];
        }
    }

    function SearchController($scope, artistSearch) {
        $scope.$watch('searchField', function (newVal) {
            if (newVal){
                var res = artistSearch.query({artist: newVal}, function () {
                    var artists = res.results.artistmatches.artist;
                    for (var a in artists) imageTfr(artists[a].image);
                    console.log(artists)
                    $scope.artists = res.results.artistmatches.artist;
                });
            } else {
                $scope.artists = []
            }
        })
    }
})();