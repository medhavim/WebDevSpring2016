module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(db, mongoose);
    //var userModelAssignment = require("../../assignment/server/models/user.model.js")(db, mongoose);
    //var userModelProject = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose);
    var fieldModel = require('./models/field.model.js')(db, mongoose, formModel);

    //var userService = require("./services/user.service.server.js")(app, userModelProject, userModelAssignment);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
};