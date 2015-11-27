angular.module('tellme')
    .controller('startControll', ['$scope', '$ionicSlideBoxDelegate', 'appConfig', function ($scope, $ionicSlideBoxDelegate, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();

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
    }]);