angular.module('tellme')
    .controller('loginControll', ['$scope', '$ionicNavBarDelegate', '$window', '$state', '$stateParams', '$ionicHistory', 'customerSer',
        function ($scope, $ionicNavBarDelegate,$window,$state,$stateParams,$ionicHistory, customerSer) {
        /*保存登录的输入信息*/
        $scope.loginData = {};
        /*返回前一个界面*/
        $scope.$window = $window;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        };
            //跳转页面的名字
        var pageName = $stateParams.pageName;
       //如果用户已登录表单自动填充
        $scope.loginData.username = window.localStorage['userTel'];
        $scope.loginData.password = window.localStorage['userPsd'];
            //登录
        $scope.login = function () {
            //验证
            //登录情况：1、成功；2、用户名不存在；3、密码错误；4、未知错误；5、服务连接不上
            /*校验输入是否是合法的电话号码*/
                var re = /^1\d{10}$/;
                if (!re.test($scope.loginData.username)) { 
                    alert("请输入正确的电话号码！"); return;
                }
                var pwd=$scope.loginData.password;
                if (pwd == "" || typeof(pwd)=="undefined") {
                    alert("请输入密码！"); return;
                }
                var promise = customerSer.login($scope.loginData);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            window.localStorage['userTel'] = $scope.loginData.username;
                            window.localStorage['userPsd'] = $scope.loginData.password;
                            window.localStorage['userId'] = data.data.id;
                            // $state.go(pageName);
                            $ionicHistory.goBack();
                        } else {
                            switch (data.msg) {
                                case '2':
                                case '3':
                                console.log('用户名不存在或者密码错误');
                                break;
                                case '4':
                                console.log('未知错误');
                                break;
                                case '5':
                                console.log('服务连接不上');
                                break;
                            default:
                                console.log('其他');
                            }
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