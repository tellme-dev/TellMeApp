angular.module('tellme')
.controller('adListControll', ['$scope','$state', '$window', '$stateParams', '$ionicHistory', 'appConfig','adSer','commonSer','tellmeActionSheet',
       function ($scope, $state, $window, $stateParams, $ionicHistory, appConfig, adSer, commonSer, tellmeActionSheet) {
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
           $scope.goToTarget = function () {
               var targetType = $scope.adInfo.targetType;
               var targetId = $scope.adInfo.targetId;
               //if (targetType == 1) {
               //    $state.go('hotel', { 'hotelId': targetId, 'rootTagId': 0, 'itemId': 0 });
               //}
               //else if (targetType == 2) {
               //    $state.go('hotelItem', { itemId: 2});
               //}
               //else if (targetType == 3) {
               //    $state.go('bbs', { 'bbsId': targetId });
               //}
               if (targetType == 4) {
                   //url
               }
           }
           //加载广告信息

           // 分享
           $scope.share = function (detail) {
               var args = {};
               //args.url = "";
               args.title = detail.title;
               args.description = detail.text;
               args.text = detail.text;
               var imgs = typeof (detail.bbsAttachUrls) === 'undefined' ? undefined : [];
               angular.forEach(detail.bbsAttachUrls, function (de, index) {
                   imgs[index] = $scope.baseUrl + de.attachUrl;
               });
               args.imageUrl = imgs;
               args.appName = "挑米科技";
               args.defaultText = "来自挑米科技";
               var shareResult = tellmeActionSheet.show(args);
               if (shareResult == 0) {
               } else if (shareResult == 1) {
                   commonSer.saveShare(detail.id);
               } else {
                   alert('分享出现其他错误');
               }
           }

           //点赞
           $scope.agree = function () {
               var isLogin = $scope.userIsLogin();
               if (isLogin) { //如果用户已经登录
                   var jsonData = JSON.stringify({
                       targetId: $scope.adInfo.id,
                       praiseType: 2,
                       customerId: window.localStorage['userTel']
                   });
                   //   var promise = communitySer.agreeBbs(jsonData).then
                   var promise = commonSer.saveAgree(jsonData)
                       .then(
                           function (data) {
                               if (data.isSuccess) {
                                   //再重新加载一次
                                   console.log("点赞成功");
                               } else {
                                   console.log(data.msg);
                               }
                           },
                           function (data) {
                               console.log('其他');
                           }
                       );
               } else {
                   $state.go('login', {
                       pageName: 'menu.communityList'
                   });
               }
           }
           //收藏
           $scope.collect = function () {
               var isLogin = $scope.userIsLogin();
               if (isLogin) { //如果用户已经登录
                   var jsonData = JSON.stringify({
                       customerId: window.localStorage['userId'],
                       collectionType: 3,
                       targetId: $scope.adInfo.id
                   });
                   // var promise = commonSer.collectionBbs(jsonData).then(
                   var promise = commonSer.saveCollectionHistory(jsonData)
                       .then(
                           function (data) {
                               if (data.isSuccess) {
                                   //再重新加载一次
                                   console.log('收藏成功');
                               } else {
                                   alert(data.msg);
                                   console.log(data.msg);
                               }
                           },
                           function (data) {
                               console.log('其他');
                           }
                       );
               } else {
                   $state.go('login', {
                       pageName: 'menu.communityList'
                   });
               }
           }
}]);