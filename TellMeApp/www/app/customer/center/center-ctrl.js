angular.module('tellme')
    .controller('customerCenterControll', ['$scope', '$state', '$ionicHistory', 'customerSer', 'LoadingSvr', 'popUpSer',
        function ($scope, $state, $ionicHistory, customerSer, LoadingSvr,popUpSer) {
            $scope.customer = {};
            $scope.hotels = new Array();
            $scope.host = customerSer.host;
            var userId = 0;
          //  $(".zxx_text_overflow-2").wordLimit(200);
            //判断用户是否登录
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel']=="") {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            } else {
                userId = window.localStorage['userId'];
            }
            $scope.getCustomerInfo = function () {
                //默认值
                var customerId = 1;
                if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel']==""){
                    $state.go('login', { pageName: 'customer' }); 
            } else {
                 customerId = window.localStorage['userId'];
                var promise = customerSer.getCustomerInfo(customerId);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            $scope.customer = data.data;
                        } else {
                          popUpSer.showAlert(data.msg);
                        }
                    },
                    function (data) {
                        console.log('其他');
                    }
                    );
                }
            }
            $scope.getCustomerInfo();
            //加载动态数据
            $scope.getDynamicData = function () {
                //默认值
                var customerId = 1;
                if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {
                    $state.go('login', { pageName: 'customer' });
                } else {
                    customerId = window.localStorage['userId'];
                    var promise = customerSer.customerDynamicCount(customerId);
                    promise.then(
                        function (data) {
                            if (data.isSuccess) {
                                $scope.DynamicCount = data.data;
                            } else {
                                 popUpSer.showAlert(data.msg);
                            }
                        },
                        function (data) {
                            console.log('其他');
                        }
                    );
                }
            }
            //删除话题
            $scope.deleteCustomerTopic = function (topicId) {
                var customerId = 0;
                if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {
                    $state.go('login', { pageName: 'customer' });
                } else {
                    customerId = window.localStorage['userId'];
                    var promise = customerSer.deleteCustomerTopic(topicId,customerId);
                    promise.then(
                        function (data) {
                            if (data.isSuccess) {
                                vm.moredata = false,
                                   $scope.getCustomerInfo();
                                 vm.loadMore();
                                console.log('删除成功！');
                            } else {
                                 popUpSer.showAlert(data.msg);
                            }
                        },
                        function (data) {
                            console.log('其他');
                         }
                    );
                }
              
            }
            $scope.selectedIndex = 1;
            $scope.showTabs = function (index) {
                $scope.selectedIndex = index;
                if (index == 5) {//加载动态数据
                    $scope.getDynamicData();
                    vm.moredata = true;
                } else {
                    vm.pageNumber = 0;
                    vm.moredata = false;
                    vm.loadMore();
                }
            }
            //下拉加载更多 根据标签获取酒店列表
            var vm = $scope.vm = {  
                moredata: false,
                pageNumber: 0,
                pageSize: 10,
                loadMore: function () {
                    if ($scope.selectedIndex == 1) { //常住酒店
                        LoadingSvr.show();
                        vm.pageNumber += 1;
                        var promise = customerSer.getCustomerAlways(userId,vm.pageNumber, vm.pageSize);
                        promise.then(
                            function (data) {
                                if (data.isSuccess) {
                                    $scope.hotels = data.rows;
                                    var total = data.total;//总的页数
                                    if (vm.pageNumber >= total) {
                                        vm.moredata = true;
                                        vm.pageNumber = 0;
                                    }
                                    LoadingSvr.hide();
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                               }
                             }, function (data) {
                                LoadingSvr.hide();
                                vm.moredata = true;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                console.log('其他');
                            }
                          );
                    }
                    else if ($scope.selectedIndex == 2) {  //获取用户最近浏览
                        LoadingSvr.show();
                        vm.pageNumber += 1;
                        var promise = customerSer.nearBrowse(userId, vm.pageNumber, vm.pageSize);
                        promise.then(
                            function (data) {
                                if (data.isSuccess) {
                                    $scope.browseData = data.rows;
                                    var total = data.total;//总的页数
                                    if (vm.pageNumber >= total) {
                                        vm.moredata = true;
                                        vm.pageNumber = 0;
                                    }
                                    LoadingSvr.hide();
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            }, function (data) {
                                LoadingSvr.hide();
                                vm.moredata = true;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                console.log('其他');
                            });
                    }
                    else if ($scope.selectedIndex == 3) {   //获取用户收藏
                        LoadingSvr.show();
                        vm.pageNumber += 1;
                        var promise = customerSer.customerSave(userId,vm.pageNumber, vm.pageSize);
                        promise.then(
                            function (data) {
                                if (data.isSuccess) {
                                    $scope.saveData = data.rows;
                                    var total = data.total;//总的页数
                                    if (vm.pageNumber >= total) {
                                        vm.moredata = true;
                                        vm.pageNumber = 0;
                                    }
                                    LoadingSvr.hide();
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                } else {
                                    LoadingSvr.hide();
                                      vm.moredata = true;
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    vm.moredata = true;
                                }
                            });
                    }
                    else if ($scope.selectedIndex == 4) {   //话题消息
                        LoadingSvr.show();
                        vm.pageNumber += 1;
                        var promise = customerSer.customerTopic(userId,vm.pageNumber, vm.pageSize);
                        promise.then(
                            function (data) {
                                if (data.isSuccess) {
                                    $scope.topicData= data.rows;
                                    var total = data.total;//总的页数
                                    if (vm.pageNumber >= total) {
                                        vm.moredata = true;
                                        vm.pageNumber = 0;
                                    }
                                    LoadingSvr.hide();
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                }
                            }, function (data) {
                                LoadingSvr.hide();
                                  vm.moredata = true;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                console.log('其他');
                            });
                        }
                     }
                 }
            vm.loadMore();
            //跳转到广告、主题详情
            //$scope.goDetail = function (targetType, targetId) {
            //    if (targetType == 1) {//单个酒店 酒店ID
            //        console.log("单个酒店详情");
            //        //  $state.go('discover');
            //    } else if (targetType == 2) {//酒店项目 itemid
            //        $state.go('hotelItem', { itemId: targetId });
            //    } else if (targetType == 3) {//社区bbsid
            //        $state.go('bbs', { bbsId: targetId });
            //    }
            //}
            $scope.goToAd = function (adId) {
                //param 根据target_type等于1（酒店）、2（服务项目）、3（社区）判断，传入参数target_id
                $state.go('adList', { 'adId': adId });
            }
            //返回
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            $scope.goHome = function () {
                $state.go('menu.home');
            }
            $scope.goDiscover = function () {
                $state.go('menu.discoverList');
            }
            /*（点击底部菜单）跳转“社区”*/
            $scope.goCommunity = function () {
                $state.go('menu.communityList');
            }
            //跳转到系统设置
            $scope.goSystem = function () {
                $state.go('system');
            }
            //跳转到评论
            $scope.goDiscuss = function () {
                $state.go('discuss');
            }
            //跳转到赞
            $scope.goAgree = function () {
                $state.go('agree');
            }
            //跳转到BBS
            $scope.goBBS = function (id) {
                $state.go('bbs', { bbsId: id });
            }
            //跳转到单个酒店详情
            $scope.goHotel = function (hotelId) {
                $state.go('hotel', { hotelId: hotelId, rootTagId: 0, itemId: 0 });
            }
    }]);