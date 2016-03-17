module.exports = function(app, db, mongoose) {

    var userModel    = require("./models/user.model.js")();
    var formModel   = require("./models/form.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, formModel, userModel);
    var formService = require("./services/forms.service.server.js")(app, formModel, userModel);
}