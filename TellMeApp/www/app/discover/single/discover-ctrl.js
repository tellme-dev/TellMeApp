angular.module('tellme')
    .controller('discoverControll', ['$scope', '$ionicHistory', '$stateParams', 'discoverSer', 'commonSer', 'appConfig', 'LoadingSvr',
        function ($scope, $ionicHistory, $stateParams, discoverSer, commonSer, appConfig, LoadingSvr) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.goBack = function () {
            $ionicHistory.goBack();
        };
       
    }]);