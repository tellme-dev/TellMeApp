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
        this.saveAgree = function (targetType, targetId) {

        };

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
        

    }]);