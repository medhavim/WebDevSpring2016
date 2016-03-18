module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findFormByUserId(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId);
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createForm(form, userId);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formId, form);
    }
};