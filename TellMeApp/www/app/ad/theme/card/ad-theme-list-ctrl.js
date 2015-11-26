angular.module('tellme')
    .controller('adThemeListControll', ['$scope', '$ionicHistory', '$window', function ($scope, $ionicHistory, $window) {
        //后退
        $scope.$window = $window;
        $scope.go_back = function () {
            $window.history.back();
        };
    }]);