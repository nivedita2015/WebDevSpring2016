module.exports = function(app){
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var fieldModel = require("./models/form.model.js")();

    var UserService = require("./services/user.service.server.js")(app, userModel);
    var FormService = require("./services/form.service.server.js")(app, formModel,userModel);
    var FieldService = require("./services/field.service.server.js")(app,fieldModel);
}