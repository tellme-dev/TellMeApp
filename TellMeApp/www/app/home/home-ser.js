angular.module('tellme')
    .service('homeSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //返回地址
        this.getUrl = function () {
            return baseUrl;
         }
        //获取广告
        this.getAdd = function () {
            var url = baseUrl + 'app/ad/getAdList.do';
            var addDataJSON = JSON.stringify({
                banner:'top',
                adNum:2
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
                    deferred.reject(5);
                });
            return deferred.promise;
         }
    }]);