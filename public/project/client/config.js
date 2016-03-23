(function(){
    angular
        .module("PrismaticMusicApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/artist", {
                templateUrl: "views/artist/search/search.view.html",
                controller: "ArtistController"
            })
            .when("/artist/:title", {
                templateUrl: "views/artist/search/search.view.html",
                controller: "ArtistController"
            })
            .when("/details/:mb_id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
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
                controllerAs: "model"
            })
            .when("/profile/:userid", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
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
})();