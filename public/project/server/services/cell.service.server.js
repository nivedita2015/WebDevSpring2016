module.exports = function(app, model) {
    app.post("/spreadsheetEditor/sheet/:sheetId/cell", createCell);
    app.put("/spreadsheetEditor/sheet/:sheetId/cell/:cellIndex", updateCell);
    app.delete("/spreadsheetEditor/sheet/:sheetId/cell/:cellIndex", removeCell);

    function updateCell(req, res) {
        model
            .updateCell(req.params.sheetId, req.params.cellIndex, req.body)
            .then(function(sheet) {
                res.json(sheet);
            });
    }

    function createCell(req, res) {
        model
            .createCell(req.params.sheetId, req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function removeCell(req, res) {
        model
            .removeCell(req.params.sheetId, req.params.cellIndex)
            .then(function(sheet){
                res.json(sheet);
            });
    }
};
