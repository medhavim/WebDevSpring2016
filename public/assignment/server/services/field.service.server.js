module.exports = function(app, formModel) {
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldByFieldAndFormId);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldByFieldAndFormId);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldByFieldAndFormId);


    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fieldResponse = formModel.findFieldsByFormId(formId);
        res.json(fieldResponse);
    }

    function findFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldResponse = formModel.findFieldByFieldAndFormId(formId, fieldId);
        res.json(fieldResponse);
    }

    function deleteFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldResponse = formModel.deleteFieldByFieldAndFormId(formId, fieldId);
        res.json(fieldResponse);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var fieldResponse = formModel.createField(formId, field);
        res.json(fieldResponse);
    }

    function updateFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var fieldResponse = formModel.updateFieldByFieldAndFormId(formId, fieldId, field);
        res.json(fieldResponse);
    }
};