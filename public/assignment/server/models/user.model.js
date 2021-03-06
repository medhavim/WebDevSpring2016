// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function (db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel =  mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById
    };
    return api;

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllUsers() {
        // use q to defer the response
        var deferred = q.defer();

        // find with mongoose user model's find()
        UserModel.find(function(err, doc) {
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


    // use user model find by id
    function findUserById(userId) {
        // use q to defer the response
        var deferred = q.defer();

        // find with mongoose user model's find()
        UserModel.find({_id: userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }


    function findUserByUsername(username) {
        return UserModel.findOne({username : username});
    }


    function findUserByCredentials(credentials) {
        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {username: credentials.username, password: credentials.password},
            // doc is unique instance matches predicate
            function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
        // return a promise
        return deferred.promise;
    }

    function deleteUserById(userId) {
        // use q to defer the response
        var deferred = q.defer();

        // delete user with mongoose user model's remove()
        UserModel.remove({_id : userId}, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });
        // return a promise
        return deferred.promise;
    }

    function updateUserById(userId, user) {
        // use q to defer the response
        var deferred = q.defer();

        // update existing user with mongoose user model's update()
        UserModel.update({_id : userId}, {$set : user}, function(err, doc) {
            if(err) {
                // reject promise if error
                deferred.reject(err);
            }
            else {
                // send the updated details of the user
                UserModel.findById(userId, function(err, doc) {
                    if(err)
                    // reject promise if error
                        deferred.reject(err);
                    else
                    // resolve promise
                        deferred.resolve(doc);
                });
            }
        });
        // return a promise
        return deferred.promise;
    }
};