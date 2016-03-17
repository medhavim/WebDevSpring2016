module.exports = function(app, formModel, userModel) {
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldByFieldAndFormId);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldByFieldAndFormId);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldByFieldAndFormId);


    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function findFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFieldAndFormId(fieldId, formId);
        res.json(field);
    }

    function deleteFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldByFieldAndFormId(fieldId, formId);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createField(field, formId);
    }

    function updateFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateFieldByFieldAndFormId(fieldId, formId, field);
    }
};