angular.module('tellme')
    .service('customerSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        this.host = baseUrl;
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
        // 判断一个用户是否已经存在(通过电话号码)
        this.verifyTel = function (mobile) {
            var url = baseUrl + 'app/customer/isExistByMobile.do';
            var verifyData = JSON.stringify({
                mobile: mobile
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { mobile: verifyData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        // 用户注册接口
        this.register = function (registerData) {
            var url = baseUrl + 'app/customer/register.do';
            var registerDataJSON = JSON.stringify({
                mobile: registerData.mobile,
                psd: registerData.psd,
                verifyCode:registerData.verifyCode
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
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        //获取用户信息
        this.getCustomerInfo = function (customerId) {
            var url = baseUrl + 'app/customer/getCustomerInfo.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId
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

        //获取用户信息
        this.getCustomerAlways = function (customerId, pageNumber) {
            var url = baseUrl + 'app/customer/getCustomerAlways.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber
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