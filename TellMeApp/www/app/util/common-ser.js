/*消息推送服务*/
angular.module('tellme')
    .service('commonSer', '$http', 'appconfig'[function ($http,appConfig) {
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

        

    }])