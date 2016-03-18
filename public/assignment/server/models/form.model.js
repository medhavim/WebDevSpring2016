var mock = require("./form.mock.json");

module.exports = function(app) {
    var api={

        // forms
        createForm:createForm,
        findAllForms:findAllForms,
        findFormById:findFormById,
        findFormByTitle:findFormByTitle,
        findFormByUserId:findFormByUserId,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,

        // fields
        createField:createField,
        findFieldsByFormId:findFieldsByFormId,
        findFieldByFieldAndFormId:findFieldByFieldAndFormId,
        deleteFieldByFieldAndFormId:deleteFieldByFieldAndFormId,
        updateFieldByFieldAndFormId:updateFieldByFieldAndFormId
    };
    return api;

    function createForm(form, userId) {
        var form = {
            _id: (new Date()).getTime().toString(),
            title: form.title,
            userId: userId
        };
        mock.push(form);
        return form;
    }

    function findAllForms() {
        return mock;
    }

    function findFormById(formId) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var f in mock) {
            if(mock[f].title === title) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        var forms = [];
        for (var f in mock) {
            if(mock[f].userId === userId) {
                forms.push(mock[f]);
                return forms;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var f in mock) {
            if (mock[f]._id === formId) {
                mock.splice(f,1);
                return mock[f];
            }
        }
    }

    function updateFormById(formId, form) {
        for(var f in mock) {
            if (mock[f]._id === formId) {
                var updatedForm = mock[f];
                updatedForm.title = form.title;
                return updatedForm;
            }
        }
        return null;
    }

    function createField(formId, field) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                field._id = (new Date()).getTime();
                mock[f].fields.push(field);
                return mock[f].fields;
            }
        }
    }

    function findFieldsByFormId(formId) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                return mock[f].fields;
            }
        }
        return null;
    }

    function findFieldByFieldAndFormId(formId, fieldId) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                for (var ff in mock[f].fields) {
                    if(ff._id === fieldId) {
                        return mock[f].fields;
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldByFieldAndFormId(formId, fieldId) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                for (var ff in mock[f].fields) {
                    if(ff._id === fieldId) {
                        delete ff;
                        return mock[f].fields;
                    }
                }
            }
        }
        return null;
    }

    function updateFieldByFieldAndFormId(formId, fieldId, field) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                for (var ff in mock[f].fields) {
                    if(ff._id === fieldId) {
                        ff = field;
                        return mock[f].fields;
                    }
                }
            }
        }
        return null;
    }
};