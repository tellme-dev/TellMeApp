angular.module('tellme')
    .controller('systemControll', ['$scope', '$ionicHistory', '$state', 'customerSer',
        function ($scope, $ionicHistory, $state, customerSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //跳转到意见反馈
            $scope.goFeedback = function () {
                $state.go('feedback');
            }
            //跳转到个人资料
            $scope.goData = function () {
                $state.go('data');
            }
            //退出
            $scope.loginOut = function () {
                window.localStorage['userTel'] ="";
                window.localStorage['userPsd'] = "";
                window.localStorage['userId'] = "";
                $state.go('home');
            }
        }]);