app.controller('DetailsController', function ($scope, $routeParams, $http) {
    var teamid = $routeParams.teamid;
    $http.get('/api/team/id/' + teamid)
    .success(function (response) {
        $scope.team = response;
    });
});