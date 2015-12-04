angular.module('tellme')
    .service('adSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();

        //发帖
        this.addBbs = function (bbsInfo) {
            var url = baseUrl + 'app/bbs/saveBbs.do';
            var jsonData = JSON.stringify({
                id: 0,
                customerId: window.localStorage['userId'],
                bbsType: 1,
                postType: 0,
                targetType: 0,
                parentId: 0,
                title: bbsInfo.title,
                text: bbsInfo.text
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { bbsParam: jsonData }
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