(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/profile/:username", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller : "AdminController",
                controllerAs : "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller : "FieldController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    console.log("in checkCurrentUser");
                    //console.log(user);
                    $rootScope.currentUser = user;
                    //console.log($rootScope.currentUser);
                }
                deferred.resolve();
            });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            //console.log(user);
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                //$rootScope.currentUser = user[0];
                console.log("in checkLoggedin");
                //console.log($rootScope.currentUser);
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            //console.log(user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                console.log("in checkAdmin");
                //console.log($rootScope.currentUser);
                deferred.resolve();
            }
        });

        return deferred.promise;
    };
})();