(function(){
    var TOP_ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=chart.gettopartists&limit=15";
    var TOP_TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=chart.gettoptracks&limit=15";

    angular
        .module("PrismaticMusicApp")
        .factory("chartService", chartService);

    function chartService($http) {
        var api = {
            findTopTracks: findTopTracks,
            findTopArtists: findTopArtists
        };

        return api;

        function findTopTracks() {
            var url = TOP_TRACK_URL;
            return $http.get(url);
        }

        function findTopArtists() {
            var url = TOP_ARTIST_URL;
            return $http.get(url);
        }
    }

})();