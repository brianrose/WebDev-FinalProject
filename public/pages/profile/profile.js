app.controller('ProfileController', function ($scope, $rootScope, $http) {
    $scope.user = $rootScope.currentUser;
    
    $scope.favoriteTeams = [];
    console.log("Get favorite teams");
    console.log($scope.user._id);
    $http.get('/api/favoriteTeams/' + $scope.user._id)
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

    $scope.removeFromFavoriteTeams = function (team) {
        $http.delete('/api/favoriteTeams/' +
            $scope.user._id + '/' +
            team._id)
        .success(function (response) {
            console.log(response);
            $scope.favoriteTeams = [];
            $http.get('/api/favoriteTeams/' + $scope.user._id)
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
        });
    }

    $http.get('/api/following/' + $scope.user._id)
    .success(function (response) {
        $scope.following = response;
    });

    $http.get('/api/followers/' + $scope.user._id)
    .success(function (response) {
        $scope.followers = response;
    });
});