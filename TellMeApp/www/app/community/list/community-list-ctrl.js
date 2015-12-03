angular.module('tellme')
    .controller('communityControll', ['$scope', '$window', '$state', '$ionicHistory', '$ionicLoading', 'communitySer', 'appConfig', 'LoadingSvr',
        function ($scope, $window, $state, $ionicHistory, $ionicLoading, communitySer, appConfig, LoadingSvr) {
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
                 $ionicHistory.goBack();
                //$window.history.back();
            };
            $scope.baseUrl = appConfig.server.getUrl();
            //跳转到单个论坛详情
            $scope.toBbsDetail = function (bbsId) {
                $state.go('bbs', { bbsId: bbsId },{ reload:true});
            }
            $scope.globalVar = {};
            $scope.globalVar.SelectedTag = 1;//选中分类标签索引
            var initCategoryId = 0;
         
            //根据获取社区分类标签内容 categoryId分类标签ID
            $scope.gettypedetail = function (index, categoryid) {
                $scope.globalVar.SelectedTag = index;
                vm.categoryId = categoryid;
                vm.pageNo =0;
                vm.moredata = false;
                vm.loadMore();
            }
            $scope.showAnswer = false;
        
            $scope.globalVar.answerText = "";//回帖内容
            var bbsId = 0;
            var bbsTitle = "";
            $scope.showAnswerbbs = function (id, title) {
                bbsId = id;
                bbsTitle = title;
                $scope.showAnswer = true;
            }
        //    //回帖
            $scope.answerbbs = function () {
                  $scope.showAnswer = false;
                var isLogin = $scope.userIsLogin();
                var answerText = $scope.globalVar.answerText;
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        id: 0, customerId: window.localStorage['userId'], bbsType: 1, postType: 1,
                        targetType: 0, parentId: bbsId, title: bbsTitle, text: answerText
                    });
                    var promise = communitySer.answerBbs(jsonData).then(
                  function (data) {
                      if (data.issuccess) {
                          vm.loadMore();
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
                    $state.go('login', { pageName: 'communityList' });
                }
            }
            //点赞
            $scope.agreeBbs = function (bbsId, count) {
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        id: bbsId, bbsType: 1, postType: 2
                    });
                    var promise = communitySer.agreeBbs(jsonData).then(
                      function (data) {
                          if (data.isSuccess) {
                              vm.loadMore();
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
             $scope.collectBbs = function (bbsId,count) {
                 var isLogin = $scope.userIsLogin();
                 if (isLogin) {//如果用户已经登录
                     var jsonData = JSON.stringify({
                         customerId: window.localStorage['userId'], collectionType: 3, targetId: bbsId
                     });
                    var promise = communitySer.collectionBbs(jsonData).then(
                   function (data) {
                       if (data.isSuccess) {
                           vm.loadMore();
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

            //跳转到首页
            $scope.goHome = function () {
                $state.go('home');
            }
            /*（点击底部菜单）跳转“发现”*/
            $scope.goDiscover = function () {
                $state.go('discoverList');
            }
            /*（点击底部菜单）跳转“入住”*/
            $scope.goCheckinto = function () {
                // $state.go('communityList');
                console.log("跳转到入住");
            }
            //判断用户是否登录
            $scope.userIsLogin = function () {
                var mobile = window.localStorage['userTel'];
               if (mobile == undefined || mobile == "")  {//如果用户未登录跳转到登录页面
                    return false;
                } else {
                    return true;
                }
            }
        //    //下拉加载更多
            var vm = $scope.vm = {
                categoryId:1,
                moredata: false,
                typeDetail: [],
                pageNo:0,
                pageSize:3,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = communitySer.getTypeDetail(vm.categoryId, vm.pageNo, vm.pageSize).then(
                  function (data) {
                     
                      if (data.isSuccess) {
                          vm.typeDetail = data.rows;
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

        }
           //获取社区分类
            //var promise = communitySer.getCommunityType();
            //promise.then(
            //    function (data) {
            //        if (data.isSuccess) {
            //            $scope.typs = data.rows;
            //            vm.categoryId = data.rows[0].id;
            //            vm.pageNo = 0;
            //            vm.loadMore();
            //        } else {
            //            console.log(data.msg);
            //        }
            //    },
            //    function (data) {
            //        console.log('其他');
            //     }
            //    );
           // $scope.getTypeDetail(initSelectedTag, initCategoryId);
    ]);
   