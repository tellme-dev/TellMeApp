angular.module('tellme')
    .controller('systemControll', ['$scope', '$ionicHistory', '$state', 'popUpSer', 'customerSer',
        function ($scope, $ionicHistory, $state,popUpSer, customerSer) {
            $scope.goBack = function () {
                //var views = $ionicHistory.viewHistory();
                $ionicHistory.goBack();
            }
            //跳转到意见反馈
            $scope.goFeedback = function () {
                $state.go('feedback');
            }
            //跳转到个人资料
            $scope.goData = function () {
                //var views = $ionicHistory.viewHistory();
                $state.go('data');
            }
            //跳转到关于
            $scope.goAbout = function () {
                $state.go('about');
            }
            //退出
            
            $scope.loginOut = function () {
                popUpSer.confirmExit("确定退出登录？").then(
                    function (r) {
                        if (r) {
                            window.localStorage['userTel'] ="";
                            window.localStorage['userPsd'] = "";
                            window.localStorage['userId'] = "";
                           //window.lolocalStorage.setItem('userTel',"");
                           //window.lolocalStorage.setItem('userPsd',"");
                           //window.lolocalStorage.setItem('userId',"");
                           $state.go('menu.home');
                        }else{
                        }
                    });
            }
        }]);