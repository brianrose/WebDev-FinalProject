app.controller('ProfileController', function ($scope, $rootScope, $http) {
    $scope.favoriteTeams = [];
    for (var i = 0; i < $rootScope.currentUser.favoriteTeams.length; i++) {
        $http.get('/api/team/id/' + $rootScope.currentUser.favoriteTeams[i])
        .success(function (response) {
            $scope.favoriteTeams.push(response);
        });
    }
});