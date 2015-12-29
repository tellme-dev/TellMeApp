angular.module('tellme')
    .controller('noCheckinControll', ['$scope', '$state', '$ionicHistory', 'checkinSer', function ($scope, $state,$ionicHistory, checkinSer) {
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('location');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            } else {
                $state.go('customer');
            }

        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('willSearch');
        }
    }])