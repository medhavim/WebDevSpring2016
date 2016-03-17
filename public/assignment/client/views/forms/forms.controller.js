(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        var selectedForm = null;
        var user = $rootScope.user;

        // This function searches all the forms related to a user ID
        FormService.findAllFormsForUser(user._id, function (response) {
            $scope.forms = response;
        });

        // This function adds a new form for a user ID
        function addForm() {
            var newForm = {"title": $scope.formName};
            FormService.createFormForUser(user._id, newForm, function (response) {
                $scope.forms.push(response);
                $scope.formName = "";
            });
        }

        // This function deletes a form based on the form ID
        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id, function (response) {
                $scope.forms.splice(index,1);
            });
        }

        // This function selects an existing form
        function selectForm(index) {
            $scope.formName = $scope.forms[index].title;
            selectedForm = $scope.forms[index];
        }

        // This function updates the details of an existing form
        function updateForm() {
            if(selectedForm) {
                selectedForm.title = $scope.formName;
                FormService.updateFormById(selectedForm._id, selectedForm, function (response) {
                    $scope.formName = "";
                });
            }
        }
    }
})();