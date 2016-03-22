(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var vm = this;

        vm.removeField = removeField;
        vm.addField = addField;
        vm.edit = edit;

        vm.sortableFields = {
            axis : 'y'
        };

        function init() {
            toRender();
        } init();

        function toRender(){
            FieldService.getFieldsForForm($routeParams.formId)
                .then(function (response){
                    vm.fields = response.data;
                    console.log(vm.fields);
                });

        }

        function removeField(fieldId) {
            console.log(fieldId);
            FieldService.deleteFieldFromForm($routeParams.formId, fieldId)
                .then(function(response){
                    vm.fields = response.data;
                })
        }

        function addField(type) {
            var newField = {
                _id: null,
                label: "",
                type: type,
                placeholder: ""
            };
            if (type == "TEXT"){
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            }
            else if(type == "TEXTAREA"){
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            }
            else if(type == "DATE"){
                newField.label = "New Date Field";
            }
            else if(type == "DROPDOWN"){
                newField.label = "New Dropdown";
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            }
            else if(type == "CHECKBOXES"){
                newField.label = "New Checkboxes";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            }
            else if(type == "RADIOS"){
                newField.label = "New Radio Buttons";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }
            console.log(newField);
            FieldService.createFieldForForm($routeParams.formId, newField)
                .then(function (response){
                    vm.forms = response.data;
                    toRender();
                });
        }

        function edit(field) {
            vm.selectedField = field;
            if (field.options){
                vm.option = '';
                for(var i = 0; i< field.options.length ; i++){
                    vm.option += field.options[i].label + ":" + field.options[i].value + "\n";
                }
            }
        }
    }
}) ();