(function(){
    angular
        .module("PrismaticMusicApp")
        .factory("musicService", musicService);

    function musicService($http) {
        var api = {
            userLikesMusic: userLikesMusic,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (mbId) {
            return $http.get("/api/project/music/"+mbId+"/user");
        }

        function userLikesMusic(userId, music) {
            return $http.post("/api/project/user/"+userId+"/music/"+music.mbId, music);
        }
    }
})();