app.controller('HomeController', function ($scope, $http) {
    $scope.search = function (searchTerm) {
        $http.get('/api/team/' + searchTerm)
        .success(function (response) {
            console.log(response);
            $scope.teams = response;
        });
    }
});