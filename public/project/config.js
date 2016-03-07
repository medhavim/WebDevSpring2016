(function(){
    angular
        .module("PrismaticMusicApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.html"
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
                controller: "DetailsController as model"
            })
            .when("/track", {
                templateUrl: "views/track/track.view.html",
                controller: "TrackController as model"
            })
            .when("/track/:mb_id", {
                templateUrl: "views/track/track.view.html",
                controller: "TrackController as model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/profile/:userid", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();