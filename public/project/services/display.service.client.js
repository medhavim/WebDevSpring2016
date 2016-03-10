(function(){

    angular
        .module("PrismaticMusicApp")
        .factory("displayService", displayService);

    function displayService($http) {
        var api = {
            displayArtistImage: displayArtistImage,
            displayTrackImage: displayTrackImage,
            displayImage: displayImage
        };

        return api;

        function displayImage (images){
            for (var i in images){
                images[images[i]['size']] = images[i]['#text'];
            }
        }

        function displayArtistImage(res) {
            //var artists = res.results.artistmatches.artist;
            var artists = res.artist;
            for (var a in artists)
                displayImage(artists[a].image);
            return res.artist;
        }

        function displayTrackImage(res) {
            var tracks = res.track;
            for (var t in tracks)
                displayImage(tracks[t].image);
            return res.track;
        }
    }

})();