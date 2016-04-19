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
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/search/artist/:title", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/search/album/:title", {
                templateUrl: "views/search/album.search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/search/track/:title", {
                templateUrl: "views/search/track.search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/artist/details/:mb_id", {
                templateUrl: "views/artist/artist.details.view.html",
                controller: "ArtistController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/track/details/:mb_id", {
                templateUrl: "views/track/track.details.view.html",
                controller: "TrackController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/track/details/:title/:artist", {
                templateUrl: "views/track/track.details.view.html",
                controller: "TrackController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/album/details/:mb_id", {
                templateUrl: "views/album/album.details.view.html",
                controller: "AlbumController",
                controllerAs: "model",
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
            .when('/profile/:userId', {
                templateUrl: "views/users/profile.readonly.view.html",
                controller: "ProfileReadOnlyController",
                controllerAs : "model"

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
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/player/:trackName/:artistName", {
                templateUrl: "views/player/player.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/tag/:tagValue", {
                templateUrl: "views/tag/tag.view.html",
                controller: "TagController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/tag/album/:tagValue", {
                templateUrl: "views/tag/tag.album.view.html",
                controller: "TagController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/tag/track/:tagValue", {
                templateUrl: "views/tag/tag.track.view.html",
                controller: "TagController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin')
            .success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    //console.log("in checkCurrentUser");
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

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            //console.log(user);
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                //$rootScope.currentUser = user[0];
                //console.log("in checkLoggedin");
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

        $http.get('/api/project/loggedin').success(function(user)
        {
            //console.log(user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                //console.log("in checkAdmin");
                //console.log($rootScope.currentUser);
                deferred.resolve();
            }
        });

        return deferred.promise;
    };
})();