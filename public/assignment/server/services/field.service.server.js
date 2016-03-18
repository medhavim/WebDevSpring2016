module.exports = function(app, formModel) {
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
        var field = formModel.findFieldByFieldAndFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldByFieldAndFormId(formId, fieldId);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createField(formId, field);
    }

    function updateFieldByFieldAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateFieldByFieldAndFormId(formId, fieldId, field);
    }
};