app.controller('DetailsController', function ($scope, $routeParams, $http) {
    var teamid = $routeParams.teamid;
    $http.get('/api/team/id/' + teamid)
    .success(function (response) {
        $scope.team = response;
    });

    $scope.showFans = function (team) {
        console.log("Show Fans");
        $http.get('/api/team/fans/' + team._id)
        .success(function (response) {
            console.log(response);
            $scope.fans = response;
        });
    }

    $scope.hideFans = function () {
        $scope.fans = null;
    }
});