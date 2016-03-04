(function(){

    angular
        .module("PrismaticMusicApp")
        .controller("TracksController", TracksController);

    function TracksController($scope, $http, $routeParams, artistSearch) {
        var vm = this;

        var mbId = $routeParams.mb_id;
        //console.log(mbId);

        function init() {
            fetchTracks(mbId);
        }
        init();

        function fetchTracks(mbId) {
            artistSearch.findTracksByMbId(mbId, renderDetails);
        }

        function renderDetails(response) {
            console.log("tracks ");
            console.log(response);
            vm.details = response;
        }
    }

})();