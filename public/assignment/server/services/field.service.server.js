var forms = require("../models/form.mock.json");

module.exports = function(app, formModel){
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId" , deleteFieldById);
    app.post('/api/assignment/form/:formId/field' , createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function findFieldsByFormId(req, res){
        var formId = req.params.formId;
        var selectedFields = [];
        for(var i = 0; i<forms.length ; i++){
            if (forms[i]._id == formId){
                selectedFields = forms[i].fields;
                res.send(selectedFields);
            }
        }
        return null;
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var selectedFields = [];
        for(var i = 0; i<forms.length ; i++){
            if (forms[i]._id == formId){
                for (var j = 0 ; j < forms[i].fields.length ; j++){
                    if (forms[i].fields[j]._id == fieldId){
                        selectedFields = forms[i].fields[j];
                        return selectedFields;
                    }
                }

            }
        }
        return null;
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        for(var i = 0; i<forms.length ; i++){
            if (forms[i]._id == formId){
                for (var j = 0 ; j < forms[i].fields.length ; j++){
                    if (forms[i].fields[j]._id == fieldId){
                        break;
                    }
                }
                forms[i].fields.splice(j,1);
                res.send(forms[i].fields);
            }
        }
    }

    function createField(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        field._id = (new Date()).getTime().toString();
        for(var i = 0; i<forms.length ; i++){
            if (forms[i]._id == formId){
                forms[i].fields.push(field);
            }
        }
        res.send(forms);
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedForm = req.body;
        for(var i = 0; i<forms.length ; i++){
            if (forms[i]._id == formId){
                for (var j = 0 ; j < forms[i].fields.length ; j++){
                    if (forms[i].fields[j]._id == fieldId){
                        forms[i].fields[j] = updatedForm;
                        break;
                    }
                }
            }
        }
        res.send(forms[i].fields);
    }

};