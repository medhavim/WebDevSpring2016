(function(){
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .factory("musicService", musicService);

    function musicService($http) {

        var api = {
            findAllComments: findAllComments,
            postComment: postComment,
            deleteComment: deleteComment,
            findFavoriteUsers: findFavoriteUsers,
            postFavoriteUser: postFavoriteUser,
            removeFavoriteUser: removeFavoriteUser
        };
        return api;

        function findAllComments(mbId) {
            return $http.get('/api/project/music/' + mbId + '/comment');
        }

        function postComment(mbId, comment) {
            return $http.post('/api/project/music/' + mbId + '/comment', comment);
        }

        function deleteComment(mbId, commentId) {
            return $http.delete('/api/project/music/' + mbId + '/comment/' + commentId);
        }

        function findFavoriteUsers(mbId) {
            return $http.get('/api/project/music/' + mbId + '/user');
        }

        function postFavoriteUser(userId, username, music) {
            return $http.post("/api/project/user/" + userId + "/" + username + "/music/" + music.mbId, music);
        }

        function removeFavoriteUser(userId, mbId) {
            return $http.delete("/api/project/music/" + mbId + "/user/" + userId);
        }
    }
})();