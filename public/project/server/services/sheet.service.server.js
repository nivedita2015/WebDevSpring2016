module.exports = function(app, model) {
    app.post("/spreadsheetEditor/sheet", createSheet);
    app.get("/spreadsheetEditor/sheet", readAllSheet);
    app.get("/spreadsheetEditor/sheet/:id", readSheet);
    app.put("/spreadsheetEditor/sheet/:id", updateSheet);
    app.delete("/spreadsheetEditor/sheet/:id", removeSheet);

    function createSheet(req, res) {
        model.createSheet(req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readAllSheet(req, res) {
        model
            .readAllSheet()
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readSheet(req, res) {
        model
            .readSheet(req.params.id)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function updateSheet(req, res) {
        model
            .updateSheet(req.params.id, req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function removeSheet(req, res) {
        model
            .removeSheet(req.params.id)
            .then(function(status){
                res.json(status);
            });
    }
};