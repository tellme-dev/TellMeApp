angular.module('tellme')
    .controller('discoverControll', ['$scope', '$window', '$state',
        function ($scope, $window, $state) {
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
                $window.history.back();
            };
            //跳转到首页
            this.goHome = function () {
                $state.go('home');
            }
            /*（点击底部菜单）跳转“入住”*/
            $scope.goCheckinto = function () {
                $state.go('communityList');
            }
            /*（点击底部菜单）跳转“社区”*/
            $scope.goCommunity = function () {
                $state.go('communityList');
            }
        }
    ]);