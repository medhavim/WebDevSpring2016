module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormByUserId(req, res) {
        var userId = Number(req.params.userId);
        var formResponse = formModel.findFormByUserId(userId);
        res.json(formResponse);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var formResponse = formModel.findFormById(formId);
        res.json(formResponse);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var formResponse = formModel.deleteFormById(formId);
        res.json(formResponse);
    }

    function createForm(req, res) {
        var userId = Number(req.params.userId);
        var form = req.body;
        var formResponse = formModel.createForm(form, userId);
        res.json(formResponse);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var formResponse = formModel.updateFormById(formId, form);
        res.json(formResponse);
    }
};