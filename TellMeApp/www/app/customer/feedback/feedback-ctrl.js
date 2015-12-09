angular.module('tellme')
    .controller('feedbackControll', ['$scope', '$ionicHistory', 'customerSer',
        function ($scope, $ionicHistory, customerSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
        }]);