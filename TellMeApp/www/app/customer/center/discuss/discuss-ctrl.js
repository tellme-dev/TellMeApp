﻿angular.module('tellme')
    .controller('discussControll', ['$scope', '$ionicHistory', '$ionicActionSheet', '$state', 'customerSer', 'LoadingSvr', 'popUpSer',
        function ($scope, $ionicHistory, $ionicActionSheet, $state, customerSer, LoadingSvr, popUpSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            $scope.baseUrl = customerSer.host;

           // $(".zxx_text_overflow_3").wordLimit(15);
            $(".pl-text-s").click(function () {
            $(".zxx_text_overflow_3").wordLimit(100);
            })
            var customerId = 0;
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {
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
            $scope.goAnswer = function (bbsId,targetType,path) {
                $state.go('answerBbs', { bbsId: bbsId,targetType:targetType,path:path });
            }
            $scope.goBBs = function (bbsId) {
                $state.go('bbs', { bbsId: bbsId });
            }
            //下拉加载更多 获取个人中心动态评论数据列表
            var vm = $scope.vm = {
                moredata: false,
                pageNo: 0,
                listData: [],
                pageSize: 10,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = customerSer.customerDynamicComments(customerId, vm.pageNo, vm.pageSize).then(
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
                          if (vm.pageNo >= total) {
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