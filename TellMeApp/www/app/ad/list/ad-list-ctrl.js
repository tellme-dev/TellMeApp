angular.module('tellme')
.controller('adListControll', ['$scope','$state', '$window', '$stateParams', '$ionicHistory', 'appConfig','adSer',
       function ($scope, $state, $window, $stateParams, $ionicHistory, appConfig, adSer) {
           $scope.baseUrl = appConfig.server.getUrl();
           $scope.adInfo = angular.fromJson($stateParams.adInfo);
           
           /*返回前一个界面*/
        //$scope.$window = $window;
           $scope.goBack = function () {
             $ionicHistory.goBack();
           };
           /*
              1:酒店,
              2：项目标签(item_tag),
              3:社区,
              4：URL地址, 5:html页面
           */
           $scope.goToTarget = function(){
               var targetType = $scope.adInfo.targetType;
               var targetId = $scope.adInfo.targetId;
               if (targetType == 1) {
                   $state.go('hotel', { 'hotelId': targetId, 'rootTagId': 0, 'itemId': 0 });
               }
               else if (targetType == 2) {
                   $state.go('hotelItem', { itemId: 2});
               }
               else if (targetType == 3) {
                   $state.go('bbs', { 'bbsId': targetId });
               }
           }
}]);