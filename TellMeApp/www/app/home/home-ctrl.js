
angular.module('tellme')
    .controller('homeControll', ['$scope', '$state', '$ionicSlideBoxDelegate', '$timeout', '$ionicLoading', 'homeSer', 'appConfig',
        function ($scope, $state,$ionicSlideBoxDelegate,$timeout,$ionicLoading, homeSer, appConfig) {
        /*首页初始化*/
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: true,
            centeredSlides: true,
            slidesPerView: 1.3,
            watchActiveIndex: false
        });
        var vm = $scope.vm = {
            moredata: false,
            messages: [],
            pagination: {
                perPage: 5,
                currentPage: 1
            },
            //加载
           show :function() {
                $ionicLoading.show({
                    template: 'Loading...'
                });
            },
           hide : function(){
                $ionicLoading.hide();
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
                //vm.pagination.currentPage += 1;
                //services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
                //    vm.messages = vm.messages.concat(data);
                //    if (data.length == 0) {
                  //     vm.moredata = true;
                //    };
                   vm.show();
                   console.log("上拉加载数据。")
                   vm.moredata = true;
                   $scope.$broadcast('scroll.infiniteScrollComplete');
                   vm.hide();
                //})
            } 
        }
      
        //获取URL
        $scope.baseUrl = appConfig.server.getUrl();
            // 获取当前位置
            //AMap.service(["AMap.CitySearch"], function () {
            //    //实例化城市查询类
            //    var citysearch = new AMap.CitySearch();
            //    citysearch.getLocalCity(function (status, result) {
            //        if (status === 'complete' && result.info === 'OK') {
            //            if (result && result.city && result.bounds) {
            //                var cityinfo = result.city;
            //                $scope.currentCity = cityinfo;
            //               // console.log('当前城市：' + cityinfo);
            //            }
            //        }
            //    });
            //});

        //广告（头部广告、底部专栏）动态加载
        ////获取头部广告信息
        //    var promise = homeSer.getAdd();
        //    promise.then(
        //           function (data) {
                       
        //               if (data.isSuccess) {
        //                   if (data.rows.length == 0) {
        //                       console.log("未获取数据！")
        //                   } else {
        //                       $scope.adData = data.rows;
        //                   }
                         
        //               } else {
        //                   console.log("获取数据失败！" + data.msg)
        //               }
                      
        //           },
        //           function (data) {
        //               console.log('其他');
        //           }
        //           );
        ////获取底部广告
        //    var promise = homeSer.getFootAdd();
        //    promise.then(
        //           function (data) {
        //               if (data.isSuccess) {
        //                   if (data.rows.length == 0) {
        //                       console.log("未获取数据！")
        //                   } else {
        //                       $scope.footAdData = data.rows;
        //                   }

        //               } else {
        //                   console.log("获取数据失败！" + data.msg)
        //               }

        //           },
        //           function (data) {
        //               console.log('其他');
        //           }
            //           );

            //获取广告滑动菜单
                //var promise = homeSer.getSwiperAd ();
                //promise.then(
                //       function (data) {
                //           if (data.isSuccess) {
                //               if (data.rows.length == 0) {
                //                   console.log("未获取数据！")
                //               } else {
                //                    $scope.swiperAdData = data.rows;

                //               }

                //           } else {
                //               console.log("获取数据失败！" + data.msg)
                //           }

                //       },
                //       function (data) {
                //           console.log('其他');
                //       }
                //     );



        //菜单先查询本地是否有保存，没有，动态加载；有，在家本地数据；

        //加载用户头像


        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('location');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            $state.go('customer');
        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('');
        }
        //跳转到酒店分类二级页面
        $scope.hotelType=function(){
            $state.go('hotelList');
        }
        /*（点击菜单项）跳转“酒店列表”*/
        $scope.goToHotelList = function (param) {
        }
        /*（点击头部广告）跳转“具体广告”*/
        //$scope.goToAd = function (param) {
        $scope.goToAd = function () {
            //param 根据target_type等于1（酒店）、2（服务项目）、3（社区）判断，传入参数target_id
            $state.go('themeCardAd');
        }
         
        /*（点击专题）跳转“具体专题”*/
        $scope.goToTheme = function (param) {

        }
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
            /*（点击底部菜单）跳转“发现”*/
        $scope.goDiscover = function () {
            $state.go('discoverList');
        }
            /*（点击底部菜单）跳转“社区”*/
        $scope.goCommunity = function () {
            $state.go('communityList');
        }
        }])
    .directive('admenu', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var url = 'http://192.168.1.103:8080/TellMeMgr';
                var html = '<div class="swiper-slide red-slide red-padding">';
                angular.forEach(scope[attrs.menuData], function (menuData, index) {
                    html += ' <div class="title">' + menuData.name + '</div>';
                    html += ' <div class="scroll-content has-header mar-top">';
                    angular.forEach(menuData.imageUrls, function (imageUrls, index) {
                        if ((index + 1) % 2 != 0) {
                            html += '<div class="row">';
                            html += ' <div  class="col"><img src="' + url + imageUrls + '" width="100%" height="40%" /></div>';
                        } else {
                            html += ' <div  class="col"><img src="' + url + imageUrls + '" width="100%" height="40%" /></div>';
                            html += '</div>';
                        }
                    });
                    html += '</div>';
                });
                html += '</div>';
                element.replaceWith(html)
            }
        }
    });
