app.controller('HomeController', function ($location, $rootScope, $scope, $http) {

    $scope.search = function (searchTerm) {
        console.log("search");
        console.log($scope.favoriteTeams);
        $http.get('/api/team/name/' + searchTerm)
        .success(function (response) {
            console.log(response);
            $scope.teams = response;
        });
    }

    if ($rootScope.currentUser)
    {
        $scope.favoriteTeams = [];
        $http.get('/api/favoriteTeams/' + $rootScope.currentUser._id)
        .success(function (response) {
            console.log("Favorite teams");
            console.log(response);
            $scope.favoriteTeams = response;
            //for (var i = 0; i < response.length; i++) {
            //    $http.get('/api/team/id/' + response[i])
            //    .success(function (response) {
            //        $scope.favoriteTeams.push(response);
            //    });
            //}
        });
    }

    $scope.addToFavoriteTeams = function (team) {
        console.log("Add to favorite teams");
        console.log($scope.favoriteTeams);
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