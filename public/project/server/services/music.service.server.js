module.exports = function(app, musicModel) {
    app.get('/api/project/music/:id/favuser', findFavoritedUsers);
    app.put('/api/project/music/:mbId/favuser/:userid', createFavoritedUser);

    function  findFavoritedUsers(req, res) {
        var mbId = req.params.id;
        var favoritedUsers = musicModel.findFavoritedUsers(mbId);
        res.json(favoritedUsers);
    }

    function createFavoritedUser(req, res) {
        var mbId = req.params.mbId;
        var userId = Number(req.params.userid);
        var favoritedUsers = musicModel.createFavoritedUser(mbId, userId);
        res.json(favoritedUsers);
    }
};