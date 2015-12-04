angular.module('tellme')
    .controller('bbsControll', ['$scope', '$ionicHistory', '$stateParams', '$ionicHistory', '$window', 'bbsSer', 'communitySer', 'commonSer', 'appConfig', 'LoadingSvr',
        function ($scope, $ionicHistory, $stateParams, $ionicHistory, $window, bbsSer, communitySer,commonSer, appConfig, LoadingSvr) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.$window = $window;
        $scope.goBack = function () {
            //$ionicHistory.goBack();
            $window.history.back();
        };
        $scope.globalVar = {};
        $scope.globalVar.answerText = "";//回帖内容
        $scope.showAnswer = false;
        var bbsId = $stateParams.bbsId;
            bbsSer.getBBs(bbsId).then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.bbs = data.data;
                    } else {
                        console.log(data.msg);
                    }
                 }
                );
            //显示评论输入框
            $scope.showInput = function () {
                $scope.showAnswer = true;
            }
            //回主贴帖
            $scope.answerbbs = function (id,title) {
                $scope.showAnswer = false;
            var isLogin = $scope.userIsLogin();
            var answerText = $scope.globalVar.answerText;
            if (isLogin) {//如果用户已经登录
                var jsonData = JSON.stringify({
                    id: 0, customerId: window.localStorage['userId'], bbsType: 1,postType:1,
                    targetType: 0, parentId: id, title: title, text: answerText
                });
                var promise = communitySer.answerBbs(jsonData).then(
              function (data) {
                  if (data.isSuccess) {
                      console.log('回帖成功');
                      bbsSer.getBBs(id).then(
                          function (data) {
                              if (data.isSuccess) {
                                  $scope.bbs = data.data;
                              } else {
                                  console.log(data.msg);
                              }
                          }
                   );
                   vm.pageNo = 0;
                  vm.loadMore();
                  } else {
                      console.log(data.msg);
                  }
              },
              function (data) {
                  console.log('其他');
              }
              );
            } else {
                $state.go('login', { pageName: 'communityList' });
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
           //点赞
           $scope.agreeBbs = function (id) {
            var isLogin = $scope.userIsLogin();
            if (isLogin) {
                var jsonData = JSON.stringify({
                    targetId: id, praiseType: 0, customerId: window.localStorage['userId']
                });
                var promise = commonSer.saveAgree(jsonData).then(
                  function (data) {
                      if (data.isSuccess) {
                          bbsSer.getBBs(id).then(
                          function (data) {
                              if (data.isSuccess) {
                                  $scope.bbs = data.data;
                              } else {
                                  console.log(data.msg);
                              }
                          }
                         );
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
                $state.go('login', { pageName: 'communityList' });
            }
         
        }
         //收藏
         $scope.collectBbs = function (id) {
            var isLogin = $scope.userIsLogin();
            if (isLogin) {//如果用户已经登录
                var jsonData = JSON.stringify({
                    customerId: window.localStorage['userId'], collectionType: 3, targetId: id
                });
                var promise = commonSer.saveCollectionHistory(jsonData).then(
               function (data) {
                   if (data.isSuccess) {
                       bbsSer.getBBs(id).then(
                         function (data) {
                             if (data.isSuccess) {
                                 $scope.bbs = data.data;
                             } else {
                                 console.log(data.msg);
                             }
                         }
                    );
                       console.log('收藏成功');
                   } else {
                       console.log(data.msg);
                   }
               },
               function (data) {
                   console.log('其他');
               }
               );
            } else {
                $state.go('login', { pageName: 'communityList' });
            }
        }
         //回复某人
         $scope.answerChildren = function (id) {
             bbsId = id;
             bbsSer.getBBs(id).then(
                       function (data) {
                           if (data.isSuccess) {
                               $scope.bbs = data.data;
                           } else {
                               console.log(data.msg);
                           }
                       }
                );
             vm.pageNo = 0;
             vm.moredata = true;
             vm.loadMore();
         }
      
        //    //下拉加载更多  //获取单个BBS回帖详情
        var vm = $scope.vm = {
            moredata: false,
            bbsDetail: [],
            pageNo: 0,
            pageSize:5,
            loadMore: function () {//加载BBS回复内容详情
                LoadingSvr.show();
                vm.pageNo+= 1;
                var promise = bbsSer.bbsDeatil(bbsId, vm.pageNo, vm.pageSize).then(
              function (data) {
                  if (data.isSuccess) {
                      vm.bbsDetail = data.rows;
                      var total = data.total;
                      if (vm.pageNo * vm.pageSize > total || vm.pageNo * vm.pageSize == total) {
                          vm.moredata = true;
                          vm.pageNo = 0;
                      }
                      LoadingSvr.hide();
                      $scope.$broadcast('scroll.infiniteScrollComplete');
                  }
              }
              );
            }
        }
  
    }]);