module.exports = function(app) {
    var userModel = require("./models/user.model.js")();
    var musicModel = require("./models/music.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var musicService = require("./services/music.service.server.js")(app, musicModel);
};