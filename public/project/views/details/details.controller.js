(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $http, $routeParams, artistService) {
        var vm = this;

        var mbId = $routeParams.mb_id;

        function init() {
            fetchArtist(mbId);
        }
        init();

        function fetchArtist(mbId) {
            artistService.findArtistByMbId(mbId, renderDetails);
        }

        function renderDetails(response) {
            vm.details = response;
        }
    }

})();