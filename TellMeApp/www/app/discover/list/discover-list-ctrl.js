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

            /*返回前一个界面*/
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //跳转到发现详情
            $scope.goDetail = function () {
                $state.go('discover');
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
                $state.go('home');
            }
            /*（点击底部菜单）跳转“入住”*/
            $scope.goCheckinto = function () {
                // $state.go('communityList');
                console.log("跳转到入住");
            }
            /*（点击底部菜单）跳转“社区”*/
            $scope.goCommunity = function () {
                $state.go('communityList');
            }
            //    //下拉加载更多
            var vm = $scope.vm = {
                categoryId:1,
                moredata: false,
                typeDetail: [],
                pageNo:0,
                pageSize:10,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = discoverSer.getList(vm.pageNo, vm.pageSize).then(
                  function (data) {
                      if (data.isSuccess) {
                          vm.list = data.rows;
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
    ]);