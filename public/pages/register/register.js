app.controller("RegisterController", function ($location, $rootScope, $scope, $http) {
    $scope.register = function (user) {
        if (user.password == user.password2)
        {
            $http.post('/register', user)
            .success(function (user) {
                $rootScope.currentUser = user;
                console.log(user);
                $location.url('/profile/' + user._id);
            });
        }
    }
});