angular.module('tellme')
    .service('communitySer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //获取社区分类标签//http://192.168.1.113:8080/TellMeMgr/app/bbs/loadBbsCategoryList.do
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
        ////根据获取社区分类标签内容 categoryId分类标签ID
        //this.getTypeDetail = function (categoryId, pageNo,pageSize) {
        //    var jsonData= JSON.stringify({
        //        categoryId: categoryId,
        //        pageNo: pageNo,
        //        pageSize: pageSize
        //    });
        //    var url = baseUrl + 'app/bbs/loadBbsList.do';
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
        ////回帖
        //this.answerBbs = function (bbsParam) {
        //    var url = baseUrl + 'app/bbs/saveBbs.do';
        //    var deferred = $q.defer();
        //    $http({
        //        method: 'post',
        //        url: url,
        //        data: { bbsParam: bbsParam }
        //    }).success(
        //        function (data, status, headers, config) {
        //            deferred.resolve(data);
        //        }).error(
        //        function (data, status, headers, config) {
        //            deferred.reject(5);
        //        });
        //    return deferred.promise;
        //}
        ////点赞
        //this.agreeBbs = function (bbsParam) {
        //    var url = baseUrl + 'app/bbs/saveBbs.do';
        //    var deferred = $q.defer();
        //    $http({
        //        method: 'post',
        //        url: url,
        //        data: { bbsParam: bbsParam }
        //    }).success(
        //        function (data, status, headers, config) {
        //            deferred.resolve(data);
        //        }).error(
        //        function (data, status, headers, config) {
        //            deferred.reject(5);
        //        });
        //    return deferred.promise;
        //}
        ////收藏
        //this.collectionBbs = function (bbsParam) {
        //    var url = baseUrl + 'app/customer/collectBbs.do';
        //    var deferred = $q.defer();
        //    $http({
        //        method: 'post',
        //        url: url,
        //        data: { bbsParam: bbsParam }
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