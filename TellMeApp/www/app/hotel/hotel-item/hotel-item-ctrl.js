angular.module('tellme')
    .controller('hotelItemControll', ['$scope', '$ionicHistory', '$stateParams', '$ionicHistory', 'hotelSer', 'commonSer', 'appConfig', 'LoadingSvr',
        function ($scope, $ionicHistory, $stateParams, $ionicHistory, hotelSer, commonSer, appConfig, LoadingSvr) {
            var itemId = $stateParams.itemId;
            $scope.baseUrl = appConfig.server.getUrl();
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };

        }]);