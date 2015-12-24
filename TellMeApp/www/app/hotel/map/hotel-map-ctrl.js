angular.module('tellme')
    .controller('hotelmapControll', ['$scope', '$stateParams', '$ionicHistory', function ($scope, $stateParams, $ionicHistory) {
        $scope.hotelId = $stateParams.hotelId;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        //var x = document.getElementById("result");
        //$scope.getLocation = function () {
        //    if (navigator.geolocation) {  //判断是否支持地理定位
        //        //如果支持，则运行getCurrentPosition()方法。
        //        alert("定位成功" );
        //        navigator.geolocation.getCurrentPosition(function (position) {
        //            alert("获取经纬度：" + "Latitude: " + position.coords.latitude +
        //             "<br>Longitude: " + position.coords.longitude);
        //            x.innerHTML = "Latitude: " + position.coords.latitude +
        //             "<br>Longitude: " + position.coords.longitude;
        //            alert("定位：" + x.innerHTML);
        //        });
        //    } else {
        //        //如果不支持，则向用户显示一段消息
        //        alert("定位失败");
        //        x.innerHTML = "Geolocation is not supported by this browser.";
        //    }
        //}
       
        //加载地图，调用浏览器定位服务
        //map = new AMap.Map('container', {
        //    resizeEnable: true,
        //    zoom: 18
        //});
        //var lnglatXY;
        $scope.t=function(){
        var geolocation;
        AMap.service('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation();
          //  map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', function (data) { //解析定位结果
                var Lng = data.position.getLng();
                var lat = data.position.getLat();
               var lnglatXY = [Lng, lat]; //已知点坐标
               AMap.service('AMap.Geocoder', function () {
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress(lnglatXY, function (status, result) {
                        alert("经纬度："+lnglatXY);
                        if (status === 'complete' && result.info === 'OK') {
                            var address = result.regeocode.formattedAddress; //返回地址描述
                            var cityInfo = result.regeocode.addressComponent;
                            var str = "省：" + cityInfo.province + ",市：" + cityInfo.city + ",区：" + cityInfo.district + ",code:" + cityInfo.adcode;
                            console.log("定位信息：" + result);
                            document.getElementById("result").innerHTML = str + "    " + address;
                        }
                    });
                    //var marker = new AMap.Marker({  //加点
                    //    map: map,
                    //    position: lnglatXY
                    //});
                    //map.setFitView();
                })
            });//返回定位信息
            AMap.event.addListener(geolocation, 'error', function () {//解析定位错误信息
                alert("定位失败");
            });  
        });
        }


        //显示地图
        //var marker, map = new AMap.Map("container", {
        //    resizeEnable: true,
        //    center: [104.056122, 30.586613],
        //     zoom: 11
        //});
        //var lng = e.point.lng;
        //var lat = e.point.lat;104.056122,30.586613
     
       //var marker = new AMap.Marker({
       //    // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
       //    position: [104.056122, 30.586613]
       // });
       // marker.setMap(map);
    }]);