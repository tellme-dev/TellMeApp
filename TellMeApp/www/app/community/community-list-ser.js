angular.module('tellme')
    .service('communitySer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //获取社区分类标签
        this.getCommunityType = function () {
            var url = baseUrl + 'app/bbs/loadBbsCategoryList.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url
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