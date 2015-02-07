(function () {
    'use strict';

    angular.module("flickrApp", ['ngMaterial'])
        .controller("ListController", ['$scope', '$http', function ($scope, $http) {

            $scope.results = [];

            $scope.isSearching = false;

            $scope.search = function () {

                $scope.isSearching = true;

                $http({
                    method: 'GET',
                    url: 'https://api.flickr.com/services/rest',
                    params: {
                        method: 'flickr.photos.search',
                        api_key: '',
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