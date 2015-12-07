angular.module('tellme')
    .service('systemSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        this.hostUrl = baseUrl;

    }]);