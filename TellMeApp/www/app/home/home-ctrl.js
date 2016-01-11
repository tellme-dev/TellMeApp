
angular.module('tellme')
    .controller('homeControll', ['$scope', '$rootScope', '$state', '$ionicSlideBoxDelegate', '$timeout', 'homeSer', 'appConfig', 'commonSer', 'LoadingSvr', function ($scope, $rootScope, $state, $ionicSlideBoxDelegate, $timeout, homeSer, appConfig, commonSer, LoadingSvr) {
        LoadingSvr.show();
        $scope.swiper = {
        };
        $scope.onReadySwiper = function (swiper) {
            //swiper.on('onProgress', function () {
            //    for (var i = 0; i < swiper.slides.length; i++) {
            //        var slide = swiper.slides[i];
            //        var progress = slide.progress;
            //        scale = 1 - Math.min(Math.abs(progress * 0.2), 1);

            //        es = slide.style;
            //        es.opacity = 1 - Math.min(Math.abs(progress / 2), 1);
            //        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0px,0,' + (-Math.abs(progress * 150)) + 'px)';

            //    }
            //});
        };
        //测试
        $scope.test = function(index){
           alert(index)
        }
        /*首页初始化*/
        var vm = $scope.vm = {
            moredata: true,
            messages: [],
            pageNum: 6,
            pagination: {
                perPage: 5,
                currentPage: 1
            },
            //下拉刷新
            doRefresh: function () {
                $timeout(function () {
                    homeSer.getAdd().then(
                  function (data) {
                      if (data.isSuccess) {
                          if (data.rows.length == 0) {
                              console.log("未获取数据！");
                          }
                      }
                  }
                  );
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            },
            //加载更多
            loadMore: function () {
                homeSer.getFootAdd(vm.pageNum).then(
                    function (data) {
                        if (data.isSuccess) {
                            if (typeof(data.rows) =='undefined'||data.rows.length == 0) {
                                vm.moredata = false;
                                vm.pageNum = 6;
                                console.log("没有数据");
                                //提示
                            } else {
                                $scope.footAdData = data.rows;
                                if (data.rows.length < vm.pageNum) {
                                    vm.moredata = false;
                                    vm.pageNum = 6;
                                    console.log("没有更多数据了");
                                    //提示
                                } else {
                                    vm.pageNum += 5;
                                }
                            }
                        } else {
                            vm.moredata = false;
                            console.log("获取数据失败！" + data.msg)
                        }
                    },
                       function (data) {
                           console.log('其他');
                       });
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }

        //获取URL
        $scope.baseUrl = appConfig.server.getUrl();

        $rootScope.setCity = window.localStorage['currentcity'];
        $scope.$watch('setCity', function (newValue, oldValue) {
            $rootScope.setCity = newValue;
            console.log("newValue:" + newValue + ",oldValue:" + oldValue);
        });
        //获取城市定位
        //广告（头部广告、底部专栏）动态加载
        ////获取头部广告信息
        var promise = homeSer.getAdd();
        promise.then(
               function (data) {
                   if (data.isSuccess) {
                       if (data.rows.length == 0) {
                           console.log("获取数据为空！")
                       } else {
                           $scope.adData = data.rows;
                       }
                   } else {
                       console.log(data.msg);
                   }
               },
               function (data) {
                   console.log('获取数据失败！');
                }
               );
        ////获取底部广告
            $scope.getFootAd = function (num) {
                if (num == null || num == "") {
                    num = 6;
                }
                var promise = homeSer.getFootAdd(num);
                promise.then(
                       function (data) {
                           if (data.isSuccess) {
                               if (data.rows.length == 0) {
                                   console.log("获取数据为空！")
                               } else {
                                   $scope.footAdData = data.rows;
                               }
                           } else {
                       console.log("获取数据失败！" + data.msg)
                   }
               },
               function (data) {
                   console.log('其他');
               }
               );
            }
            $scope.getFootAd();

        //获取酒店滑动菜单
        var promise = homeSer.getSwiperAd();
        promise.then(
               function (data) {
                   if (data.isSuccess) {
                       if (data.rows.length == 0) {
                           console.log("未获取数据！");

                       } else {
                           //$scope.swiperAdData = data.rows;
                           $scope.swiperAdData = [
                               {
                                   name: '酒店',
                                   itemTagId:1,
                                   hotelItems: [
                                       {itemId: undefined,itemTagId:undefined,imageUrl:""},
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '吃货',
                                   itemTagId: 2,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '闲人',
                                   itemTagId: 3,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '玩家',
                                   itemTagId: 4,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '睡客',
                                   itemTagId: 5,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '亲子',
                                   itemTagId: 6,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '智能控',
                                   itemTagId: 7,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               },
                               {
                                   name: '更多',
                                   itemTagId: 8,
                                   hotelItems: [
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" },
                                       { itemId: undefined, itemTagId: undefined, imageUrl: "" }
                                   ]
                               }
                           ];
                           LoadingSvr.hide();
                       }

                   } else {
                       console.log("获取数据失败！" + data.msg);
                   }

               },
               function (data) {
                   console.log('其他');
               }
             );

        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('location');
        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('willSearch');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            } else {
                $state.go('customer');
            }

        }
        //推荐更多
        $scope.goDiscover = function () {
            $state.go('menu.discoverList');
        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('willSearch');
        }
        //跳转到酒店分类二级页面
        $scope.hotelType = function (id) {
            $state.go('hotelList', { 'itemTagId': id });
        }
        /*（点击菜单项）跳转“酒店列表”*/
        $scope.goToItemList = function (rootId,childId,itemId) {
            $state.go('hotelList', { itemTagRootId: rootId, childId: childId, itemId: itemId });
        }
        //$scope.goToHotelList = function (param) {
        //    $state.go('hotelList', { itemTagId: param });
        //}
        //（点击头部广告）跳转“具体广告”图片展示
        $scope.goToAd = function (adId) {
            //param 根据target_type等于1（酒店）、2（服务项目）、3（社区）判断，传入参数target_id
            $state.go('adList', { 'adId': adId });
        }

        //（点击专题）跳转“具体专题”
        $scope.goToTheme = function (param) {

        }
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }

    }])
