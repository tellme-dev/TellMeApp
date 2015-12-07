angular.module('tellme')
    .controller('feedbackControll', ['$scope', '$ionicHistory', 'systemSer',
        function ($scope, $ionicHistory, systemSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
        }]);