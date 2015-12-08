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
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        targetId: id, praiseType: 0, customerId: window.localStorage['userId']
                    });
                    //   var promise = communitySer.agreeBbs(jsonData).then
                    var promise = commonSer.saveAgree(jsonData).then(
                      function (data) {
                          if (data.isSuccess) {
                             // vm.loadMore();
                              console.log("点赞成功");
                          } else {
                              console.log(data.msg);
                          }
                      },
                      function (data) {
                          console.log('其他');
                      }
                      );
                } else {
                    $state.go('login', { pageName: 'hotelItem' });
                }
            }
            //收藏
            $scope.toSaveCollection = function (id) {
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        customerId: window.localStorage['userId'], collectionType: 3, targetId: id
                    });
                    var promise = commonSer.saveCollectionHistory(jsonData).then(
                  function (data) {
                      if (data.isSuccess) {
                          vm.loadMore();
                          console.log('收藏成功');
                      } else {
                          alert(data.msg);
                          console.log(data.msg);
                      }
                  },
                  function (data) {
                      console.log('其他');
                  }
                  );
                } else {
                    $state.go('login', { pageName: 'hotelItem' });
                }
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
            //判断用户是否登录
            $scope.userIsLogin = function () {
                var mobile = window.localStorage['userTel'];
                if (mobile == undefined || mobile == "") {//如果用户未登录跳转到登录页面
                    return false;
                } else {
                    return true;
                }
            }
        }]);