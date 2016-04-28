var BASE_URL = "http://ws.audioscrobbler.com/2.0/?api_key=660fbf2c8a0c4658c2dd385ac4273bc2&format=json";





angular.module('lastfmService', ['ngResource'])
    .factory('artistSearch', function($resource){
        return $resource(BASE_URL + '&method=artist.search&artist=:artist', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:false}
        });
    });

angular.module('lastfm', ['lastfmService']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'html/list.html',   controller: SearchListCtrl}).
      when('/artist/:mbid', {templateUrl: 'html/detail.html', controller: DetailCtrl}).
      otherwise({redirectTo: '/'});
}]);

function imageTfr (images){
	console.log("images");
	console.log(images);
	for (var i in images){
		images[images[i]['size']] = images[i]['#text'];
	}
	console.log("imageTfr");
	console.log(images);
}

function SearchListCtrl($scope, artistSearch) {
	$scope.$watch('searchField', function (newVal) {
		if (newVal){
			var res = artistSearch.query({artist: newVal}, function () {
				var artists = res.results.artistmatches.artist;
				//console.log("aa");
				//console.log($scope);
				//console.log("res");
				//console.log(res);
				for (var a in artists) imageTfr(artists[a].image);
				console.log("after for");
				console.log(res.results.artistmatches.artist);
				$scope.artists = res.results.artistmatches.artist;
				console.log("Medhavi");
				console.log($scope.artists);
			});
		} else {
			$scope.artists = []
		}
	})
}

function DetailCtrl ($scope, $routeParams, $http) {
	$http.get(BASE_URL + "&method=artist.getInfo&mbid=" + $routeParams.mbid).success(function(data) {
		var images = data.artist.image;
		for (var i in images){
			images[images[i]['size']] = images[i]['#text'];
		}
    	$scope.artist = data.artist;
  	});
}