angular.module('tellme')
    .controller('tvControll', ['$scope', '$ionicHistory', function ($scope, $ionicHistory) {
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    }])