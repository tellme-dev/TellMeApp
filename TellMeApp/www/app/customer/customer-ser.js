angular.module('tellme')
    .service('customerSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();

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
        this.register = function () {
            var url = baseUrl + 'app/customer/register.do';
            var loginDataJSON = JSON.stringify({
                mobile: "18780173759",
                psd: "123456",
                verifyCode:"1234"
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { registerData: loginDataJSON }
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