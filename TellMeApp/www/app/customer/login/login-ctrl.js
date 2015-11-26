angular.module('tellme')
    .controller('loginControll', ['$scope', '$ionicNavBarDelegate', '$window','$state', 'customerSer',
        function ($scope, $ionicNavBarDelegate,$window,$state, customerSer) {
        /*保存登录的输入信息*/
        $scope.loginData = {};
        /*返回前一个界面*/
        $scope.$window = $window;
        $scope.goBack = function () {
            $window.history.back();
        };
       //如果用户已登录表单自动填充
        $scope.loginData.username = $window.localStorage['userTel'];
        $scope.loginData.password = $window.localStorage['psd'];
            //登录
        $scope.login = function () {
            //验证
            //登录情况：1、成功；2、用户名不存在；3、密码错误；4、未知错误；5、服务连接不上
            var promise = customerSer.login($scope.loginData);
            promise.then(
                function (data) {
                    switch (data.data) {
                        case 1:
                            $window.localStorage['userTel'] = $scope.loginData.username
                            $window.localStorage['psd'] = $scope.loginData.password;
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
            //跳转到注册页面
        $scope.toRegister = function () {
            $state.go('register');
        }
    }]);