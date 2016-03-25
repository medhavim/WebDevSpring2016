(function(){
    angular
        .module("PrismaticMusicApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"//,
                //resolve: {
                //    getLoggedIn: getLoggedIn
                //}
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
                controllerAs: "model"//,
                //resolve: {
                //    checkLoggedIn: checkLoggedIn
                //}
            })
            .when("/profile/:userid", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"//,
                //resolve: {
                //    checkLoggedIn: checkLoggedIn
                //}
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
                controller: "AdminController"//,
                //controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    /*function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }*/
})();