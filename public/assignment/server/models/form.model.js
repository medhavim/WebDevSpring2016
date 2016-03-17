var mock = require("./form.mock.json");

module.exports = function() {
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

    function createForm(form) {
        mock.push(form);
        return mock;
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
        for (var f in mock) {
            if(mock[f].userId === userId) {
                return mock[f];
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var f in mock) {
            if (mock[f]._id === formId) {
                mock.splice(f,1);
            }
        }
    }

    function updateFormById(formId, form) {
        for(var f in mock) {
            if (mock[f]._id === formId) {
                mock[f]=form;
            }
        }
        return null;
    }

    function createField(field, formId) {
        for (var f in mock) {
            if (mock[f]._id === formId) {
                field._id = (new Date()).getTime();
                mock[f].fields.push(field);
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

    function findFieldByFieldAndFormId(fieldId, formId) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                for (var ff in mock[f].fields) {
                    if(ff._id === fieldId) {
                        return ff;
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldByFieldAndFormId(fieldId, formId) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                for (var ff in mock[f].fields) {
                    if(ff._id === fieldId) {
                        delete ff;
                    }
                }
            }
        }
    }

    function updateFieldByFieldAndFormId(fieldId, formId, field) {
        for (var f in mock) {
            if(mock[f]._id === formId) {
                for (var ff in mock[f].fields) {
                    if(ff._id === fieldId) {
                        ff = field;
                    }
                }
            }
        }
    }
}