angular.module('tellme')
    .service('doscoverSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        this.getList = function (pageNo, pageSize) {
            var jsonData = JSON.stringify({
                pageNo: pageNo,
                pageSize: pageSize
            });
            var url = baseUrl + 'app/ad/loadAdList.do';
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