angular.module('tellme')
    .controller('systemControll', ['$scope', '$ionicHistory', '$state', 'systemSer',
        function ($scope, $ionicHistory,$state, systemSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            $scope.goFeedback = function () {
                $state.go('feedback');
            }
        }]);