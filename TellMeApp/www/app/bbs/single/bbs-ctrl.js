﻿angular.module('tellme')
 .controller('bbsControll', ['$scope', '$ionicHistory', '$state', '$stateParams', '$ionicHistory', '$window', '$ionicModal', 'bbsSer', 'communitySer', 'commonSer', 'tellmeActionSheet', 'appConfig', 'LoadingSvr', 'popUpSer',
        function ($scope, $ionicHistory, $state, $stateParams, $ionicHistory, $window,$ionicModal, bbsSer, communitySer, commonSer, tellmeActionSheet, appConfig, LoadingSvr, popUpSer) {
            $scope.autoFocus = false;
            $scope.baseUrl = appConfig.server.getUrl();
            var bbsId = $stateParams.bbsId;
            // $state.go('login', {pageName: 'communityList'});
            var customerId = window.localStorage['userId'];
            if (customerId == "" || customerId == undefined) {
                customerId = 0;
            }
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //跳转到发帖页面
            $scope.toAddBbs = function () {
                //判断是否登录
                var isLogin = $scope.userIsLogin();
                if (isLogin) {
                    $state.go('addBbs');
                } else {
                    $state.go('login', {
                        pageName: 'menu.communityList'
                    });
                }
            }
            //跳转到图片浏览
            $scope.showImages = function (index, bbsId) {
                //判断是否登录
                var isLogin = $scope.userIsLogin();
                if (isLogin) {
                    bbsSer.loadImageByBbsId(bbsId).then(
                function (data) {
                    console.log(data.msg);
                    if (data.isSuccess) {
                        $scope.images = data.rows;
                        $scope.activeSlide = index;
                        $scope.showModal('app/community/imageBrowse.html');
                    } else {
                        console.log(data.msg);
                    }
                });
                } else {
                    $state.go('login', {
                        pageName: 'menu.communityList'
                    });
                }
            }
            /********* Modal start***************/
            $scope.showModal = function (templateUrl) {
                $ionicModal.fromTemplateUrl(templateUrl, {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
            };
            $scope.closeModal = function () {
                $scope.modal.hide();
                $scope.modal.remove()
            };
            /********* Modal  end ***************/


            $scope.globalVar = {};
            $scope.globalVar.answerText = "";//回帖内容
            $scope.globalVar.answerPlaceHolder = '我也说一句';
            $scope.showAnswer = false;

            //获取单个Bbs详情
            bbsSer.getBBs(bbsId,customerId).then(
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
                if ($scope.showAnswer) {
                    $scope.showAnswer = false;
                } else {
                    $scope.showAnswer = true;
                }

            }

            $scope.answered = {};//评论那一级的信息

            //点击'回复' 临时存储评论用户名和评论的bbsid
            $scope.toAnswer = function (bbsId, userName) {
                $scope.answered.bbsId = bbsId;
                $scope.answered.userName = userName;
                //在评论框中显示“回复 XXX：”
                //$scope.globalVar.answerText = "回复 " + userName + "：";
                $scope.globalVar.answerPlaceHolder = "回复 " + userName + "：";
                $scope.autoFocus = true;
            }

            //回主贴帖
            $scope.answerbbs = function (id, title) {
                $scope.autoFocus = false;

                $scope.showAnswer = false;
                var isLogin = $scope.userIsLogin();
                var answerText = $scope.globalVar.answerText;
                var userName = $scope.answered.userName;//临时存储的用户名
                //indexOf();//为0表示从首字符开始出现 -1表示没有出现过
                /*条件成立则是回复评论*/
                if ($scope.globalVar.answerPlaceHolder != "我也说一句") {
                    id = $scope.answered.bbsId;
                    var answerText = answerText;
                } else {//不是回复则是评论，取楼主id
                    id = $scope.bbs.id;
                }

                if (answerText == "" || answerText == undefined) {
                    popUpSer.showAlert("请输入内容");
                    return;
                }
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        id: 0, customerId: window.localStorage['userId'], bbsType: 1, postType: 1,
                        targetType: 0, parentId: id, title: title, text: answerText
                    });
                    var promise = communitySer.answerBbs(jsonData).then(
                  function (data) {
                      if (data.isSuccess) {
                          console.log('回帖成功');
                          /*清空输入框中的文字*/
                          $scope.globalVar.answerText = "";
                          $scope.globalVar.answerPlaceHolder = '我也说一句';
                          /*更新楼主的评论次数等*/
                          bbsSer.getBBs($scope.bbs.id, customerId).then(
                              function (data) {
                                  if (data.isSuccess) {
                                      $scope.bbs = data.data;
                                  } else {
                                      console.log(data.msg);
                                  }
                              }
                          );
                          /*更新回复的内容*/
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
                    $state.go('login', { pageName: 'menu.communityList' });
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
                              bbsSer.getBBs(id, customerId).then(
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
                              popUpSer.showAlert(data.msg);
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
                           bbsSer.getBBs(id, customerId).then(
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
                           popUpSer.showAlert(data.msg);
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
            $scope.share = function (bbsDetail) {
                $scope.showAnswer = false;
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var args = {};
                    args.url = "";
                    args.title = bbsDetail.title;
                    args.description = bbsDetail.text;
                    var imgs = [];
                    angular.forEach(bbsDetail.bbsAttachUrls, function (de, index) {
                        imgs[index] = $scope.baseUrl + de.attachUrl;
                    });
                    args.imageUrl = imgs;
                    args.appName = "挑米科技";
                    args.defaultText = "来自挑米科技";
                    tellmeActionSheet.show(args);

                } else {
                    $state.go('login', { pageName: 'communityList' });
                }
            }
            //回复某人,获取他的bbs信息
            $scope.answerChildren = function (id, level) {
                //如果所点击的是第三级的回复，则不能再回复了
                if (level == 3) {
                    console.log("不能再回复了");
                    return;
                }
                bbsId = id;
                bbsSer.getBBs(id, customerId).then(
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
                vm.loadMore();//获取他的回复
            }
            //下拉加载更多  //获取BBS回帖详情
            var vm = $scope.vm = {
                moredata: false,
                bbsDetail: [],
                pageNo: 0,
                pageSize: 10000,
                loadMore: function () {//加载BBS回复内容详情
                    LoadingSvr.show();
                    vm.pageNo += 1;
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
                  });
                }
            }
            vm.loadMore();
        }]);