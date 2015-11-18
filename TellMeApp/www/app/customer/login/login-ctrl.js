angular.module('tellme')
    .controller('login-ctrl', ['$scope', '$ionicNavBarDelegate', 'customerService', function ($scope, $ionicNavBarDelegate, customerService) {
        /*保存登录的输入信息*/
        $scope.loginData = {};
        /*返回前一个界面*/
        $scope.goBack = function () {
            //$ionicNavBarDelegate.back();
            console.log("返回前一个界面");
        }
        $scope.login = function () {
            //验证
            //登录情况：1、成功；2、用户名不存在；3、密码错误；4、未知错误；5、服务连接不上
            var promise = customerService.login($scope.loginData);
            promise.then(
                function (data) {
                    switch (data.data) {
                        case 1:
                            console.log('登录成功');
                            break;
                        case 2:
                        case 3:
                            console.log('用户名不存在或者密码错误');
                            break;
                        case 4:
                            console.log('未知错误');
                            break;
                        case 5:
                            console.log('服务连接不上');
                            break;
                        default:
                            console.log('其他');
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );

        }
    }]);