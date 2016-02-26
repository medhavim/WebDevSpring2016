(function (){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ],
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username == username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password, callback){
            var foundUser = null;
            var ind = 0;
            for(ind in model.users){
                if(model.users[ind].username == username && model.users[ind].password == password)
                {
                    foundUser = model.users[ind];
                    break;
                }
            }
            callback(foundUser);
        }

        function findAllUsers(callback){
            callback(model.users);
        }

        function createUser(user, callback){
            var newUser = {"_id":(new Date).getTime(),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username":user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles};
            model.users.push(newUser);
            callback(newUser);

        }

        function deleteUserById(userId, callback){
            var user;
            for(user in model.users){
                if(model.users[user]._id==userId)
                {
                    delete model.users[user];
                    callback(model.users);
                }
            }
        }

        function updateUser(userId, user, callback){
            var updateUser = null;
            var ind = 0;
            for(ind in model.users){
                if(model.users[ind]._id==userId)
                {
                    model.users[ind].username= user.username;
                    model.users[ind].password= user.password;
                    model.users[ind].firstName= user.firstName;
                    model.users[ind].lastName= user.lastName;
                    model.users[ind].email_id= user.email_id;
                    updateUser = user[ind];
                    break;
                }
            }
            callback(updateUser);
        }
    }
})();