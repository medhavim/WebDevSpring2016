var mock = require('./music.mock.json');

module.exports = function () {
    var api = {
        findFavoritedUsers: findFavoritedUsers,
        createFavoritedUser : createFavoritedUser
    };

    return api;

    function findFavoritedUsers(mbId) {
        for (var l in mock) {
            if (mock[l]._id === mbId) {
                return mock[l].favoritedUsers;
            }
        }
        return null;
    }

    function createFavoritedUser(mbId, userId) {
        for (var l in mock) {
            if (mock[l]._id === mbId) {
                mock[l].favoritedUsers.push(userId);
                return mock[l].favoritedUsers;
            }
                mock[l]._id = mbId;
                mock[l].favoritedUsers = userId;
                return mock[l].favoritedUsers;

        }
    }
};