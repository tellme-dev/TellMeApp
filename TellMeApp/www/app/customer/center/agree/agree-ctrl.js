angular.module('tellme')
    .controller('agreeControll', ['$scope', '$ionicHistory', '$ionicActionSheet', 'customerSer', 'LoadingSvr', 'popUpSer',
        function ($scope, $ionicHistory, $ionicActionSheet, customerSer, LoadingSvr, popUpSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
          //  $(".zxx_text_overflow_3").wordLimit(20);
              var customerId = 0;
                if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel']==""){
                    $state.go('login', { pageName: 'customer' }); 
            } else {
                  customerId = window.localStorage['userId'];
                }
                $scope.getCustomerInfo = function () {
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
                $scope.getCustomerInfo();
            //下拉加载更多 获取个人中心动态点赞数据列表
            var vm = $scope.vm = {
                moredata: false,
                pageNo: 0,
                listData: [],
                pageSize: 10,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = customerSer.customerDynamicPraise(customerId, vm.pageNo, vm.pageSize).then(
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
                          var total = data.total;//总的页数
                          if (vm.pageNo>= total) {
                              vm.moredata = true;
                              vm.pageNo = 0;
                         } 
                      } else {
                          $scope.dataShow = false;
                          $scope.msgShow = true;
                      }
                    } 
                  );
                    LoadingSvr.hide();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }
            vm.loadMore();
        }]);