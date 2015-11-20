angular.module('tellme')
    .controller('customerCenterControll', ['$scope', '$ionicNavBarDelegate', function ($scope, $ionicNavBarDelegate) {
        $scope.goBack = function () {
            $ionicNavBarDelegate.back();
        }
    }]);