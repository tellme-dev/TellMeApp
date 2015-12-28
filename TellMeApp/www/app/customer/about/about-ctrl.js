angular.module('tellme')
    .controller('aboutControll', ['$scope', '$ionicHistory', 'customerSer',
        function ($scope, $ionicHistory, customerSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
        }]);