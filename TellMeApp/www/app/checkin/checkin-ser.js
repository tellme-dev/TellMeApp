angular.module('tellme')
    .service('checkinSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //根据酒店id获取酒店的广告
        this.getAds = function (hotelId) {
            var url = baseUrl + 'app/ad/loadAdListByHotelId.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {
                    adParam: JSON.stringify({
                        hotelId: hotelId
                    })
                }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        //查看用户是否有入住信息
        this.getCheckinInfo = function (customerId,regionId) {
            var url = baseUrl + 'app/ad/loadAdListByHotelId.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {
                    adParam: JSON.stringify({
                        hotelId: hotelId
                    })
                }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }])