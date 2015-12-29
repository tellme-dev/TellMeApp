angular.module('tellme')
    .controller('trafficControll', ['$scope', '$ionicHistory', function ($scope, $ionicHistory) {
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    }])