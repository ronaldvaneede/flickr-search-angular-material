(function () {
    'use strict';

    angular.module("flickrApp", ['ngMaterial', 'ngCookies'])
        .controller("ListController", ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {

            $scope.results = [];

            $scope.isSearching = false;
			
			console.log($cookies);
			
			$scope.apiKey = $cookies.flickrApiKey;

            $scope.search = function () {
                $scope.isSearching = true;
				$cookies.flickrApiKey = $scope.apiKey;

                $http({
                    method: 'GET',
                    url: 'https://api.flickr.com/services/rest',
                    params: {
                        method: 'flickr.photos.search',
                        api_key: $scope.apiKey,
                        text: $scope.searchTerm,
                        format: 'json',
                        nojsoncallback: 1
                    }
                }).success(function (data) {
                    $scope.results = data;
                    $scope.isSearching = false;
                }).error(function (error) {
                    console.error(error);
                    $scope.isSearching = false;
                });
            }
        }]);
}());