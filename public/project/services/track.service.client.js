(function(){
    var TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=track.search&track=TRACK";
    var INFO_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=track.getInfo&mbid=MBID";
    var TOPTRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getTopTracks&mbid=MBID&autocorrect=1";

    angular
        .module("PrismaticMusicApp")
        .factory("trackService", trackService);

    function trackService($http) {
        var api = {
            findTracksByMbId: findTracksByMbId,
            findTracksByTitle: findTracksByTitle
            /*,
            displayArtistImage: displayArtistImage,
            displayTrackImage: displayTrackImage,
            displayImage: displayImage */
        };

        return api;

        function findTracksByTitle(title, callback) {
            var url = TRACK_URL
                .replace("TRACK", title);
            $http.get(url)
                .success(callback);
        }

        function findTracksByMbId(mbId, callback) {
            var url = INFO_URL.replace("MBID", mbId);
            //console.log(url);
            $http.get(url)
                .success(callback);
        }
    }

})();