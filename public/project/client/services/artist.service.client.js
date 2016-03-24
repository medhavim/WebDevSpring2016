(function(){
    var ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.search&artist=ARTIST";
    var MBID_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getInfo&mbid=MBID";
    var TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getTopTracks&mbid=MBID&autocorrect=1";

    angular
        .module("PrismaticMusicApp")
        .factory("artistService", artistService);

    function artistService($http) {
        var api = {
            findArtistByMbId: findArtistByMbId,
            findArtistsByTitle: findArtistsByTitle,
            findTracksByMbId: findTracksByMbId
        };

        return api;

        function findArtistByMbId(mbId) {
            var url = MBID_URL.replace("MBID", mbId);
            return $http.get(url);
        }

        function findArtistsByTitle(title) {
            var url = ARTIST_URL.replace("ARTIST", title);
            return $http.get(url);
        }

        function findTracksByMbId(mbId) {
            var url = TRACK_URL.replace("MBID", mbId);
            return $http.get(url);
        }

/*        function findArtistByMbId(mbId, callback) {
            var url = MBID_URL.replace("MBID", mbId);
            //console.log(url);
            $http.get(url)
                .success(callback);
        }

        function findArtistsByTitle(title, callback) {
            var url = ARTIST_URL
                .replace("ARTIST", title);
            $http.get(url)
                .success(callback);
        }

        function findTracksByMbId(mbId, callback) {
            var url = TRACK_URL.replace("MBID", mbId);
            //console.log(url);
            $http.get(url)
                .success(callback);
        }*/
    }

})();