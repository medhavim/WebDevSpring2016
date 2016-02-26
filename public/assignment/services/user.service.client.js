(function (){
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var userArr = [
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

        var service= {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password, callback)
        {
            var usr;
            for(usr in userArr){
                if(userArr[usr].username==username && userArr[usr].password==password)
                {
                    callback(userArr[usr]);
                }
            }
            callback(null);
        }

        function findAllUsers(callback)
        {
            callback(userArr);
        }

        function createUser(user, callback)
        {
            user["_id"]= (new Date).getTime();
            userArr.push(user);
            callback(user);
            console.log(userArr);

        }

        function deleteUserById(userId, callback)
        {
            var user;
            for(user in userArr){
                if(userArr[user]._id==userId)
                {
                    delete userArr[user];
                    callback(userArr);
                }
            }
        }

        function updateUser(userId, user, callback)
        {
            var usr;
            for(usr in userArr){
                if(userArr[usr]._id==userId)
                {
                    userArr[usr].username= user.username;
                    userArr[usr].password= user.password;
                    userArr[usr].firstName= user.firstName;
                    userArr[usr].lastName= user.lastName;
                    userArr[usr].email_id= user.email_id;
                    callback(userArr[usr]);
                }
            }
        }
    }
})();