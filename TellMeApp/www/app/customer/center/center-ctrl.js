angular.module('tellme')
    .controller('customerCenterControll', ['$scope', '$window','$state',
        function ($scope, $window, $state) {
        /*返回前一个界面*/
        $scope.$window = $window;
        $scope.goBack = function () {
            $window.history.back();
        };
            //判断用户是否登录
        if (window.localStorage['usertel'] == undefined || window.localStorage['usertel'] == "") {//如果用户未登录跳转到登录页面
            console.log("该用户未登录");
            $state.go('login');
        } else {
            console.log("该用户已登录");
        }
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