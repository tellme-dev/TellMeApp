angular.module('tellme')
    .controller('startControll', ['$scope', '$state', '$ionicSlideBoxDelegate', '$ionicHistory', 'appConfig', 'tellMeMapSvr', 'commonSer', function ($scope, $state, $ionicSlideBoxDelegate, $ionicHistory, appConfig, tellMeMapSvr, commonSer) {
        $scope.baseUrl = appConfig.server.getUrl();

        tellMeMapSvr.updateCurrentcity();
        commonSer.updateRegionInfo();

        $scope.startImages = [
            {
            index:1,
            imageUrl:"images/startPage/start1.png"
            }, {
                index: 2,
                imageUrl: "images/startPage/start2.png"
            }, {
                index: 3,
                imageUrl: "images/startPage/start3.png"
            }
            ];
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
        //跳转到首页
        $scope.goToHome = function () {
            $state.go('menu');
        }
    }]);