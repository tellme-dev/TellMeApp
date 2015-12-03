﻿angular.module('tellme')
    .controller('registerControll',
     ['$scope', '$ionicNavBarDelegate', '$ionicHistory', '$window', '$state', 'customerSer', 'commonSer',
         function ($scope, $ionicNavBarDelegate, $ionicHistory, $window, $state,customerSer, commonSer) {
        $scope.registerData = {};
        /*返回前一个界面*/
        $scope.$window = $window;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        };
        $scope.goLogin = function () {
            $state.go('login');
        };
        var isSumit = true;//是否允许提交
        ////判断账号是否存在
        $scope.verifyTel = function () {
            var mobile = $scope.registerData.mobile;
            customerSer.verifyTel(mobile).then(
                function (data) {
                    if (data.isSuccess) {
                        isSumit = true;
                        $scope.msg = "";
                        console.log('该账号未注册');
                        //跳转到登录成功界面
                    } else {
                        isSumit = false;
                        alert('该账号已注册');
                        console.log('该账号已注册');
                       
                        //提示
                    }
                },
                function (data) {
                    console.log("未知错误");
                }
            )
         }
        //注册
        $scope.register = function () {
            if (isSumit) {
                customerSer.register($scope.registerData).then(
                function (data) {
                  if (data.isSuccess) {
                      console.log('注册：注册成功');
                      $ionicHistory.goBack();
                  } else {
                      console.log('注册：注册失败');
                      //提示

                  }
              },
              function (data) {
                  console.log("注册：未知错误");
                  //提示
              }
              )
            }
        }
        /*获取短信验证码服务*/
        $scope.sendShortMessageCode = function () {
            //判断"手机号码"是否符合规范
            var mobile = $scope.registerData.mobile;
            if (isSumit && mobile != "") {
                $scope.msg = "";
                commonSer.sendSMS(mobile).then(
               function (data) {
                   if (data.isSuccess) {
                       console.log('验证码发送成功');
                   } else {
                       console.log(data.msg);
                       //提示
                   }
               },
               function (data) {
                   console.log("未知错误");
               }
               );
            } else {
                $scope.msg = '请填写正确的电话号码';
            }
        }
    }]);