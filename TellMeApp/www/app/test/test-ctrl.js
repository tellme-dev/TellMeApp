angular.module('tellme')
    .controller('testControll', ['$scope','$state', function ($scope,$state) {
        $scope.swiper = {};

        $scope.onReadySwiper = function (swiper) {

            swiper.on('slideChangeStart', function () {
                console.log('slide start');
            });

            swiper.on('onSlideChangeEnd', function () {
                console.log('slide end');
            });
        };
        $scope.goBack = function () {
            $state.go('menu');
        }
    }])
