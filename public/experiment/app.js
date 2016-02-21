(function() {
    angular
        .module("MovieDBApp", []);
        .controller("MovieListController", MovieListController);

    function MovieListController($scope) {
        // console.log("Hello from MovieListController"); no $scope needed
        var movies = [
            {id:123, title:"Avatar", year:2009},
            {id:123, title:"Star Wars", year:1977}
        ];
        $scope.movies = movies;
        $scope.addMovie = function (){
            console.log("Movie added");
        }

    }
})();