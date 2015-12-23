
angular.module('tellme')
    .controller('homeControll', ['$scope', '$rootScope', '$state', '$ionicSlideBoxDelegate', '$timeout', 'homeSer', 'appConfig', 'commonSer', 'LoadingSvr', 'tellMeMapSvr', function ($scope, $rootScope, $state, $ionicSlideBoxDelegate, $timeout, homeSer, appConfig, commonSer, LoadingSvr, tellMeMapSvr) {

      //  tellMeMapSvr.getDistrict();
        /*首页初始化*/
        var vm = $scope.vm = {
            moredata: false,
            messages: [],
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
                              console.log("未获取数据！")
                          }
                       }
                    }
                  );
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            },
            //加载更多
            loadMore: function () {
                   console.log("上拉加载数据。")
                   vm.moredata = true;
                   $scope.$broadcast('scroll.infiniteScrollComplete');
                   
                //})
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
                               console.log("未获取数据！")
                           } else {
                               $scope.adData = data.rows;
                           }
                       } else {
                           console.log("获取数据失败！" + data.msg)
                       }
                   },
                   function (data) {
                       console.log('其他');
                   }
                   );
        ////获取底部广告
            var promise = homeSer.getFootAdd();
            promise.then(
                   function (data) {
                       if (data.isSuccess) {
                           if (data.rows.length == 0) {
                               console.log("未获取数据！")
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

            //获取广告滑动菜单
        var promise = homeSer.getSwiperAd();
                promise.then(
                       function (data) {
                           if (data.isSuccess) {
                               if (data.rows.length == 0) {
                                   console.log("未获取数据！")
                               } else {
                                    $scope.swiperAdData = data.rows;

                               }

                           } else {
                       console.log("获取数据失败！" + data.msg);
                           }

                       },
                       function (data) {
                           console.log('其他');
                       }
                     );

        //加载用户头像


        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('location');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            } else {
            $state.go('customer');
        }
            
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
        $scope.goToHotelList = function (param) {
            $state.go('hotelList');
        }
        //（点击头部广告）跳转“具体广告”图片展示
        $scope.goToAd = function (adInfo) {
            //param 根据target_type等于1（酒店）、2（服务项目）、3（社区）判断，传入参数target_id
            $state.go('adList', { 'adInfo': angular.toJson(adInfo) });
        }

        //（点击专题）跳转“具体专题”
        $scope.goToTheme = function (param) {

        }
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
        angular.element(document).ready(function () {
            var swiper = new Swiper('.swiper-container', {
                loop: true,
                pagination: '.swiper-pagination',
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }
            });
        });
        }])
