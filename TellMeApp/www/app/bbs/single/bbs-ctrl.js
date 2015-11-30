angular.module('tellme')
    .controller('bbsControll', ['$scope', '$ionicHistory', '$stateParams', 'bbsSer', 'communitySer', 'appConfig',
        function ($scope, $ionicHistory, $stateParams, bbsSer,communitySer, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.goBack = function () {
            $ionicHistory.goback();
        };
        var bbsId = $stateParams.bbsId;
        //vm.bbsId = $stateParams.bbsId;
        //var pageNo = 1;
        //获取单个BBS详情
            bbsSer.getBBs(bbsId).then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.bbs = data.rows;
                    } else {
                        console.log(data.msg);
                    }
                }
                );
       
       
        //$scope.bbsDeatil = function (bbsId, pageNo) {
        //   // var pageNo = 1;
        //    var promise = bbsSer.bbsDeatil(bbsId, pageNo).then(
        //        function (data) {
        //            if (data.isSuccess) {
        //                $scope.bbsDetail = data.rows;
        //            } else {
        //                console.log(data.msg);
        //            }
        //        },
        //        function (data) {
        //            console.log('其他');
        //        }
        //      );
        //}
            //回帖
        $scope.answerbbs = function (bbsId, bbsTitle) {
            var isLogin = $scope.userIsLogin();
            if (isLogin) {//如果用户已经登录
                var jsonData = JSON.stringify({
                    id: 0, customerId: window.localStorage['userId'], bbsType: 1,
                    targetType: 0, parentId: bbsId, title: bbsTitle, text: ""
                });
                var promise = communitySer.answerBbs(jsonData).then(
              function (data) {
                  if (data.isSuccess) {
                      console.log('回帖成功');
                  } else {
                      console.log(data.msg);
                  }
              },
              function (data) {
                  console.log('其他');
              }
              );
            } else {
                $state.go('login');
            }
        }
            //点赞
        $scope.agreeBbs = function (bbsId) {
            var jsonData = JSON.stringify({
                id: 0, bbsType: 1, postType: 2
            });
            var promise = communitySer.agreeBbs(categoryId, pageNo).then(
              function (data) {
                  if (data.isSuccess) {
                      $scope.typeDetail = data.rows;
                  } else {
                      console.log(data.msg);
                  }
              },
              function (data) {
                  console.log('其他');
              }
              );
        }
            //收藏
        $scope.collectBbs = function (bbsId) {
            var isLogin = $scope.userIsLogin();
            if (isLogin) {//如果用户已经登录
                var jsonData = JSON.stringify({
                    customerId: window.localStorage['userId'], collectionType: 3, targetId: bbsId
                });
                var promise = communitySer.collectionBbs(jsonData).then(
               function (data) {
                   if (data.isSuccess) {
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
                $state.go('login');
            }
        }
            //下拉加载更多  //获取单个BBS回帖详情
        var vm = $scope.vm = {
            bbsId: bbsId,
            moredata: false,
            bbsDetail: [],
            pageNo: 1,
            init: function () {
                var promise = bbsSer.bbsDeatil(vm.bbsId, vm.pageNo).then(
               function (data) {
                   if (data.isSuccess) {
                       vm.bbsDetail = data.rows;
                   }
               }
               );
            },
            loadMore: function () {
                vm.pageNoe += 1;
                var promise = bbsSer.bbsDeatil(vm.bbsId, vm.pageNo).then(
              function (data) {
                  if (data.isSuccess) {
                      vm.bbsDetail = data.rows;
                      if (data.length == 0) {
                          vm.moredata = true;
                      };
                      $scope.$broadcast('scroll.infiniteScrollComplete');
                  }
              }
              );
            }
        }
        vm.init();

    }]);