angular.module('tellme')
    .service('tellMeMapSvr', [function () {
      //根据关键字查找行政区域
       this.getCityDetail = function (cityName) {
            AMap.service(["AMap.DistrictSearch"], function () {
                var placeSearchOptions = { //构造地点查询类
                    level: "province",
                    extensions: "base",
                    subdistrict: 3 //城市
                };
                var districtSearch = new AMap.DistrictSearch(placeSearchOptions);
                districtSearch.search(cityName, function (state, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var cityInfo = result.districtList;
                        alert("sfdsd:" + cityInfo);
                    }
                })
            })
       }
      
        //定位当前所在城市
       var  updateCurrentcity = function(){
            AMap.service(["AMap.CitySearch"], function () {
                //实例化城市查询类
                var citysearch = new AMap.CitySearch();
                citysearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.city && result.bounds) {
                            cityinfo = result.city;
                            var center = result.bounds.getCenter();
                            var lat = center.lat;
                            var lng = center.lng;
                            var lnglatXY = [lng, lat]; //已知点坐标
                            window.localStorage['currentcity'] = cityinfo;
                            AMap.service('AMap.Geocoder', function () {
                                var geocoder = new AMap.Geocoder({
                                    radius: 1000,
                                    extensions: "all"
                                });
                                geocoder.getAddress(lnglatXY, function (status, result) {
                                    //  alert("经纬度：" + lnglatXY);
                                    if (status === 'complete' && result.info === 'OK') {
                                        var address = result.regeocode.formattedAddress; //返回地址描述
                                        var cityInfo = result.regeocode.addressComponent;
                                        var str = "省：" + cityInfo.province + ",市：" + cityInfo.city + ",区：" + cityInfo.district + ",code:" + cityInfo.adcode;
                                        console.log("定位信息：" + str + "    " + address);
                                        window.localStorage['currentcity'] = cityInfo.city;
                                        window.localStorage['adcode'] = cityInfo.adcode;
                                    }
                                });
                            })
                        }
                    }
                });
            });
        }
        //根据经纬度查找地址信息
        this.getDistrict = function () {
            var geolocation;
            AMap.service('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation();
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
                          //  alert("经纬度：" + lnglatXY);
                            if (status === 'complete' && result.info === 'OK') {
                                var address = result.regeocode.formattedAddress; //返回地址描述
                                var cityInfo = result.regeocode.addressComponent;
                                var str = "省：" + cityInfo.province + ",市：" + cityInfo.city + ",区：" + cityInfo.district + ",code:" + cityInfo.adcode;
                                console.log("定位信息：" + str + "    " + address);
                               // alert("定位信息：" + str + "    " + address);
                                window.localStorage['currentcity'] = cityInfo.city;
                                window.localStorage['adcode'] = cityInfo.adcode;
                            } else {
                               updateCurrentcity();
                            }
                        });
                    })
                });
                AMap.event.addListener(geolocation, 'error', function () {//解析定位错误信息
                    alert("定位失败");
                });
            });
        }
    }])