angular.module('tellme')
    .controller('customerCenterControll', ['$scope', '$window', '$state', '$ionicHistory', 'customerSer',
        function ($scope, $window, $state, $ionicHistory, customerSer) {

            $scope.customer = {};
            $scope.hotels = new Array();
            $scope.host = customerSer.host;

            //判断用户是否登录
            if (typeof (window.localStorage['userTel']) == 'undefined') {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            }
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            $scope.goHome = function () {
                $state.go('home');
            }
            $scope.goDiscover = function () {
                $state.go('discoverList');
            }
                /*（点击底部菜单）跳转“社区”*/
            $scope.goCommunity = function () {
                $state.go('communityList');
            }
        
            $scope.getCustomerInfo = function () {
                //默认值
                var customerId = 1;
                if (typeof (window.localStorage['userId']) != 'undefined') {
                    customerId = window.localStorage['userId'];
                }
                var promise = customerSer.getCustomerInfo(customerId);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            $scope.customer = data.data;
                        } else {
                            alert(data.msg);
                        }
                    },
                    function (data) {
                        console.log('其他');
                    }
                    );
            }

            $scope.getCustomerAlways = function () {
                //默认值
                var customerId = 1;
                var pageNumber = 1;
                if (typeof (window.localStorage['userId']) != 'undefined') {
                    customerId = window.localStorage['userId'];
                }
                var promise = customerSer.getCustomerAlways(customerId, pageNumber);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            $scope.hotels = data.rows;
                        } else {
                            alert(data.msg);
                        }
                    },
                    function (data) {
                        console.log('其他');
                    }
                    );
            }

            $scope.getCustomerInfo();
        //customerSer
        
      //  $scope.selectedI = 0;
      //  $scope.b = [
      //{ name: "KTV",id:0},
      //{ name: "游泳馆", id: 1 },
      //{ name: "SPA", id: 2 },
      //{ name: "温泉", id: 3 },
      //{ name: "各类球场", id: 4 },
      //{ name: "健身房", id: 5 }
      //  ];
      //  $scope.c = [
      //    { name: "KTV1" },
      //    { name: "KTV2" },
      //    { name: "KTV2" }
         
      //  ];
      //  $scope.selectRestaurant = function (index) {
           
      //      if (index == 1) {
      //          $scope.selectedI = 1;
      //          $scope.c = [
      //            { name: "游泳馆1" },
      //            { name: "游泳馆2" },
      //            { name: "游泳馆2" }

      //          ];
      //      }
      //      else if (index == 2) {
      //          $scope.selectedI = 2;
      //          $scope.c = [
      //            { name: "温泉1" },
      //            { name: "温泉2" },
      //            { name: "温泉3" }
      //          ];
      //      } else {
      //          $scope.selectedI = 3;
      //          $scope.c = [
      //                           { name: "温泉1" },
      //                           { name: "温泉2" },
      //                           { name: "温泉3" }
      //          ];
      //      }
      //  }
      //  $scope.t = function () {
      //      $scope.c = [
      //                          { name: "温泉1" },
      //                          { name: "温泉2" },
      //                          { name: "温泉3" }
      //      ];
      //  }
    }]);