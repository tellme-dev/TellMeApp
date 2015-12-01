angular.module('tellme')
    .controller('bbsControll', ['$scope', '$ionicHistory', function ($scope, $ionicHistory) {
        $scope.goBack = function () {
            $ionicHistory.goback();
        };
    }]);