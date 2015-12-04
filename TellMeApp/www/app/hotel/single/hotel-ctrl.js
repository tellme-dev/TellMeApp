angular.module('tellme')
    .controller('hotelControll', ['$scope', '$stateParams', '$ionicHistory', function ($scope, $stateParams, $ionicHistory) {
        $scope.hotelId = $stateParams.hotelId;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    }]);