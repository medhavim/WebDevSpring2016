module.exports = function(app, musicModel, userModel) {
    app.post("/api/project/user/:userId/music/:mbId", userLikesMusic);
    app.get("/api/project/music/:mbId/user", findUserLikes);

    function findUserLikes (req, res) {
        var mbId = req.params.mbId;

        var music = null;
        musicModel
            .findMusicByMbId(mbId)
            .then (
                function (doc) {
                    music = doc;
                    if (doc) {
                        return userModel.findUsersByIds(music.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    music.userLikes = users;
                    res.json(music);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesMusic(req, res) {
        var musicOmdb  = req.body;
        var userId = req.params.userId;
        var mbId = req.params.mbId;
        var music;

        musicModel
            .userLikesMusic(userId, musicOmdb)
            // add user to music likes
            .then(
                function (music) {
                    return userModel.userLikesMusic(userId, music);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add music to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}