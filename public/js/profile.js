var app = angular.module("OnlineUniversity", []);

var dialog;

app.controller("OnlineUniversityController", function ($scope, $http) {
    $http.get('/api/course')
    .success(function (response) {
        $scope.courses = response;
    });

    $scope.remove = function (index) {
        $http.delete('/api/course/' + index)
        .success(function (response) {
            $scope.courses = response;
        });
    };

    dialog = $("#dialog");

    emptyDialog = dialog.clone();

    $scope.selectedIndex = null;

    $scope.update = function (index) {
        $scope.newCourse = $scope.courses[index];
        dialog.modal('show');
        $scope.selectedIndex = index;
    }

    $scope.newCourseClick = function () {
        //$scope.newCourse = [];
        dialog.modal('show');
        $scope.selectedIndex = -1;
    }


    $scope.add = function (newCourse) {
        console.log(newCourse);
        console.log($scope.selectedIndex);

        if ($scope.selectedIndex == -1) {
            $http.post('/api/course', newCourse)
            .success(function (response) {
                $scope.courses = response;
            });
        }
        else {
            $http.put('/api/course/' + $scope.selectedIndex, newCourse)
            .success(function (response) {
                $scope.courses = response;
            });
        }

        dialog.modal('hide');
    }

    $scope.close = function () {
        dialog.modal('hide');
    }
});