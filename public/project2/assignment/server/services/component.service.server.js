module.exports = function(app, sheetModel) {

    app.get("/api/project1/sheet/:sheetId/component", getComponentsOfSheet);
    app.get("/api/project1/sheet/:sheetId/component/:componentId", getComponentOfSheet);
    app.delete("/api/project1/sheet/:sheetId/component/:componentId", deleteComponentFromSheet);
    app.post("/api/project1/sheet/:sheetId/component", createComponentInSheet);
    app.put("/api/project1/sheet/:sheetId/component/:componentId", updateComponentInSheet);

    function getComponentsOfSheet(req, res){
        console.log("inside server service");
        var sheetId = req.params.sheetId;
        var components =[];
        components = sheetModel.findAllComponentsInSheet(sheetId);
        res.json(components);
    };

    function getComponentOfSheet(req, res){
        var componentId = req.params.componentId;
        var sheetId = req.params.sheetId;
        var component =  sheetModel.findComponentInSheet(componentId, sheetId);
        res.send(component);
    };

    function deleteComponentFromSheet(req, res){
        var componentId = req.params.componentId;
        var sheetId = req.params.sheetId;
        return sheetModel.deleteComponentFromSheet(componentId,sheetId);
    };

    function createComponentInSheet(req, res){

        console.log("inside createComponentForSheet server service");

        var newComponent = req.body;
        var sheetId = req.params.sheetId;
        newComponent._id = (new Date).getTime();
        var createdComponent = sheetModel.createComponentInSheet(sheetId, newComponent);
        res.send(createdComponent);
    };

    function updateComponentInSheet(req, res){
        var updatedComponent = req.body;
        var sheetId = req.params.sheetId;
        var componentId = req.params.componentId;
        sheetModel.updateComponentInSheet(sheetId,componentId, updatedComponent);
    };
};