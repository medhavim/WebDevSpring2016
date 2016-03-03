(function(){
    var BASE_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json";

    angular
        .module("PrismaticMusicApp")
        .factory("artistSearch", artistSearch);

    function artistSearch($scope, $http, $routeParams) {
        return $http.get(BASE_URL + '&method=artist.search&artist=:artist' )
        return $resource(BASE_URL + '&method=artist.search&artist=:artist', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:false}
        });
    }
})();