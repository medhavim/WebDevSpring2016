module.exports = function(app, formModel) {
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        var formResponse = formModel.findFormByUserId(userId)
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

    function findFormById(req, res) {
        var formId = req.params.formId;
        var formResponse = formModel.findFormById(formId)
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

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var formResponse = formModel.deleteFormById(formId)
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

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var formResponse = formModel.createForm(form, userId)
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

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var formResponse = formModel.updateFormById(formId, form)
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