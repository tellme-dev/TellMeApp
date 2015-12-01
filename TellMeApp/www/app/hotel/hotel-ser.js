angular.module('tellme')
    .service('hotelSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        this.hostUrl = baseUrl;

        //获取1级菜单
        this.getRootMenu = function () {
            var url = baseUrl + 'app/menu/loadMenuRootList.do';
            var getDataJSON = JSON.stringify({
                position: "hotelList"
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }

        //获取2级菜单
        this.getChildMenu = function (itemTagId) {
            var url = baseUrl + 'app/menu/loadMenuChildList.do';
            var getDataJSON = JSON.stringify({
                itemTagId: itemTagId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }

        //获取酒店列表数据
        this.getHotelList = function (itemTagId) {
            var url = baseUrl + 'app/menu/loadMenuChildList.do';
            var getDataJSON = JSON.stringify({
                itemTagId: itemTagId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
    }]);