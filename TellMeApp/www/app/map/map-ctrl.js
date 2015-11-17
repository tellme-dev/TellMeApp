angular.module('tellme')
	.controller('mapCtrl', ['$scope', '$ionicPopup', '$stateParams', '$state', '$ionicHistory', '$window',function ($scope, $ionicPopup, $stateParams, $state, $ionicHistory, $window) {

	    var map = new BMap.Map("bmap");
	    var point = new BMap.Point(116.404, 39.915);
	    map.centerAndZoom(point, 15);
	    map.addControl(new BMap.ZoomControl());

	}])