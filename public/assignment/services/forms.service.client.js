(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($rootScope) {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234}
                ],
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            findAllFormsForUser: findAllFormsForUser,
            updateFormById: updateFormById
        };

        return model;

        // This function creates a form for a particular user ID
        function createFormForUser(userId, form, callback) {
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": userId
            };
            model.forms.push(newForm);
            callback(newForm);
        }

        // This function deletes a particular form
        function deleteFormById(formId, callback) {
            for (var i = 0; i < model.forms.length; i++) {
                if(model.forms[i]._id === formId) {
                    model.forms.splice(i,1);
                    break;
                }
            }
            callback(model.forms);
        }

        // This function finds all the forms for a particular user based on the user ID
        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var i = 0; i < model.forms.length ; i++) {
                if (model.forms[i].userId === userId) {
                    userForms.push(model.forms[i]);
                }
            }
            callback(userForms);
        }

        // This function updates the form details based on the form ID
        function updateFormById(formId, newForm, callback) {
            var updatedForm = null;
            for (var i = 0; i < model.forms.length; i++) {
                if (model.forms[i]._id === formId) {
                    model.forms[i].title = newForm.title;
                    model.forms[i].userId = newForm.userId;
                    updatedForm = model.forms[i];
                    break;
                }
            }
            callback(updatedForm);
        }
    }
})();