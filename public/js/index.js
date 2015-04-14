var app = angular.module("FinalApp", ["ngRoute"]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'pages/home.html'
        }).
        when('/profile', {
            templateUrl: 'pages/profile.html'
        }).
        when('/login', {
            templateUrl: 'pages/login.html'
        }).
        when('/register', {
            templateUrl: 'pages/register.html'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);