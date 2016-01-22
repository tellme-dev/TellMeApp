angular.module('tellme')
    .controller('menuControll', ['$scope', '$state', 'popUpSer', 'checkinSer', 'customerSer', function ($scope, $state, popUpSer, checkinSer, customerSer) {
        $scope.home = function () {
            $state.go('menu.home');
        }
        var customerId = window.localStorage['userId'];
        if (customerId == "" || customerId == undefined) {
            customerId = 0;
        }
        $scope.customer = function () {
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'menu.customer' });
            } else {
                var promise = customerSer.getCustomerAlways(customerId, 1, 5);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            $state.go('menu.customer');
                        } else {
                            console.log(data.msg);
                            popUpSer.showAlert("查询信息异常");
                        }
                    }, function (data) {
                        popUpSer.showAlert("查询信息异常");
                    }
                  );
            }
        }
        $scope.discovery = function () {
            $state.go('menu.discoverList');
        }
        $scope.community = function () {
            $state.go('menu.communityList');
        }
        $scope.checkin = function () {
            //判断是否登录
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {//如果用户未登录，跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            } else {
                var promise = checkinSer.getCheckinInfo(window.localStorage['userId'], window.localStorage['adcode']);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            if (typeof (data.data) === 'undefined' && typeof (data.rows) !== 'undefined' && data.rows.length > 0) {//没有，则获得一个酒店列表
                                $state.go('nocheckin');
                            } else if (typeof (data.data) !== 'undefined' && typeof (data.rows) === 'undefined') {//有，则获取入住的相关内容
                                $state.go('menu.checkin');
                            } else {
                                $state.go('nocheckin');
                            }

                        } else {
                            popUpSer.showAlert('查询入住信息异常');
                        }
                    },
                    function (data) {
                        popUpSer.showAlert('查询入住信息异常');
                    }
                    );
            }
        }

   }])