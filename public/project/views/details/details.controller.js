(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams, artistSearch) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        console.log(mbId);

        function init() {
            fetchArtist(mbId);
        }
        init();

        function fetchArtist(mbId) {
            artistSearch.findArtistByMbId(mbId, renderDetails);
        }

        function renderDetails(response) {
            console.log("details ");
            console.log(response);
            vm.details = response;
        }
    }

})();