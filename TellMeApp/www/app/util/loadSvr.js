angular.module('tellme')
.service('LoadingSvr', ['$ionicLoading', '$timeout', function ($ionicLoading, $timeout) {
    this.show = function () {
        $ionicLoading.show({
            template: '努力加载中'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 1000);
    }
    this.load = function () {
        $ionicLoading.show({
            template: '图片正在上传'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 20000);
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