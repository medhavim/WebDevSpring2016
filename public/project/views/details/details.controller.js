(function(){
    var BASE_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json";

    angular
        .module("PrismaticMusicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $routeParams, $http) {
        $http.get(BASE_URL + "&method=artist.getInfo&mbid=" + $routeParams.mbid).success(function(data) {
            var images = data.artist.image;
            for (var i in images){
                images[images[i]['size']] = images[i]['#text'];
            }
            $scope.artist = data.artist;
        });
    }
})();