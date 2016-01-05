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

        var promise = checkinSer.getCheckinInfo(window.localStorage['userId'], window.localStorage['adcode']);//6
        promise.then(
            function (data) {
                if (data.isSuccess) {
                    if (typeof (data.data) === 'undefined' && typeof (data.rows) !== 'undefined' && data.rows.length > 0) {//没有，则获得一个酒店列表
                        $scope.nearHotel = data.rows;
                    }
                } else {
                    popUpSer.showAlert('查询入住信息异常');
                }
            },
            function (data) {
                popUpSer.showAlert('查询入住信息异常');
            }
            );
    }])