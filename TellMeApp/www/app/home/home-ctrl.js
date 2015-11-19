angular.module('tellme')
    .controller('homeControll', ['$scope', '$state', function ($scope, $state) {
       // console.log('当前城市：');
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
        //跳转到更多城市
        $scope.toCities = function () {
            $state.go('map/location');
        }
        //跳转到用户中心
        $scope.toCustomerCenter = function () {
            $state.go('customer/center');
        }
        //跳转到搜索页面
        $scope.toSearch = function () {
            $state.go('');
        }
        //获取广告图片
    }])