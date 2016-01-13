angular.module('tellme')
.controller('adListControll', ['$scope','$state', '$window', '$stateParams', '$ionicHistory', 'appConfig','popUpSer','LoadingSvr','adSer','commonSer','tellmeActionSheet',
       function ($scope, $state, $window, $stateParams, $ionicHistory, appConfig, popUpSer,LoadingSvr, adSer, commonSer, tellmeActionSheet) {
           $scope.baseUrl = appConfig.server.getUrl();
           var adId = $stateParams.adId;
           
           /*返回前一个界面*/
        //$scope.$window = $window;
           $scope.goBack = function () {
             $ionicHistory.goBack();
           };
           $scope.globalVar = {};
           $scope.globalVar.answerText = "";//回帖内容
           $scope.globalVar.answerPlaceHolder = '我也说一句';
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
               }
           }
           //加载广告信息
           LoadingSvr.show();
           adSer.loadAdInfo(adId).then(
                           function (data) {
                               if (data.isSuccess) {
                                   $scope.adInfo = data.data;
                                   $scope.adDetail=data.data.adDetailList;
                                   LoadingSvr.hide();
                                   console.log('加載成功');
                               } else {
                                   console.log(data.msg);
                               }
                           },
                           function (data) {
                               console.log('其他');
                           }
                       );
           //获取评论
           $scope.getBBs=function(){
           adSer.getAdBbs(adId).then(
                       function (data) {
                           if (data.isSuccess) {
                               $scope.adBBs = data.rows;
                               LoadingSvr.hide();
                           } else {
                               console.log(data.msg);
                           }
                       },
                       function (data) {
                           console.log('其他');
                       }
                   );
           }
           $scope.getBBs();
           $scope.answered = {};//评论那一级的信息
           //点击'回复' 临时存储评论用户名和评论的bbsid
           $scope.toAnswer = function (bbsId, userName) {
               $scope.answered.bbsId = bbsId;
               $scope.answered.userName = userName;
               //在评论框中显示“回复 XXX：”
               //$scope.globalVar.answerText = "回复 " + userName + "：";
               $scope.globalVar.answerPlaceHolder = "回复 " + userName + "：";
           }
           //回主贴帖
           $scope.answerbbs = function () {
               $scope.showAnswer = false;
               var targetId = adId;//默认为回复
               var parentId = 0;//默认为评论
               var isLogin = $scope.userIsLogin();
               var answerText = $scope.globalVar.answerText;
               var userName = $scope.answered.userName;//临时存储的用户名
               //indexOf();//为0表示从首字符开始出现 -1表示没有出现过
               /*条件成立则是回复评论*/
               if ($scope.globalVar.answerPlaceHolder != "我也说一句") {//回复
                   parentId  = $scope.answered.bbsId;
                   targetId = 0;
                   var answerText = answerText;
               } else {//评论，取Adid
                   parentId = 0;
                   targetId = adId;
               }

               if (answerText == "" || answerText == undefined) {
                   popUpSer.showAlert("请输入内容");
                   return;
               }
               if (isLogin) {//如果用户已经登录
                   var jsonData = JSON.stringify({
                       customerId: window.localStorage['userId'],
                       parentId:parentId,
                       targetId: targetId,
                       text: answerText
                   });
                   var promise = adSer.saveAdAnswer(jsonData).then(
                 function (data) {
                     if (data.isSuccess) {
                         console.log('回帖成功');
                         /*清空输入框中的文字*/
                         $scope.globalVar.answerText = "";
                         $scope.globalVar.answerPlaceHolder = '我也说一句';
                         /*更新回复的内容*/
                         $scope.getBBs();
                     } else {
                         console.log(data.msg);
                     }
                 },
                 function (data) {
                     console.log('其他');
                 }
                 );
               } else {
                   $state.go('login', { pageName: 'menu.communityList' });
               }

           }
           // 分享
           $scope.share = function () {
               var args = {};
               var adinfo = $scope.adInfo;
               //args.url = "";
               args.title = adinfo.name;
               args.description = adinfo.adDetailList[0].text;
               args.text = adinfo.adDetailList[0].text;
               var imgs = typeof (adinfo.adDetailList[0].imageUrl) == 'undefined' ? undefined : [];
               angular.forEach(adinfo.adDetailList[0].imageUrl, function (de, index) {
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
                   popUpSer.showAlert('分享出现其他错误');
               }
           }

           //点赞
           $scope.agree = function () {
               var isLogin = $scope.userIsLogin();
               if (isLogin) { //如果用户已经登录
                   var jsonData = JSON.stringify({
                       targetId: $scope.adInfo.id,
                       praiseType: 2,
                       customerId: window.localStorage['userId']
                   });
                   //   var promise = communitySer.agreeBbs(jsonData).then
                   var promise = commonSer.saveAgree(jsonData)
                       .then(
                           function (data) {
                               if (data.isSuccess) {
                                   //页面上的次数更新 或者再重新加载一次
                                   $scope.adInfo.agreeCount += 1;
                                   console.log("点赞成功");
                               } else {
                                   popUpSer.showAlert(data.msg);
                               }
                           },
                           function (data) {
                               console.log('其他');
                           }
                       );
               } else {
                   $state.go('login', {
                       pageName: 'adList'
                   });
               }
           }
           //收藏
           $scope.collect = function () {
               var isLogin = $scope.userIsLogin();
               if (isLogin) { //如果用户已经登录
                   var jsonData = JSON.stringify({
                       customerId: window.localStorage['userId'],
                       collectionType: 2,
                       targetId: $scope.adInfo.id
                   });
                   // var promise = commonSer.collectionBbs(jsonData).then(
                   var promise = commonSer.saveCollectionHistory(jsonData)
                       .then(
                           function (data) {
                               if (data.isSuccess) {
                                   //页面上的次数更新 或者再重新加载一次
                                   $scope.adInfo.collectionCount += 1;
                                   console.log('收藏成功');
                               } else {
                                   popUpSer.showAlert(data.msg);
                                   console.log(data.msg);
                               }
                           },
                           function (data) {
                               console.log('其他');
                           }
                       );
               } else {
                   $state.go('login', {
                       pageName: 'adList'
                   });
               }
           }
           //判断用户是否登录
           $scope.userIsLogin = function () {
               var mobile = window.localStorage['userTel'];
               if (mobile == undefined || mobile == "") { 
                   return false;
               } else {
                   return true;
               }
           }
         

}]);