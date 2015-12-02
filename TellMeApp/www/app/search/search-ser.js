angular.module('tellme')
    .service('searchSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //对酒店全文搜索
        this.fullTextSearchOfHotel = function (searchText) {
            var url = baseUrl + 'app/hotel/fullTextSearchOfHotel.do';
            var searchData = JSON.stringify({
                customerId: window.localStorage['userId'],
                text: searchText
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { searchData: searchData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        //对帖子全文搜索
        this.fullTextSearchOfBbs = function (searchText) {
            var url = baseUrl + 'app/bbs/fullTextSearchOfBbs.do';
            var searchData = JSON.stringify({
                customerId: window.localStorage['userId'],
                text: searchText
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { searchData: searchData }
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