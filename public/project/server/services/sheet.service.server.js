module.exports = function(app, sheetModel) {
    app.get("/api/project/sheet", getAllSheets);
    //app.get("/api/project/sheet/:sheetId", getSheetById);
    app.delete("/api/project/sheet/:sheetId", deleteSheetById);
    app.post("/api/project/sheet", createSheet);
    app.put("/api/project/sheet/:sheetId", updateSheetById);



    //function getSheets(req, res){
    //    console.log("entered get sheets for user in sheet service in server");
    //    var userId = req.params.userId;
    //    console.log(userId);
    //    var sheets = sheetModel.findSheetsForUser(userId);
    //    console.log("sheets in sheet service server js (response) is ");
    //    console.log(sheets);
    //    res.send(sheets);
    //};

    //function getSheetById(req, res){
    //    var sheetId = req.params.sheetId;
    //    var sheet = sheetModel.findSheetById(sheetId);
    //    res.send(sheet);
    //};

    function deleteSheetById(req, res){
        console.log("entered deleteSheetById in server service");
        var deleteSheetId = req.params.sheetId;
        var response = sheetModel.deleteSheet(deleteSheetId);
        res.send(response);
    };

    function createSheet(req, res){
        var sheet = req.body;
        var createdSheet = sheetModel.createSheet(sheet);
        res.send(createdSheet);
    };

    function updateSheetById(req, res){
        var sheetId = req.params.sheetId;
        var updatedSheet = req.body;
        var response = sheetModel.updateSheet(sheetId, updatedSheet);
        res.send(response);
    };

    function getAllSheets(req, res){
        var allSheets = [];
        allSheets = sheetModel.findAllSheets();
        res.send(allSheets);
    };
};