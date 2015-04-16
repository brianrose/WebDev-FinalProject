app.controller('ProfileController', function ($scope, $rootScope, $http) {
    $scope.favoriteTeams = [];
    for (var i = 0; i < $rootScope.currentUser.favoriteTeams.length; i++) {
        $http.get('/api/team/id/' + $rootScope.currentUser.favoriteTeams[i])
        .success(function (response) {
            console.log("get a team");
            console.log(response);
            $scope.favoriteTeams.push(response);
        });
    }

    $scope.removeFromFavoriteTeams = function (team) {
        //TODO: http.delete
    }
});