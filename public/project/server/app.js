module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(db, mongoose);
    //var userModelAssignment = require("../../assignment/server/models/user.model.js")(db, mongoose);
    //var userModelProject = require("./models/user.model.js")(db, mongoose);
    var musicModel = require("./models/music.model.js")(db, mongoose);

    //var userService = require("./services/user.service.server.js")(app, userModelProject, userModelAssignment);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var musicService = require("./services/music.service.server.js")(app, musicModel);
};