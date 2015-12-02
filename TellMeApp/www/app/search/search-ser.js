angular.module('tellme')
    .service('searchSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //全文搜索
        this.fullTextSearch = function (searchText) {
            var url = baseUrl + 'app/search/fullTextSearch.do';
            var searchDate = JSON.stringify({
                customerId:window.localStorage['userTel'],
                text: searchText
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { searchData: searchDate }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        //获取推荐酒店
        this.getRecommandHotels = function () {
            var url = baseUrl + 'app/hotel/getRecommandHotels.do';
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
    }]);