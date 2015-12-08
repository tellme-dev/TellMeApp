angular.module('tellme')
    .controller('hotelItemControll', ['$scope', '$ionicHistory', '$stateParams', '$ionicHistory', 'hotelSer', 'commonSer', 'appConfig', 'LoadingSvr',
        function ($scope, $ionicHistory, $stateParams, $ionicHistory, hotelSer, commonSer, appConfig, LoadingSvr) {
            var itemId = $stateParams.itemId;
            $scope.baseUrl = appConfig.server.getUrl();
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //点赞
            $scope.toSaveAgree = function (id) {
     
            }
            //收藏
            $scope.toSaveCollection = function (id) {

            }
            //下拉加载更多 根据标签获取酒店列表
            var vm = $scope.vm = {
                moredata: false,
                pageNo: 0,
                listData: [],
                pageSize: 3,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = hotelSer.getHotelListByItem(itemId, vm.pageNo).then(
                  function (data) {
                      if (data.isSuccess) {
                          if (data.total != 0) {
                              $scope.dataShow = true;
                              $scope.msgShow = false;
                          } else {
                              $scope.dataShow = false;
                              $scope.msgShow = true;
                          }
                          vm.listData = data.rows;
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

        }]);