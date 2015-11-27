angular.module('tellme')
    .controller('communityControll', ['$scope', '$window', '$state','$ionicHistory',
        function ($scope, $window, $state, $ionicHistory) {
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
                $ionicHistory.goback();
                $window.history.back();
            };
            //跳转到首页
            $scope.goHome = function () {
                $state.go('home');
            }
            /*（点击底部菜单）跳转“发现”*/
            $scope.goDiscover = function () {
                $state.go('discoverList');
            }
            /*（点击底部菜单）跳转“入住”*/
            $scope.goCheckinto = function () {
                // $state.go('communityList');
                console.log("跳转到入住");
            }
        }
    ]);