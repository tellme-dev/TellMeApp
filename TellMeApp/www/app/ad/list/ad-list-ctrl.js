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
           /*
              1:酒店，
              2：项目标签(item_tag),
              3:社区,
              4：URL地址, 5:html页面
           */
           $scope.goToTarget = function(){
               var targetType = $scope.adInfo.targetType;
               var targetId = $scope.adInfo.targetId;
               if (targetType == 1) {
                   $state.go('hotel', { 'hotelId': targetId, 'rootTagId': rootTagId, 'itemId': itemId });
               }
               else if (targetType == 2) {

               }
               else if (targetType == 3) {
                   $state.go('bbs', { 'bbsId': targetId });
               }
           }
}]);