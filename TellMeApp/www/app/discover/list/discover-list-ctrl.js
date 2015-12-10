angular.module('tellme')
    .controller('discoverListControll', ['$scope', '$window', '$state', '$ionicHistory', 'discoverSer', 'commonSer', 'LoadingSvr', 'appConfig',
        function ($scope, $window, $state, $ionicHistory, discoverSer, commonSer, LoadingSvr, appConfig) {
            // 获取当前位置
            AMap.service(["AMap.CitySearch"], function () {
                //实例化城市查询类
                var citysearch = new AMap.CitySearch();
                citysearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.city && result.bounds) {
                            cityinfo = result.city;
                            $scope.currentCity = cityinfo;
                            console.log('当前城市：' + cityinfo);
                        }
                    }


                });
            });
            $scope.dataShow = false;
            $scope.msgShow = false;
            /*返回前一个界面*/
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //跳转到发现详情
            $scope.goDetail = function (targetType, targetId) {
                if (targetType == 1) {//单个酒店 酒店ID
                    console.log("单个酒店详情");
                  //  $state.go('discover');
                } else if (targetType == 2) {//酒店项目 itemid
                    $state.go('hotelItem', { itemId: targetId });
                } else if (targetType == 3) {//社区bbsid
                    $state.go('bbs', { bbsId: targetId });
                }
             }
            /*跳转“个人信息页面”*/
            $scope.goToCustomer = function () {
                $state.go('customer');
            }
            //跳转到搜索页面
            $scope.goToSearch = function () {
                $state.go('willSearch');
            }
            $scope.baseUrl = appConfig.server.getUrl();
            //跳转到首页
            $scope.goHome = function () {
                $state.go('menu.home');
            }
            /*（点击底部菜单）跳转“入住”*/
            $scope.goCheckinto = function () {
                // $state.go('communityList');
                console.log("跳转到入住");
            }
            /*（点击底部菜单）跳转“社区”*/
            $scope.goCommunity = function () {
                $state.go('menu.communityList');
            }
            //    //下拉加载更多
            var vm = $scope.vm = {
                categoryId:1,
                moredata: false,
                list: [],
                pageNo:0,
                pageSize:10,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = discoverSer.getList(vm.pageNo, vm.pageSize).then(
                  function (data) {
                      if (data.isSuccess) {
                          if (data.total != 0) {
                              $scope.dataShow = true;
                              $scope.msgShow = false;
                          } else {
                              $scope.dataShow = false;
                              $scope.msgShow = true;
                          }
                          vm.list = data.rows;
                          var total = data.total;
                          if (vm.pageNo * vm.pageSize > total || vm.pageNo * vm.pageSize == total) {
                              vm.moredata = true;
                              vm.pageNo = 0;
                          }
                          LoadingSvr.hide();
                          $scope.$broadcast('scroll.infiniteScrollComplete');
                      } else {
                          $scope.dataShow = false;
                          $scope.msgShow = true;
                      }
                    }
                  );
                }
            }

        }
    ]);