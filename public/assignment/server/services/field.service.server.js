module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldOfForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    app.get("/api/assignment/form/:formId", findForm);

    function getFieldsOfForm(req, res){
        var formId = req.params.formId;
        formModel
                .findAllFieldsInForm(formId)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    };

    function getFieldOfForm(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        formModel
            .findFieldInForm(fieldId, formId)
            .then(
                function(result)
                {
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };


    function createFieldInForm(req, res){
        var newField = req.body;
        var formId = req.params.formId;
        formModel
            .createFieldInForm(formId, newField)
            .then(
                function(result)
                {
                    res.json(result);

                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };

    function deleteFieldFromForm(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        formModel.deleteFieldFromForm(fieldId,formId)
            .then(
                function(result)
                {
                    res.json(result);

                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };

    function updateFieldInForm(req, res){
        var updatedField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var allFields =
            formModel
                .updateFieldInForm(formId,fieldId, updatedField)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    };

    function findForm(req, res){
        var form =
            formModel
                .findFormById(req.params.formId)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    }
};