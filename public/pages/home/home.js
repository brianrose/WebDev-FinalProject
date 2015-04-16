﻿app.controller('HomeController', function ($location, $rootScope, $scope, $http) {
    $scope.search = function (searchTerm) {
        $http.get('/api/team/name/' + searchTerm)
        .success(function (response) {
            console.log(response);
            $scope.teams = response;
        });
    }

    $scope.favoriteTeams = [];
    console.log("Get favorite teams");
    console.log($rootScope.currentUser._id);
    $http.get('/api/favoriteTeams/' + $rootScope.currentUser._id)
    .success(function (response) {
        console.log("Favorite teams");
        console.log(response);
        for (var i = 0; i < response.length; i++) {
            $http.get('/api/team/id/' + response[i])
            .success(function (response) {
                $scope.favoriteTeams.push(response);
            });
        }
    });

    $scope.addToFavoriteTeams = function (team) {
        console.log("Add to favorite teams");
        console.log($rootScope.currentUser);
        console.log(team);
        if (!$rootScope.currentUser) {
            $location.url('/login');
        }
        else
        {
            $http.put('/api/addToFavoriteTeams/' +
                $rootScope.currentUser._id + '/' +
                team._id)
            .success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;
                console.log($rootScope.currentUser);
            });
        }
    }
});