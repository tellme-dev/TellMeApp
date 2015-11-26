angular.module('tellme')
    .service('customerSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        //登录
        this.login = function (loginData) {
            var url = baseUrl + 'app/customer/login.do';
            var loginDataJSON = JSON.stringify({
                mobile: loginData.username,
                psd: loginData.password
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { loginData: loginDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });            
            return deferred.promise;
        }
        //验证手机号是否注册
        this.verifyTel = function (mobile) {
            var url = baseUrl + 'app/customer/isExistByMobile.do';
            var mobileDataJSON = JSON.stringify({
                mobile: mobileme
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { mobile: mobileDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //注册
        this.register = function (registerData) {
            var url = baseUrl + 'app/customer/register.do';
            var registerDataJSON = JSON.stringify({
                mobile: registerData.mobile,
                psd: registerData.psd,
                verifyCode: registerData.verifyCode
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { registerData: registerDataJSON }
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