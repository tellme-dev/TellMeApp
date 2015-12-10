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
                $state.go('menu.home');
            }
            $scope.goDiscover = function () {
                $state.go('menu.discoverList');
            }
                /*（点击底部菜单）跳转“社区”*/
            $scope.goCommunity = function () {
                $state.go('menu.communityList');
            }
            //跳转到系统设置
            $scope.goSystem = function () {
                $state.go('system');
            }
            //跳转到评论
            $scope.goDiscuss = function () {
                $state.go('discuss');
            }
            //跳转到赞
            $scope.goAgree = function () {
                $state.go('agree');
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
            $scope.selectedIndex = 1;
            $scope.showTabs = function (index) {
                $scope.selectedIndex = index;
            }
      
    }]);