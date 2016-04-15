module.exports = function(app, musicModel) {
    app.get('/api/project/music/:id/favuser', findFavoritedUsers);
    app.put('/api/project/music/:mbId/favuser/:userid', createFavoritedUser);

    function  findFavoritedUsers(req, res) {
        var mbId = req.params.id;
        musicModel.findFavoritedUsers(mbId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFavoritedUser(req, res) {
        var mbId = req.params.mbId;
        var userId = req.params.userid;
        var username = req.body;
        var user = {
            userId : userId,
            username : username
        };
        musicModel.createFavoritedUser(mbId, user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};