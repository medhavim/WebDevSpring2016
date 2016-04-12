module.exports = function(app, fieldModel){
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldById);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldById);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldById);

    function findFieldsByFormId(req, res){
        var formId = req.params.formId;
        fieldModel.findFieldsByFormId(formId)
            .then(
                function(form) {
                    res.json(form.fields);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldResponse = fieldModel.findFieldById(fieldId, formId);
        res.json(fieldResponse);
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldById(fieldId, formId)
            .then(
                function(stat) {
                    res.json(200);
                    //findFieldsByFormId(req, res);
                },
                // send error if promise rejected
                function(err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function createField(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        fieldModel.createField(field, formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        fieldModel.updateFieldById(fieldId, updatedField, formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};