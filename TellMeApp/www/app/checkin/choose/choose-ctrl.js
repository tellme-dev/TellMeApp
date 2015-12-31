angular.module('tellme')
    .controller('chooseControll', ['$scope', '$state', '$ionicHistory', '$stateParams', 'appConfig', function ($scope, $state, $ionicHistory,$stateParams, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.item = angular.fromJson($stateParams.item);

        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        $scope.call = function () {
            //拨打电话
            //
            var tel = $scope.item.tel;
            window.open('tel://' + tel);
        }
    }])