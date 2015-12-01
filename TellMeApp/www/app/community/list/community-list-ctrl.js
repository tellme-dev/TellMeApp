﻿angular.module('tellme')
    .controller('communityControll', ['$scope', '$window', '$state', '$ionicHistory', '$ionicLoading', 'communitySer', 'appConfig',
        function ($scope, $window, $state, $ionicHistory,$ionicLoading, communitySer, appConfig) {
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
                // $ionicHistory.goBack();
                $window.history.back();
            };
            $scope.baseUrl = appConfig.server.getUrl();
            //跳转到单个论坛详情
            $scope.toBbsDeail = function (bbsId) {
                $state.go('bbs', { bbsId: bbsId });
            }
            $scope.SelectedTag = 0;//选中分类标签索引
            var initCategoryId = 0;
            //获取社区分类
            var promise = communitySer.getCommunityType();
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.typs = data.rows;
                        vm.categoryId = data.rows[0].id;
                        vm.pageNo = 1;
                      //  vm.loadMore();
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
            $scope.gettypedetail = function (index, categoryid) {
                $scope.selectedtag = index;
                vm.categoryId = categoryid;
                vm.pageNo =0;
                vm.moredata = false;
                vm.loadMore();
            }
          
        //    //回帖
        //    $scope.answerbbs = function (bbsId,bbsTitle) {
        //        var isLogin = $scope.userIsLogin();
        //        if (isLogin) {//如果用户已经登录
        //            var jsonData = JSON.stringify({
        //                id: 0, customerId: window.localStorage['userId'], bbsType: 1, 
        //                targetType: 0, parentId: bbsId, title: bbsTitle,text:""
        //            });
        //            var promise = communitySer.answerBbs(jsonData).then(
        //          function (data) {
        //              if (data.isSuccess) {
        //                  console.log('回帖成功');
        //              } else {
        //                  console.log(data.msg);
        //              }
        //          },
        //          function (data) {
        //              console.log('其他');
        //          }
        //          );
        //        } else {
        //            $state.go('login');
        //        }
        //    }
        //    //点赞
        //     $scope.agreeBbs = function (bbsId) {
        //         var jsonData = JSON.stringify({
        //             id: 0, bbsType: 1, postType:2
        //         });
        //         var promise = communitySer.agreeBbs(categoryId, pageNo).then(
        //           function (data) {
        //               if (data.isSuccess) {
        //                   $scope.typeDetail = data.rows;
        //               } else {
        //                   console.log(data.msg);
        //               }
        //           },
        //           function (data) {
        //               console.log('其他');
        //           }
        //           );
        //    }
        //    //收藏
        //     $scope.collectBbs = function (bbsId) {
        //         var isLogin = $scope.userIsLogin();
        //         if (isLogin) {//如果用户已经登录
        //             var jsonData = JSON.stringify({
        //                 customerId: window.localStorage['userId'], collectionType: 3, targetId: bbsId
        //             });
        //            var promise = communitySer.collectionBbs(jsonData).then(
        //           function (data) {
        //               if (data.isSuccess) {
        //                   console.log('收藏成功');
        //               } else {
        //                   console.log(data.msg);
        //               }
        //           },
        //           function (data) {
        //               console.log('其他');
        //           }
        //           );
        //         } else {
        //             $state.go('login');
        //         }
        //     }

        //    //跳转到首页
        //    $scope.goHome = function () {
        //        $state.go('home');
        //    }
        //    /*（点击底部菜单）跳转“发现”*/
        //    $scope.goDiscover = function () {
        //        $state.go('discoverList');
        //    }
        //    /*（点击底部菜单）跳转“入住”*/
        //    $scope.goCheckinto = function () {
        //        // $state.go('communityList');
        //        console.log("跳转到入住");
        //    }
        //    //判断用户是否登录
        //    $scope.userIsLogin = function () {
        //        var mobile = window.localStorage['userTel'];
            //         if (mobile == undefined || mobile == "")  {//如果用户未登录跳转到登录页面
        //            return false;
        //        } else {
        //            return true;
        //        }
        //    }
        //    //下拉加载更多
            var vm = $scope.vm = {
                //加载
                show: function () {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });
                },
                hide: function () {
                    $ionicLoading.hide();
                },
                categoryId:-1,
                moredata: false,
                typeDetail: [],
                pageNo:0,
                pageSize:5,
                loadMore: function () {
                    vm.show();
                    vm.pageNo += 1;
                    var promise = communitySer.getTypeDetail(vm.categoryId, 1, vm.pageSize).then(
                  function (data) {
                      if (data.isSuccess) {
                          vm.typeDetail = data.rows;
                          var total = data.total;
                          if (vm.pageNo * vm.pageSize > total || vm.pageNo * vm.pageSize == total) {
                              vm.moredata = true;
                              vm.pageNo = 0;
                          }
                          //if (data.rows.length == 0) {
                          //    vm.moredata = true;
                          //};
                          vm.hide();
                          $scope.$broadcast('scroll.infiniteScrollComplete');
                      }
                    }
                  );
                } 
            }

        }
    ]);
   