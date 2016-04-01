(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService) {
        var user = $rootScope.currentUser;
        var vm = this;
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.selectedForm = null;

        function init() {
            // This function searches all the forms related to a user ID
            FormService.findAllFormsForUser(user._id)
                .then(function (response) {
                    vm.forms = response.data;
                });
        } init();

        // This function adds a new form for a user ID
        function addForm(form) {
            var newForm = {"title": form.formName};
            FormService.createFormForUser(user._id, newForm)
                .then(function (response) {
                    vm.forms.push(response.data);
                    vm.formName = "";
                }, function(error) {
                    console.log(error);
            });
        }

        // This function deletes a form based on the form ID
        function deleteForm(index) {
            var formId = vm.forms[index]._id;
            FormService.deleteFormById(formId)
                .then(function (response) {
                    vm.forms.splice(index,1);
            });
        }

        // This function selects an existing form
        function selectForm(index) {
            vm.formName = vm.forms[index].title;
            vm.selectedForm = vm.forms[index];
        }

        // This function updates the details of an existing form
        function updateForm(form, index) {
            var newForm = {"title": form.formName};
            if(vm.selectedForm) {
                FormService.updateFormById(vm.selectedForm._id, newForm)
                    .then(function (response) {
                        vm.selectedForm.title = vm.formName;
                        vm.forms[index] = response.data;
                        vm.formName = "";
                });
            } else {
                console.log("else of if(vm.selectedForm)");
            }
        }
    }
})();