angular.module('tellme')
    .service('bbsSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        this.baseUrl = appConfig.server.getUrl();
        ////获取单个BBS内容
        //this.getBBs = function (bbsId) {
        //    var url = baseUrl + 'app/bbs/loadBbs.do';
        //    var jsonData = JSON.stringify({
        //        id: bbsId
        //    });
        //    var deferred = $q.defer();
        //    $http({
        //        method: 'post',
        //        url: url,
        //        data: { bbsParam: jsonData }
        //    }).success(
        //        function (data, status, headers, config) {
        //            deferred.resolve(data);
        //        }).error(
        //        function (data, status, headers, config) {
        //            deferred.reject(5);
        //        });
        //    return deferred.promise;
        //}
        ////获取单个BBS回复详细内容
        //this.bbsDeatil = function (bbsId, pageNo, pageSize) {
        //    var url = baseUrl + 'app/bbs/loadBbsChilden.do';
        //    var jsonData = JSON.stringify({
        //        categoryId: categoryId,
        //        pageNo: pageNo,
        //        pageSize:pageSize
        //    });
        //    var deferred = $q.defer();
        //    $http({
        //        method: 'post',
        //        url: url,
        //        data: { bbsParam: jsonData }
        //    }).success(
        //        function (data, status, headers, config) {
        //            deferred.resolve(data);
        //        }).error(
        //        function (data, status, headers, config) {
        //            deferred.reject(5);
        //        });
        //    return deferred.promise;
        //}

    }]);