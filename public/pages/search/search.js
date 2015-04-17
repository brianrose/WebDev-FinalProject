app.controller('SearchController', function ($scope, $http, $rootScope, $location) {
    $scope.search = function (searchTerm) {
        $http.get('/api/team/name/' + searchTerm)
        .success(function (response) {
            console.log(response);
            $scope.teams = response;
        });
    }

    if ($rootScope.currentUser) {
        $scope.favoriteTeams = [];
        $http.get('/api/favoriteTeams/' + $rootScope.currentUser._id)
        .success(function (response) {
            console.log("Favorite teams");
            console.log(response);
            $scope.favoriteTeams = response;
        });
    }

    $scope.addToFavoriteTeams = function (team) {
        console.log("Add to favorite teams");
        console.log($rootScope.currentUser);
        console.log(team);
        if (!$rootScope.currentUser) {
            $location.url('/login');
        }
        else {
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