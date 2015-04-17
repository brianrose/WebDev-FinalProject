app.controller('OtherProfileController', function ($routeParams, $scope, $rootScope, $http) {

    var userid = $routeParams.userid;

    console.log($routeParams);
    console.log(userid);

    $http.get('/api/user/' + userid + '/' + 'username')
    .success(function (response) {
        console.log(response);
        $scope.username = response;
    });

    $scope.favoriteTeams = [];
    console.log("Get favorite teams");
    console.log(userid);
    $http.get('/api/favoriteTeams/' + userid)
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
            userid + '/' +
            team._id)
        .success(function (response) {
            console.log(response);
            $scope.favoriteTeams = [];
            $http.get('/api/favoriteTeams/' + userid)
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

    $scope.unFollow = function (user) {
        $http.delete('/api/follow/' +
            userid + '/' +
            user._id)
        .success(function (response) {
            $http.get('/api/following/' + userid)
            .success(function (response) {
                console.log("following");
                console.log(response);
                $scope.following = response;
            });
        });
    }

    $http.get('/api/following/' + userid)
    .success(function (response) {
        $scope.following = response;
    });

    $http.get('/api/followers/' + userid)
    .success(function (response) {
        $scope.followers = response;
    });
});