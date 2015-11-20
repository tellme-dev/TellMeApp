angular.module('tellme')
	.controller('mapControll', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window',function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window) {

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

	}])