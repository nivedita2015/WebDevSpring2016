module.exports = function(app){
    var sheetModel = require("./models/sheet.model.js")();
    var sheetDetailModel = require("./models/sheetDetail.model.js")();
    var UserService = require("./services/sheet.service.server.js")(app, sheetModel);
    var sheetDetailService = require("./services/sheetDetail.service.server.js")(app, sheetDetailModel,sheetModel);
}