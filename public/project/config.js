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
            .otherwise({
                redirectTo: "/home"
            });
    }
})();