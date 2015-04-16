app.controller('ProfileController', function ($scope, $rootScope, $http) {
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

    $scope.removeFromFavoriteTeams = function (team) {
        //TODO: http.delete
    }
});