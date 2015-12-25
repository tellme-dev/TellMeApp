angular.module('tellme')
    .service('adSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //根据Id获取广告信息
        this.loadAdInfo = function (id) {
            var jsonData = JSON.stringify({
                id: id
            });
            var url = baseUrl + 'app/ad/loadAdById.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { adParam: jsonData }
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