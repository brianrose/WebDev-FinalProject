app.controller('HomeController', function ($location, $rootScope, $scope, $http) {
    $scope.search = function (searchTerm) {
        $http.get('/api/team/name/' + searchTerm)
        .success(function (response) {
            console.log(response);
            $scope.teams = response;
        });
    }

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
            });
        }
    }
});