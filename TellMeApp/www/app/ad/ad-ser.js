angular.module('tellme')
    .service('adSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //根据Id获取广告信息
        this.loadAdInfo = function (id, customerId) {
            var jsonData = JSON.stringify({
                id: id,
                customerId: customerId
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
        //获取广告评论
        this.getAdBbs=function (targetId) {
            var jsonData = JSON.stringify({
                 targetType:2,
                targetId: targetId
            });
            var url = baseUrl + 'app/ad/loadAdComment.do';
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
        //评论广告
        this.saveAdAnswer = function (jsonData) {
            var url = baseUrl + 'app/ad/saveAdComment.do';
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