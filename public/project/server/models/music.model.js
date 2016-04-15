var q = require("q");

module.exports = function (db, mongoose) {

    var ProjectMusicSchema = require('./music.schema.server.js')(mongoose);
    var ProjectMusicModel = mongoose.model('ProjectMusic', ProjectMusicSchema);

    var api = {
        findFavoritedUsers: findFavoritedUsers,
        createFavoritedUser : createFavoritedUser
    };

    return api;

    function findFavoritedUsers(mbId) {
        var deferred = q.defer();

        ProjectMusicModel.findOne({mbId : mbId},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function createFavoritedUser(mbId, user) {
        return ProjectMusicModel.findOne({mbId: mbId})
            .then(
                function (music) {
                    music.favoritedUsers.push(user);
                    return music.save();
                }
            );
    }
};