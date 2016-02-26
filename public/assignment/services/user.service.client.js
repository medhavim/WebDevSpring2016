(function (){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var users = [
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
        ];

        var api= {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback){
            var foundUser = null;
            var ind = 0;
            for(ind in users){
                if(users[ind].username == username && users[ind].password == password)
                {
                    foundUser = users[ind];
                    break;
                }
            }
            callback(foundUser);
        }

        function findAllUsers(callback){
            callback(users);
        }

        function createUser(user, callback){
            var newUser = {"_id":(new Date).getTime(),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username":user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles};
            users.push(newUser);
            callback(newUser);

        }

        function deleteUserById(userId, callback){
            var user;
            for(user in users){
                if(users[user]._id==userId)
                {
                    delete users[user];
                    callback(users);
                }
            }
        }

        function updateUser(userId, user, callback){
            var updateUser = null;
            var ind = 0;
            for(ind in users){
                if(users[ind]._id==userId)
                {
                    users[ind].username= user.username;
                    users[ind].password= user.password;
                    users[ind].firstName= user.firstName;
                    users[ind].lastName= user.lastName;
                    users[ind].email_id= user.email_id;
                    updateUser = user[ind];
                    break;
                }
            }
            callback(updateUser);
        }
    }
})();