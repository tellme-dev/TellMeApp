﻿angular.module('tellme')
    .service('hotelSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        this.hostUrl = baseUrl;

        //获取1级菜单
        this.getRootMenu = function () {
            var url = baseUrl + 'app/menu/loadMenuRootList.do';
            var getDataJSON = JSON.stringify({
                position: "hotelList"
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取2级菜单
        this.getChildMenu = function (itemTagId) {
            var url = baseUrl + 'app/menu/loadMenuChildList.do';
            var getDataJSON = JSON.stringify({
                itemTagId: itemTagId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取酒店列表数据
        this.getItemList = function (page, pageSize, itemTagId) {
            var url = baseUrl + 'app/hotel/itemListByTagChild.do';
            var getDataJSON = JSON.stringify({
                pageNumber: page,
                pageSize:pageSize,
                itemTagId: itemTagId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //收藏项目
        this.saveCollection = function (customerId, targetId) {
            var url = baseUrl + 'app/customer/saveCollectionHistory.do';
            var getDataJSON = JSON.stringify({
                collectionType: 1,
                customerId: customerId,
                targetId: targetId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取标签信息
        this.getItemInfo= function (itemTagId) {
            var url = baseUrl + 'app/menu/loadItemTag.do ';
            var getDataJSON = JSON.stringify({
                itemTagId: itemTagId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        // xxq
        this.getHotelListByItem = function (itemId, pageNumber, pageSize) {
            var url = baseUrl + 'app/hotel/hotelListByItem.do ';
            var getDataJSON = JSON.stringify({
                itemTagId: itemId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
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