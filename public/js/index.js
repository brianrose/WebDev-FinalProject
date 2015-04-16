var app = angular.module("FinalApp", ["ngRoute"]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'pages/home/home.html',
            controller: 'HomeController'
        }).
        when('/profile', {
            templateUrl: 'pages/profile/profile.html',
            resolve: {
                logincheck: checkLogin
            }
        }).
        when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'RegisterController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);

var checkLogin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
}

app.controller("NavController", function ($rootScope, $scope, $http, $location) {
    $scope.logout = function () {
        $http.post("/logout")
        .success(function () {
            $rootScope.currentUser = null;
            $location.url('/home');
        });
    }
});