angular.module('tellme')
    .controller('hotelmapControll', ['$scope', '$stateParams', '$ionicHistory', function ($scope, $stateParams, $ionicHistory) {
        $scope.hotelId = $stateParams.hotelId;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        //显示地图
        var marker, map = new AMap.Map("container", {
            resizeEnable: true,
            center: [104.056122, 30.586613],
             zoom: 11
        });
        //var lng = e.point.lng;
        //var lat = e.point.lat;104.056122,30.586613
     
       var marker = new AMap.Marker({
           // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
           position: [104.056122, 30.586613]
        });
        marker.setMap(map);
    }]);