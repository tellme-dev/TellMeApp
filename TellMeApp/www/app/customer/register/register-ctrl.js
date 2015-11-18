angular.module('tellme')
    .controller('registerControll', ['$scope', '$ionicNavBarDelegate', 'customerSer', 'commonSer', function ($scope, $ionicNavBarDelegate, customerSer, commonSer) {
        $scope.registerData = {};
        /*返回前一个界面*/
        $scope.goBack = function () {
            $ionicNavBarDelegate.back();
            console.log("返回前一个界面");
        }
        /*获取短信验证码服务*/
        $scope.sendShortMessageCode = function () {
            //判断"手机号码"是否符合规范
            commonSer.sendSMS($scope.registerData.mobile).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log('注册成功');
                        //跳转到登录成功界面
                    } else {
                        console.log(data.msg);
                        //提示
                    }
                },
                function (data) {
                    console.log("未知错误");
                }
                );
        }
    }]);