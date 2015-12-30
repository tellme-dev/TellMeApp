angular.module('tellme')
    .controller('eSupermarketControll', ['$scope', '$stateParams', '$ionicHistory', 'appConfig', function ($scope, $stateParams, $ionicHistory, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.item = angular.fromJson($stateParams.item);
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    }])