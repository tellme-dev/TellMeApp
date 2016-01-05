angular.module('tellme')
    .service('homeSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //返回地址
        this.getUrl = function () {
            return baseUrl;
         }
        //获取头部广告
        this.getAdd = function () {
            var url = baseUrl + 'app/ad/getAdList.do';
            var addDataJSON = JSON.stringify({
                banner:'top',
                adNum:225
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {adParam:addDataJSON}
            }).success(
                function (data, status, headers, config) {
                   deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        //获取酒店滑动菜单
        this.getSwiperAd=function(){
            var url = baseUrl + 'app/menu/loadSwiperList.do ';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        //获取底部广告
        this.getFootAdd = function (adNum) {
            var url = baseUrl + 'app/ad/getAdList.do';
            var addDataJSON = JSON.stringify({
                banner: 'down',
                adNum: adNum
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { adParam: addDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

    }]);