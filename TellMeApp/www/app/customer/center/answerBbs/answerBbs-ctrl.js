angular.module('tellme')
    .controller('answerBbsControll', ['$scope', '$ionicHistory', '$ionicActionSheet', '$stateParams', 'communitySer', 'popUpSer', 'hotelSer','adSer',
        function ($scope, $ionicHistory, $ionicActionSheet, $stateParams, communitySer, popUpSer, hotelSer,adSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            var bbsId = $stateParams.bbsId;
            var targetType = $stateParams.targetType;
            var path = $stateParams.path;
            $scope.globalVar = {};
            $scope.globalVar.answerText = "";//回帖内容
            //回复
            $scope.saveBbs = function () {
                $scope.showAnswer = false;
                var isLogin = $scope.userIsLogin();
                var answerText = $scope.globalVar.answerText;
                if (answerText=="") {
                    popUpSer.showAlert('请填写回复内容!');
                    return;
                }
                if (isLogin) {//如果用户已经登录
                    if (targetType==0) {//BBS
                         var jsonData = JSON.stringify({
                        id: 0, customerId: window.localStorage['userId'], bbsType: 1,postType:1,
                        targetType: 0, parentId: bbsId, title: "", text: answerText
                        });
                       var promise = communitySer.answerBbs(jsonData).then(
                       function (data) {
                          if (data.isSuccess) {
                             popUpSer.showAlert('回复成功');
                              $scope.goBack();
                          } else {
                              console.log(data.msg);
                          }
                       },
                     function (data) {
                      console.log('其他');
                      })
                    }
                    else if (targetType == 1) {//酒店
                        var jsonData = JSON.stringify({
                            id: 0, customerId: window.localStorage['userId'], bbsType: 1, postType: 1,
                            targetType: 0, parentId: bbsId, title: "", text: answerText
                        });
                        var promise = hotelSer.saveReply(window.localStorage['userId'], bbsId, answerText,path).then(
                        function (data) {
                            if (data.isSuccess) {
                                popUpSer.showAlert('回复成功');
                                $scope.goBack();
                            } else {
                                console.log(data.msg);
                            }
                        },
                      function (data) {
                          console.log('其他');
                      })
                    
                    } else {//广告
                        var jsonData = JSON.stringify({
                            customerId: window.localStorage['userId'],
                            parentId: bbsId,
                            targetId: 0,
                            text: answerText
                        });
                        var promise = adSer.saveAdAnswer(jsonData).then(
                         function (data) {
                             if (data.isSuccess) {
                                 popUpSer.showAlert('回复成功');
                                 $scope.goBack();
                             } else {
                                 console.log(data.msg);
                             }
                         },
                         function (data) {
                             console.log('其他');
                         }
                       );
                     }
                } else {
                    $state.go('login', { pageName: 'customer' });
                }
          
            }
            //判断用户是否登录
            $scope.userIsLogin = function () {
                var mobile = window.localStorage['userTel'];
                if (mobile == undefined || mobile == "") {//如果用户未登录跳转到登录页面
                    return false;
                } else {
                    return true;
                }
            }
        }]);