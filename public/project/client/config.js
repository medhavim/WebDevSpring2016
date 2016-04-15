(function(){
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"/*,
                resolve: {
                    loggedin: checkCurrentUser
                }*/
            })
            .when("/artist", {
                templateUrl: "views/artist/search/search.view.html",
                controller: "ArtistController",
                controllerAs: "model"
            })
            .when("/artist/:title", {
                templateUrl: "views/artist/search/search.view.html",
                controller: "ArtistController",
                controllerAs: "model"
            })
            .when("/artist/details/:mb_id", {
                templateUrl: "views/artist/details/details.view.html",
                controller: "ArtistDetailsController",
                controllerAs: "model"
            })
            .when("/track", {
                templateUrl: "views/track/search/search.view.html",
                controller: "TrackController",
                controllerAs: "model"
            })
            .when("/track/:mb_id", {
                templateUrl: "views/track/track.view.html",
                controller: "TrackController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"/*,
                resolve: {
                    loggedin: checkLoggedin
                }*/
            })
            .when("/profile/:userid", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"/*,
                resolve: {
                    loggedin: checkLoggedin
                }*/
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
                controller: "AdminController",
                controllerAs: "model"/*,
                resolve: {
                    loggedin: checkAdmin
                }*/
            })
            .when("/player/:trackName/:artistName", {
                templateUrl: "views/player/player.view.html"/*,
                controller: "PlayController",
                controllerAs: "model"*/
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    /*var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user[0];
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log(user);
            if (user !== '0')
            {
                //$rootScope.currentUser = user[0];
                $rootScope.currentUser = user;
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

        $http.get('/api/project/loggedin').success(function(user)
        {
            console.log(user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user[0];
                deferred.resolve();
            }
        });

        return deferred.promise;
    };*/
})();