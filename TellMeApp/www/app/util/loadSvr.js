angular.module('tellme')
.service('LoadingSvr', ['$ionicLoading', '$timeout', function ($ionicLoading, $timeout) {
    this.show = function () {
        $ionicLoading.show({
            template: '努力加载中'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 5000);
    }
    this.hide = function () {
        $ionicLoading.hide();
    }
    this.goShare = function () {
        $ionicLoading.show({
            template: '跳转分享中'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 5000);
    }
}])