(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($http) {
        var model = {
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            findAllFormsForUser: findAllFormsForUser,
            updateFormById: updateFormById
        };

        return model;

        function createFormForUser(userId, form) {
            return $http.post('/api/assignment/user/' + userId + '/form', form);
        }

        function deleteFormById(formId) {
            return $http.delete('/api/assignment/form/' + formId);
        }

        function findAllFormsForUser(userId) {
            return $http.get('/api/assignment/user/' + userId + '/form');
        }

        function updateFormById(formId, newForm) {
            return $http.put('/api/assignment/form/' + formId, newForm);
        }
    }
})();