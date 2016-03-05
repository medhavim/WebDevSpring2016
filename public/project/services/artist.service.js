(function(){
    var ARTIST_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.search&artist=ARTIST";
    var MBID_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getInfo&mbid=MBID";
    var TRACK_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json&method=artist.getTopTracks&mbid=MBID&autocorrect=1";

    angular
        .module("PrismaticMusicApp")
        .factory("artistSearch", artistSearch);

    function artistSearch($http) {
        var api = {
            findArtistByMbId: findArtistByMbId,
            findArtistsByTitle: findArtistsByTitle,
            findTracksByMbId: findTracksByMbId,
            displayMediumImage: displayMediumImage,
            displayImage: displayImage
        };

        return api;

        function findArtistByMbId(mbId, callback) {
            var url = MBID_URL.replace("MBID", mbId);
            console.log(url);
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
            console.log(url);
            $http.get(url)
                .success(callback);
        }

        function displayImage (images){
            for (var i in images){
                images[images[i]['size']] = images[i]['#text'];
            }
        }

        function displayMediumImage(res) {
            var artists = res.results.artistmatches.artist;
            for (var a in artists)
                displayImage(artists[a].image);
            return res.results.artistmatches.artist;
        }
    }

})();