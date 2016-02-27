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

        FormService.findAllFormsForUser(user._id, function (response) {
            $scope.forms = response;
        });


        function addForm() {
            var newForm = {"title": $scope.formName};
            FormService.createFormForUser(user._id, newForm, function (response) {
                $scope.forms.push(response);
                $scope.formName = "";
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id, function (response) {
                $scope.forms.splice(index,1);
            });
        }

        function selectForm(index) {
            $scope.formName = $scope.forms[index].title;
            selectedForm = $scope.forms[index];
        }

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