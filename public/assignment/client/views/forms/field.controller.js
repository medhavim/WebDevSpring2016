(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService, FormService) {
        var vm = this;

        vm.eField = null;
        vm.removeField = removeField;
        vm.reorder = reorder;
        vm.addField = addField;
        vm.edit = edit;
        vm.update = updateField;

        var formId = $routeParams.formId;

        vm.sortableFields = {
            axis : 'y'
        };

        function init() {
            FormService.findFormById(formId)
                .then(function (response) {
                    vm.form = response.data;
                });
            toRender();
        } init();

        function toRender(){
            //console.log($routeParams);
            FieldService.getFieldsForForm(formId)
                .then(function (response){
                    vm.fields = response.data;
                    console.log(vm.fields);
                });

        }

        function reorder() {
            console.log(vm);
            console.log(vm.form);
            vm.form.fields = vm.fields;
            FormService.updateFormById(formId, vm.form)
                .then(init);

        }

        function removeField(index) {
            //console.log(fieldId);
            var fieldId = vm.fields[index]._id;
            console.log("Inside removeField " + fieldId);
            console.log(formId);
            FieldService.deleteFieldFromForm(formId, fieldId)
                .then(function(response){
                    vm.fields.splice(index,1);
                })
        }

        function addField(type) {
            var newField = {
               // _id: null,
                label: "",
                type: type,
                placeholder: ""
            };
            if (type === "TEXT"){
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            }
            else if(type === "TEXTAREA"){
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            }
            else if(type === "DATE"){
                newField.label = "New Date Field";
            }
            else if(type === "OPTIONS"){
                newField.label = "New Dropdown";
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            }
            else if(type === "CHECKBOXES"){
                newField.label = "New Checkboxes";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            }
            else if(type === "RADIOS"){
                newField.label = "New Radio Buttons";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }
            console.log(newField);
            FieldService.createFieldForForm(formId, newField)
                .then(function (response){
                    //vm.forms = response.data;
                    //console.log(vm.forms);
                    //toRender();
                    var fields = response.data["fields"];
                    vm.fields.push(fields[fields.length - 1]);
                });
        }

        function edit(field) {

            vm.eField = field;

            var isOption = !(vm.eField.type === 'TEXT' || vm.eField.type === 'TEXTAREA');

            if (isOption) {
                var optionList = [];
                var ol = vm.eField.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                vm.optionText = optionList.join("\n");
            }
        }

        function updateField(field) {
            vm.eField = field;

            var isOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

            var optionArray = [];
            if (isOption) {
                var oa = vm.optionText;
                for (var o in oa) {
                    var a = oa[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                vm.eField.options = optionArray;

            }
            FieldService
                .updateField(formId, vm.eField._id, vm.eField)
                .then(init);
            vm.eField = null;
        }
    }
}) ();