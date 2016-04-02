// load q promise library
var q = require("q");

// pass db and mongoose reference to model and also the formModel to reference the form
module.exports = function(db, mongoose, formModel) {

    // load field schema
    //var FieldSchema = require('./field.schema.server.js')(mongoose);

    // create form model from schema
    var FormModel = formModel.getFormModel();
    //var FieldModel = mongoose.model("FieldModel", FieldSchema);
    //var FormModel = mongoose.model("FormModel", FormSchema);

    var api={
        createField:createField,
        findFieldsByFormId:findFieldsByFormId,
        findFieldById:findFieldById,
        deleteFieldById:deleteFieldById,
        updateFieldById:updateFieldById
    };
    return api;

    function createField(field, formId) {
        return FormModel.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function findFieldsByFormId(formId) {
        // use select() to retrieve a particular field
        return FormModel.findById(formId).select("fields");
    }

    function findFieldById(fieldId, formId) {
        return FormModel.findById(formId)
            .then(
                function(doc){
                    var form = doc;
                    return form.fields._id(fieldId);
                }
            );
    }

    function deleteFieldById(fieldId, formId) {
        /*return FormModel.update(
         {_id: formId},
         {$pull: {'fields': {_id: fieldId}}}
         );*/
        return FormModel.findById(formId)
            .then(
                function(doc) {
                    var form = doc;
                    console.log("after find form by id");
                    console.log(form.fields);
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function updateFieldById(fieldId, fieldObj, formId) {
        return FormModel.findById(formId)
            .then(
                function(form){
                    var field   = form.fields.id(fieldId);
                    field.label  = fieldObj.label;
                    field.placeholder = fieldObj.placeholder;
                    field.options = fieldObj.options;
                    return form.save();
                }
            );
    }
};