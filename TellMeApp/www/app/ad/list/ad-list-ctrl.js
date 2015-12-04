angular.module('tellme')
.controller('adListControll', ['$scope', '$window', '$stateParams', '$ionicHistory', 'appConfig',
       function ($scope, $window, $stateParams, $ionicHistory, appConfig) {
           $scope.baseUrl = appConfig.server.getUrl();
           $scope.adInfo = angular.fromJson($stateParams.adInfo);
           
           /*返回前一个界面*/
        //$scope.$window = $window;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        };
}]);