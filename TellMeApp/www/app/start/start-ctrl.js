angular.module('tellme')
    .controller('startControll', ['$scope', '$state', '$ionicSlideBoxDelegate', '$ionicHistory', '$ionicGesture', 'appConfig', 'tellMeMapSvr', 'commonSer', function ($scope, $state, $ionicSlideBoxDelegate, $ionicHistory, $ionicGesture, appConfig, tellMeMapSvr, commonSer) {
        $scope.baseUrl = appConfig.server.getUrl();

        tellMeMapSvr.getDistrict();
        commonSer.updateRegionInfo();
        //$scope.slideHasChanged = function (index) {
        //    if (index == $scope.startImages.length - 1) {
        //        $ionicSlideBoxDelegate.$getByHandle(index).stop();
        //    }
        //}

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
        //var element = angular.element(document.querySelector('#slide2'));
        //$ionicGesture.on('dragleft', function (event) {
        //    alert('hello');
        //}, element);
        

        $scope.slideHasChanged = function (index) {
            
            if (index == 2) {
                $timeout(function () {
                    $ionicSlideBoxDelegate.$getByHandle('slide2').stop();
                }, 3000);
                //$ionicSlideBoxDelegate.enableSlide(false);
                
            }
        }
        
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
        //跳转到首页
        $scope.goToHome = function () {
            $state.go('menu');
        }
    }]);