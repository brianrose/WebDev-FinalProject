﻿app.controller('DetailsController', function ($location, $rootScope, $scope, $routeParams, $http) {
    var teamid = $routeParams.teamid;
    $http.get('/api/team/id/' + teamid)
    .success(function (response) {
        $scope.team = response;
    });

    $scope.following = [];

    $http.get('/api/user/' + $rootScope.currentUser._id + '/following')
    .success(function (response) {
        console.log(response);
        $scope.following = response;
    });

    console.log($scope.following);

    $scope.showFans = function (team) {
        console.log("Show Fans");
        $http.get('/api/team/fans/' + team._id)
        .success(function (response) {
            console.log(response);
            console.log($scope.following);
            $scope.fans = response;
        });
    }

    $scope.hideFans = function () {
        $scope.fans = null;
    }

    $scope.follow = function (user) {
        if ($rootScope.currentUser)
        {
            $http.post('/api/follow/' +
                $rootScope.currentUser._id + '/' +
                user._id)
            .success(function (response) {
                $rootScope.currentUser = response;
            });
        }
        else
        {
            $location.url('/login');
        }
    }
});