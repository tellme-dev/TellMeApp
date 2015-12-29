angular.module('tellme')
    .controller('menuControll', ['$scope', '$state', function ($scope, $state) {
        $scope.home = function () {
            $state.go('menu.home');
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
                $state.go('menu.checkin');
            }            
        }
    }])