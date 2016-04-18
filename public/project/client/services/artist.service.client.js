(function(){
    'use strict';
    var ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.search&artist=ARTIST&autocorrect=1";
    var MBID_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getInfo&mbid=MBID&autocorrect=1";
    var TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getTopTracks&mbid=MBID&autocorrect=1";
    var SIMILAR_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getsimilar&artist=ARTIST&autocorrect=1";

    angular
        .module("PrismaticMusicApp")
        .factory("artistService", artistService);

    function artistService($http) {
        var api = {
            findArtistByMbId: findArtistByMbId,
            findArtistsByTitle: findArtistsByTitle,
            findTracksByMbId: findTracksByMbId,
            findSimilarArtists: findSimilarArtists
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

        function findSimilarArtists(title) {
            var url = SIMILAR_URL.replace("ARTIST", title);
            return $http.get(url);
        }
    }

})();