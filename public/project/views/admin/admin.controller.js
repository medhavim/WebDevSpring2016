(function() {
    angular
        .module("PrismaticMusicApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, UserService)
    {
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        $scope.modifyUser = modifyUser;
        $scope.message = null;

        UserService.findAllUsers(function (response) {
            $scope.users = response;
        });

        function modifyUser(user) {
            UserService.updateUserByUsername(user.username, user, function(response) {
            });
        }

        function addUser(user) {
        // Username input is mandatory
        if (user === null) {
            $scope.message = "Please fill in the required fields";
            return;
        }
        // Username input is mandatory
        if (!user.username) {
            $scope.message = "Please provide a username";
            return;
        }
        // Both Password field is mandatory
        if (!user.password) {
            $scope.message = "Please provide a password";
            return;
        }

        // checks if the username is entered is present in the system
        var checkUser = UserService.findUserByUsername(user.username);

        // if the username entered is present, then an error message is displayed
        if (checkUser !== null) {
            $scope.message = "User already exists";
            return;
        }

        // New user is created with the valid entered data
        var newUser = {"firstName": "",
            "lastName": "",
            "username": user.username,
            "password": user.password,
            "email": "",
            "roles": user.roles};

            console.log(newUser);

        UserService.createUser(newUser, function(response) {
            $rootScope.user = response;
            $rootScope.loggedIn = false;
            //$location.path("profile/"+response.username);
        });
    }

        function selectUser(index)
        {
            $scope.selectedUserIndex = index;
            $scope.user = {
                username: $scope.users[index].username,
                password: $scope.users[index].password,
                roles: $scope.users[index].roles
            };
        }

        function removeUser(index) {
            UserService.deleteUserById($scope.users[index]._id, function (response) {
                $scope.users.splice(index,1);
            });
        }

/*        function modifyUser(user)
        {
            $scope.users[$scope.selectedUserIndex] = {
                title: user.title,
                password: user.password,
                registeredDate: user.registeredDate
            };
        }

        function selectUser(index)
        {
            $scope.selectedUserIndex = index;
            $scope.user = {
                username: $scope.users[index].username,
                password: $scope.users[index].password,
                registeredDate: $scope.users[index].registeredDate
            };
        }

        function removeUser(user)
        {
            var index = $scope.users.indexOf(user);
            $scope.users.splice(index, 1);
        }

        function addUser(user)
        {
            var newUser = {
                username : user.username,
                password : user.password,
                registeredDate : user.registeredDate
            };
            $scope.users.push(newUser);
        }*/
    }
})();