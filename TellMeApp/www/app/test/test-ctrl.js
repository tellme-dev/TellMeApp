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
        $scope.tabs = {
        };
        $scope.tabs['i'] = {name:'hzf'};
        $scope.tabs['you'] = {name:'you'};
        $scope.tabs['he'] = {name:'he'};
        $scope.tabs['she'] = {name:'she'};
        $scope.goBack = function () {
            $state.go('menu');
        }
    }])
