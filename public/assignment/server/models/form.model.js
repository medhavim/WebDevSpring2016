var mock = require("./form.mock.json");

module.exports = function() {
    var api={

        // form
        createForm:createForm,
        findAllForms:findAllForms,
        findFormByID:findFormByID,
        findFormByTitle:findFormByTitle,
        findFormByUserId:findFormByUserId,
        deleteFormByID:deleteFormByID,
        updateFormByID:updateFormByID,

        // forms
        getFormFieldsByFormID:getFormFieldsByFormID,
        getFieldFromFieldIdAndFormId:getFieldFromFieldIdAndFormId,
        updateFieldFromFieldIdAndFieldObject:updateFieldFromFieldIdAndFieldObject,
        deleteFieldFromFieldIdAndFormId:deleteFieldFromFieldIdAndFormId,
        createField:createField
    };
    return api;

    function createForm(form) {
        mock.push(form);
        return mock;
    }

    function findAllForms() {
        return mock;
    }

    function findFormByID(formId) {
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

    function deleteFormByID(formId) {
        for(var f in mock) {
            if (mock[f]._id === formId) {
                mock.splice(f,1);
            }
        }
    }

    function updateFormByID(formId, form) {
        for(var f in mock) {
            if (mock[f]._id === formId) {
                mock[f]=form;
            }
        }
        return null;
    }
}