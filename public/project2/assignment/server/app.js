module.exports = function(app){
    var userModel = require("./models/user.model.js")();
    var sheetModel = require("./models/sheet.model.js")();
    var componentModel = require("./models/sheet.model.js")();

    var UserService = require("./services/user.service.server.js")(app, userModel);
    var SheetService = require("./services/sheet.service.server.js")(app, sheetModel,userModel);
    var ComponentService = require("./services/component.service.server.js")(app,componentModel);
}