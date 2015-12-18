angular.module('tellme')
    .controller('rcuControll', ['$rootScope', "$scope",'$ionicHistory', "$stateParams", "$q", "$location", "$window", '$timeout', function ($rootScope, $scope,$ionicHistory, $stateParams, $q, $location, $window, $timeout) {
        $scope.tabs = [
            { "text": "灯控" },
            { "text": "空调" },
            { "text": "窗帘" },
            { "text": "服务" },
        ];
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
    }])
