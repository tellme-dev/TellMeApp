angular.module('tellme')
    .service('tellMeMapSvr', [function () {
        this.updateCurrentcity = function(){
            AMap.service(["AMap.CitySearch"], function () {
                //实例化城市查询类
                var citysearch = new AMap.CitySearch();
                citysearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.city && result.bounds) {
                            cityinfo = result.city;
                            window.localStorage['currentcity'] = cityinfo;
                            //window.localStorage['regionId'] = 
                            console.log('更新当前城市：' + cityinfo);
                        }
                    }
                });
            });
        }
    }])