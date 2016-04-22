module.exports = function(app,db,mongoose){
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);

    var UserService = require("./services/user.service.server.js")(app, userModel);
    var FormService = require("./services/form.service.server.js")(app, formModel,userModel);
    var FieldService = require("./services/field.service.server.js")(app,formModel);
}