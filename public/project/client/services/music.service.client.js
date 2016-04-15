(function(){
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .factory("musicService", musicService);

    function musicService($http) {

        var comments = [];

        var api = {
            findComments: findComments,
            postComment: postComment,
            findFavoritedUsers: findFavoritedUsers,
            postFavoritedUser: postFavoritedUser
        };
        return api;

        function findComments(mbId) {
            var commentsForMusic = [];
            for (var com in comments) {
                if (comments[com].mbId === mbId)
                {
                    commentsForMusic.push(comments[com]);
                }
            }

            return commentsForMusic;
        }

        function postComment(comment) {
            comments.push(comment);
            return comment;
        }

        function findFavoritedUsers(mbId) {
            return $http.get('/api/project/music/' + mbId + '/favuser');
        }

        function postFavoritedUser(mbId, userId, username) {
            return $http.put('/api/project/music/' + mbId + '/favuser/' + userId, username);
        }

    }
})();