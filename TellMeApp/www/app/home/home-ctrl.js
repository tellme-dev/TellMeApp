angular.module('tellme')
    .controller('homeControll', ['$scope', '$state', function ($scope, $state) {
        /*首页初始化*/
        //广告（头部广告、底部专栏）动态加载
        //菜单先查询本地是否有保存，没有，动态加载；有，在家本地数据；
        //加载用户头像


        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('home');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            $state.go('home');
        }
        /*（点击菜单项）跳转“酒店列表”*/
        $scope.goToHotelList = function (param) {
        }
        /*（点击头部广告）跳转“具体广告”*/
        $scope.goToAd = function (param) {

        }
        /*（点击专题）跳转“具体专题”*/
        $scope.goToTheme = function (param) {

        }
    }]);