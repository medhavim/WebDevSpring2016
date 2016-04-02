// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create form model from schema
    var FormModel = mongoose.model("Form", FormSchema);

    var api={
        createForm:createForm,
        findAllForms:findAllForms,
        findFormById:findFormById,
        findFormByTitle:findFormByTitle,
        findFormByUserId:findFormByUserId,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        getFormModel:getFormModel
    };
    return api;

    function getFormModel() {
        return FormModel;
    }

    function createForm(form, userId) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new form with mongoose form model's create()
        FormModel.create({userId : userId, title : form.title}, function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findAllForms() {
        // use q to defer the response
        var deferred = q.defer();

        // find all forms with mongoose form model's find()
        FormModel.find(function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findFormById(formId) {
        // use q to defer the response
        var deferred = q.defer();

        // find forms by ID with mongoose form model's find()
        FormModel.findById(formId, function(err,doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findFormByTitle(title) {
        // use q to defer the response
        var deferred = q.defer();

        // find forms by title with mongoose form model's find()
        FormModel.find({title : title},function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function findFormByUserId(userId) {
        // use q to defer the response
        var deferred = q.defer();

        // find forms by user ID with mongoose form model's find()
        FormModel.find({userId : userId},function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function deleteFormById(formId) {
        // use q to defer the response
        var deferred = q.defer();

        // delete form with mongoose form model's remove()
        FormModel.remove({_id : formId},function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        // use q to defer the response
        var deferred = q.defer();

        // update form with mongoose form model's update()
        FormModel.update({_id : formId}, {$set : form}, function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }
};