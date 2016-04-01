module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);



    function getFormsForUser(req, res){
        formModel
            .findFormsForUser(req.params.userId)
            .then(function(result){
                res.json(result);
            },
            function(err){
                res.status(400).send(err);
            });
    };

    function getFormById(req, res){

        formModel
            .findFormById(req.params.formId)
            .then(function(result){
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function deleteFormById(req, res){

        formModel
            .deleteForm(req.params.formId)
            .then(function(result) {
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };

    function createFormForUser(req, res){
        var form = req.body;
        var userId = req.params.userId;
        form.userId = userId;

        formModel
            .createForm(form)
            .then(function(result) {
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };

    function updateFormById(req, res){

        formModel
            .updateForm(req.params.formId, req.body)
            .then(function(result) {
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };
};