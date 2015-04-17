var app = angular.module("FinalApp", ["ngRoute"]);

app.factory('FinalService', function FinalService($http) {
    var followers = [];
    var following = [];
    var favoriteTeams = [];

    var follow = function (followerid, followingid, callback) {
        $http.put('/api/follow/' + followerid + '/' + followingid)
        .success(callback);
    }

    var getFavoriteTeams = function (userid, callback) {
        $http.get('/api/favoriteTeams/' + userid)
        .success(callback);
    }

    return {
        follow: follow,
        getFavoriteTeams: getFavoriteTeams
    };
});

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'pages/home/home.html',
            controller: 'HomeController'
        }).
        when('/search', {
            templateUrl: 'pages/search/search.html',
            controller: 'SearchController'
        }).
        when('/profile', {
            templateUrl: 'pages/profile/profile.html',
            resolve: {
                logincheck: checkLogin
            },
            controller: 'ProfileController'
        }).
        when('/profile/:userid', {
            templateUrl: 'pages/profile/other/profile.html',
            controller: 'OtherProfileController'
        }).
        when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'RegisterController'
        }).
        when('/details/:teamid', {
            templateUrl: 'pages/details/details.html',
            controller: 'DetailsController'
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