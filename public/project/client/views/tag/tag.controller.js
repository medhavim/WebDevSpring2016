(function(){
    'use strict';
    angular
        .module("PrismaticMusicApp")
        .controller("TagController", TagController);

    function TagController($routeParams, tagService, displayService) {
        var vm = this;
        vm.search = null;

        var tagValue = $routeParams.tagValue;
        vm.tagName=tagValue;

        function init() {
            //fetchTagDetails(tagValue);
            topTracks(tagValue);
            topArtists(tagValue);
            topAlbums(tagValue);
            //similarTags(tagValue)
        }
        init();

        function fetchTagDetails(tagValue) {
            //console.log("in TrackController fetchTracks()");
            tagService.fetchTagInfo(tagValue)
                .then(function(response) {
                    console.log("fetchTagDetails");
                    console.log(response);
                    vm.details = displayService.displayTrackImage(response.data.toptracks);
                    console.log(vm.details);
                });
        }

        function topTracks(tagValue) {
            vm.search = true;
            //console.log("in TrackController trackInfo()");
            tagService.findTracksByTag(tagValue)
                .then(function(response) {
                    console.log("topTracks");
                    //console.log(response);
                    vm.tracks = displayService.displayTrackImage(response.data.tracks);
                    console.log(vm.tracks);
                });
        }

        function topArtists(tagValue) {
            vm.search = true;
            //console.log("in TrackController trackInfo()");
            tagService.findArtistsByTag(tagValue)
                .then(function(response) {
                    console.log("topArtists");
                    //console.log(response);
                    vm.artists = displayService.displayArtistImage(response.data.topartists);
                    console.log(vm.artists);
                });
        }

        function topAlbums(tagValue) {
            vm.search = true;
            //console.log("in TrackController trackInfo()");
            tagService.findAlbumsByTag(tagValue)
                .then(function(response) {
                    console.log("topAlbums");
                    //console.log(response);
                    vm.albums = displayService.displayAlbumImage(response.data.albums);
                    console.log(vm.albums);
                });
        }

        function similarTags(tagValue) {
            //console.log("in TrackController trackInfo()");
            tagService.findSimilarTag(tagValue)
                .then(function(response) {
                    console.log("similarTags");
                    //console.log(response);
                    vm.similarTags = response.data.similartags.tag;
                    //vm.similarTags = displayService.displayArtistImage(response.data.toptracks);
                    console.log(vm.similarTags);
                });
        }
    }

})();