(function(){
    angular
        .module("PrismaticMusicApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.html",
                controller: "SearchController"
            })
            .when("/details/:mb_id", {
                templateUrl: "views/details/details.html",
                controller: "DetailsController as model"
            })
            .when("/tracks/:mb_id", {
                templateUrl: "views/tracks/tracks.html",
                controller: "TracksController as model"
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
                templateUrl: "views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();