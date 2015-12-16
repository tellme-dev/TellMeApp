/*消息推送服务*/
angular.module('tellme')
    .service('commonSer', ['$http', '$q', '$window', 'appConfig', function ($http, $q,$window, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        /**
        *ngdoc:
        *name:
        *description
        *保存浏览记录
        *param {number} targetType  目标类型
        *param {number} targetId    目标id
        *return null
        */

        this.saveTrack = function (targetType, targetId) {
            
        };

        /**
        *ngdoc:
        *name:
        *description
        *保存点赞
        *param {number} targetType  目标类型
        *param {number} targetId    目标id
        *return {bool}  是否成功
        */
        this.saveAgree = function (saveData) {
            var url = baseUrl + 'app/customer/savePraiseHistory.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: saveData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        /**
        *ngdoc:
        *name:
        *description
        *保存评分
        *param {number} targetType  目标类型
        *param {number} targetId    目标id
        *param {number} score       分数
        *return 是否成功
        */
        this.saveGrade = function (targetType, targetId,score) {

        };
        /**
        *ngdoc:
        *name:
        *description                 获取短信验证服务
        *param      {String} mobile  电话号码
        *return     {bool}           是否成功
        */
        this.sendSMS = function (mobile) {
            var url = baseUrl + 'app/customer/sendSMSVerificationCode.do?mobile=' + mobile;
            var deferred = $q.defer();
            $http.post(url)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };
    //保存收藏
        this.saveCollectionHistory = function (saveData) {
            var url = baseUrl + 'app/customer/saveCollectionHistory.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: saveData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        this.getHotSearchRegions = function () {

        }
        this.getHistoricRegions = function () {

        }
        this.updateRegionInfo = function () {
            var url = baseUrl + 'app/region/getRegionInfo.do';
            var deferred = $q.defer();
            var customerIdJson = JSON.stringify(
                {
                    customerId: window.localStorage['userId']
                });
            $http({
                method: 'post',
                url: url,
                data: { customerId: customerIdJson }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                    
                    window.localStorage['hotSearchCities'] = (typeof (data.data.hotAndNearRegions) == 'undefined') ? "" : angular.toJson(data.data.hotAndNearRegions);
                    window.localStorage['historicCities'] = (typeof (data.data.historicRegions) == 'undefined') ? "" : angular.toJson(data.data.historicRegions);
                    window.localStorage['regionlist'] = (typeof (data.data.allRegions) == 'undefined') ? "" : angular.toJson(data.data.allRegions);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        
    }]);