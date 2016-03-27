module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/component", getComponentsOfForm);
    app.get("/api/assignment/form/:formId/component/:componentId", getComponentOfForm);
    app.delete("/api/assignment/form/:formId/component/:componentId", deleteComponentFromForm);
    app.post("/api/assignment/form/:formId/component", createComponentInForm);
    app.put("/api/assignment/form/:formId/component/:componentId", updateComponentInForm);

    function getComponentsOfForm(req, res){
        console.log("inside server service");
        var formId = req.params.formId;
        var components =[];
        components = formModel.findAllComponentsInForm(formId);
        res.json(components);
    };

    function getComponentOfForm(req, res){
        var componentId = req.params.componentId;
        var formId = req.params.formId;
        var component =  formModel.findComponentInForm(componentId, formId);
        res.send(component);
    };

    function deleteComponentFromForm(req, res){
        var componentId = req.params.componentId;
        var formId = req.params.formId;
        return formModel.deleteComponentFromForm(componentId,formId);
    };

    function createComponentInForm(req, res){

        console.log("inside createComponentForForm server service");

        var newComponent = req.body;
        var formId = req.params.formId;
        newComponent._id = (new Date).getTime();
        var createdComponent = formModel.createComponentInForm(formId, newComponent);
        res.send(createdComponent);
    };

    function updateComponentInForm(req, res){
        var updatedComponent = req.body;
        var formId = req.params.formId;
        var componentId = req.params.componentId;
        formModel.updateComponentInForm(formId,componentId, updatedComponent);
    };
};