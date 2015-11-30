angular.module('tellme')
    .controller('communityControll', ['$scope', '$window', '$state', '$ionicHistory', 'communitySer', 'appConfig',
        function ($scope, $window, $state, $ionicHistory, communitySer, appConfig) {
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
                // $ionicHistory.goback();
                $window.history.back();
            };
            $scope.baseUrl = appConfig.server.getUrl();
            //跳转到单个论坛详情
            $scope.toBbsDeail = function (bbsId) {
                $state.go('bbs', { bbsId: bbsId });
            }
            var initSelectedTag = 0;//选中分类标签索引
            var initCategoryId = 0;
            //获取社区分类
            var promise = communitySer.getCommunityType();
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.typs = data.rows;
                        initCategoryId = data.rows[0].id;
                    } else {
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log('其他');
                 }
                );
           // $scope.getTypeDetail(initSelectedTag, initCategoryId);
            //根据获取社区分类标签内容 categoryId分类标签ID
            $scope.getTypeDetail = function (index, categoryId) {
                $scope.selectedTag = index;
                vm.categoryId = categoryId;
                vm.pageNo = 0;
                vm.moredata = false;
                vm.init();
                ////  var categoryId = 1;//页面初始加载为1
                //var pageNo = 1;
                //var promise = communitySer.getTypeDetail(categoryId, pageNo).then(
                //    function (data) {
                //        if (data.isSuccess) {
                //            // $scope.typeDetail = data.rows;
                //            vm.typeDetail = data.rows;
                //        } else {
                //            console.log(data.msg);
                //        }
                //    },
                //    function (data) {
                //        console.log('其他');
                //    }
                //    );
            }
            var vm = $scope.vm = {
                //加载
                show: function () {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                },
                hide: function () {
                    $ionicLoading.hide();
                }
            }
            //回帖
            $scope.answerbbs = function (bbsId,bbsTitle) {
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        id: 0, customerId: window.localStorage['userId'], bbsType: 1, 
                        targetType: 0, parentId: bbsId, title: bbsTitle,text:""
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
                     id: 0, bbsType: 1, postType:2
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
                if (typeof (mobile) == "undefined" || mobile == "") {//如果用户未登录跳转到登录页面
                    return false;
                } else {
                    return true;
                }
            }
            //下拉加载更多
            var vm = $scope.vm = {
                categoryId:0,
                moredata: false,
                typeDetail: [],
                pageNo:1,
                init: function () {
                    var promise = communitySer.getTypeDetail(vm.categoryId, vm.pageNo).then(
                   function (data) {
                       if (data.isSuccess) {
                           vm.typeDetail = data.rows;
                       }
                     }
                   );
                },
                loadMore: function () {
                    vm.pageNoe += 1;
                    var promise = communitySer.getTypeDetail(vm.categoryId, vm.pageNo).then(
                  function (data) {
                      if (data.isSuccess) {
                          vm.typeDetail = data.rows;
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

        }
    ]);
   