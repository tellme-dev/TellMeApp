angular.module('tellme')
    .controller('homeControll', ['$scope', '$state', function ($scope, $state) {
        /*首页初始化*/
        // 获取当前位置
        $scope.getCity = function () {
            //加载城市查询插件
            AMap.service(["AMap.CitySearch"], function () {
                //实例化城市查询类
                var citysearch = new AMap.CitySearch();
                //自动获取用户IP，返回当前城市
                citysearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.city && result.bounds) {
                            var cityinfo = result.city;
                            console.log('当前城市：' + cityinfo);
                        }
                    }
                });
            });
        }

        //广告（头部广告、底部专栏）动态加载
        //菜单先查询本地是否有保存，没有，动态加载；有，在家本地数据；
        //加载用户头像


        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('map/location');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            $state.go('customer/center');
        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('');
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