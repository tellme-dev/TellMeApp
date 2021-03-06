﻿angular.module('tellme')
    .service('bbsSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //获取单个BBS内容
        this.getBBs = function (bbsId, customerId) {
            var url = baseUrl + 'app/bbs/loadBbs.do';
            var jsonData = JSON.stringify({
                id: bbsId,
                customerId: customerId
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
        //获取单个BBS回复详细内容
        this.bbsDeatil = function (bbsId, pageNo, pageSize) {
            var url = baseUrl + 'app/bbs/loadBbsChildren.do';
            var jsonData = JSON.stringify({
                id: bbsId,
                pageNo: pageNo,
                pageSize: pageSize
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
        //发帖
        this.saveBbs = function (bbsInfo) {
            var url = baseUrl + 'app/bbs/saveBbs.do';
            var jsonData = JSON.stringify({
                id: 0,
                uuid:bbsInfo.uuid,
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
        //删除图片 不发表点返回的时候也要删除
        this.deletePhoto = function (param) {
            var url = baseUrl + 'app/bbs/deletePhoto.do';
            var jsonData = JSON.stringify({
                fileUrl: param.imageUrl,
                uuid:param.uuid
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { param: jsonData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取图片
        this.loadImageByBbsId = function (bbsId) {
            var url = baseUrl + 'app/bbs/loadImageByBbsId.do';
            var jsonData = JSON.stringify({
                bbsId: bbsId
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