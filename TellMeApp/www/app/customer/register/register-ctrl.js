angular.module('tellme')
    .controller('registerControll',
     ['$scope', '$interval', '$ionicHistory', '$state', 'customerSer', 'commonSer', 'popUpSer',
         function ($scope, $interval, $ionicHistory, $state, customerSer, commonSer, popUpSer) {
             $scope.registerData = {};
             $scope.verifyDisabled = false;
             $scope.verifyTips = '获取验证码';
             /*倒计时*/
             var count;
             $scope.countInterval = 120;
             /*倒计时*/
             $scope.countDown = function () {
                 // Don't start a new countDown if we are already countDowning
                 if (angular.isDefined(count)) {
                     return;
                 }
                 $scope.verifyDisabled = false;
                 count = $interval(function () {
                     if ($scope.countInterval > 0) {
                         $scope.countInterval -= 1;
                         $scope.verifyTips = '重发验证码:  ' + $scope.countInterval + 's';
                     } else {
                         $scope.stopCountDown();
                     }
                 }, 1000);
             }
             /*停止倒计时*/
             $scope.stopCountDown = function () {
                 if (angular.isDefined(count)) {
                     $interval.cancel(count);
                     $scope.resetCount();
                 }
             }
             /*重置*/
             $scope.resetCount = function () {
                 $scope.countInterval = 120;
                 $scope.verifyDisabled = true;
                 $scope.verifyTips = '获取验证码';
                 count = undefined;
             }
             $scope.$on('$destroy', function () {
                 /*make sure that the interval is destroyed too*/
                 $scope.stopCountDown();
             })

             /*校验输入是否是合法的电话号码*/
             var checkMobile = function (mobile) {
                 /*测试账号*/
                 if (mobile == "8888") {
                     return true;
                 }
                 //var re = /^1\d{10}$/;
                 var re = /^1[34578][0-9]{9}$/;
                 if (re.test(mobile)) {
                     return true;
                 } else {
                     return false;
                 }
             }
             //$scope.$watch('registerData.mobile', function (newValue, oldValue) {
             //    if (checkMobile(newValue)) {
             //        $scope.verifyDisabled = true;
             //    } else {
             //        $scope.verifyDisabled = false;
             //    }
             //});
             $scope.$watch('verifyDisabled', function (newValue, oldValue) {


                 if (newValue == true) {
                     $scope.sendMsgBackColor = '#4ebcff';
                 } else {
                     $scope.sendMsgBackColor = '#e3e3e3';
                 }
                
             });
             /*返回前一个界面*/
             $scope.goBack = function () {
                 $ionicHistory.goBack();
             };
             $scope.goLogin = function () {
                 //  $state.go('login');
                 $ionicHistory.goBack();
             };
             var isSumit = false;//是否允许提交
             ////判断账号是否存在
             $scope.verifyTel = function () {
                 var mobile = $scope.registerData.mobile;
                 if (mobile != "" && typeof (mobile) != "undefined") {
                     if (!checkMobile(mobile)) {
                         isSumit = false;
                         $scope.verifyDisabled = false;
                         popUpSer.showAlert("手机号码应为11位数字，以13/14/15/17/18开头");
                         return;
                     } else { 
                        
                      customerSer.verifyTel(mobile).then(
                         function (data) {
                             if (data.isSuccess) {
                                 isSumit = true;
                                 $scope.verifyDisabled = true;
                                 $scope.msg = "";
                                 //跳转到登录成功界面
                             } else {
                                 isSumit = false;
                                 $scope.verifyDisabled = false;
                                 popUpSer.showAlert("该账号已注册,您可以直接登录！");
                             }
                          },
                         function (data) {
                             popUpSer.showAlert("未知错误！");
                         }
                       )
                     }
                 }
             }
             //注册
             $scope.register = function () {
                 if (!isSumit) {
                     //  popUpSer.showAlert("请填写可用的电话号码！");
                     return;
                 }else{
                 if ($scope.registerData.psd == "" || typeof ($scope.registerData.psd) == "undefined") {
                     popUpSer.showAlert("请输入密码！"); return;
                 }
                 if ($scope.registerData.rpsd == "" || typeof ($scope.registerData.rpsd) == "undefined") {
                     popUpSer.showAlert("请输入密码！"); return;
                 }
                 if ($scope.registerData.psd != $scope.registerData.rpsd) {
                     popUpSer.showAlert("两次密码不一致！"); return;
                 }
                 if ($scope.registerData.verifyCode == "" || typeof ($scope.registerData.verifyCode) == "undefined") {
                     popUpSer.showAlert("请输入验证码！"); return;
                 }
              
                 customerSer.register($scope.registerData).then(
                 function (data) {
                     if (data.isSuccess) {
                         popUpSer.showAlert("注册成功！");
                         //$scope.stopCountDown();
                         $ionicHistory.goBack();
                     } else {
                         //  $scope.stopCountDown();
                         $scope.resetCount();
                         popUpSer.showAlert(data.msg);
                         console.log('注册：注册失败');
                         //提示

                     }
                 },
               function (data) {
                   popUpSer.showAlert("未知错误！");
                   //提示
               }
               )
             }
          }
             /*获取短信验证码服务*/
             $scope.sendShortMessageCode = function () {
                 //判断"手机号码"是否符合规范
                 var mobile = $scope.registerData.mobile;
                 if (!isSumit) {
                     popUpSer.showAlert("请填写正确的电话号码"); return;
                  }
                 if (mobile != "" && typeof (mobile) != "undefined" && checkMobile(mobile)) {
                     $scope.msg = "";
                     commonSer.sendSMS(mobile).then(
                    function (data) {
                        if (data.isSuccess) {
                            console.log('验证码发送成功');
                            $scope.countDown();
                        } else {
                            popUpSer.showAlert(data.msg);
                            console.log(data.msg);
                        }
                    },
                    function (data) {
                        console.log("未知错误");
                        popUpSer.showAlert("未知错误");
                    }
                    );
                 }
             }
             //确认修改电话
             //$scope.editMobile = function () {
             //    if ($scope.registerData.psd == "" || typeof ($scope.registerData.psd) == "undefined") {
             //        popUpSer.showAlert("请输入密码"); return;
             //    }
             //    if ($scope.registerData.rpsd == "" || typeof ($scope.registerData.rpsd) == "undefined") {
             //        popUpSer.showAlert("请输入密码"); return;
             //    }
             //    if ($scope.registerData.psd != $scope.registerData.rpsd) {
             //        popUpSer.showAlert("两次密码不一致"); return;
             //    }
             //    if ($scope.registerData.verifyCode == "" || typeof ($scope.registerData.verifyCode) == "undefined") {
             //        popUpSer.showAlert("请输入验证码"); return;
             //    }
             //    if (isSumit) {
             //        $scope.registerData.customerId = window.localStorage['userId'];
             //        customerSer.editMobile($scope.registerData).then(
             //        function (data) {
             //            if (data.isSuccess) {
             //                console.log('修改电话成功');
             //                $scope.stopCountDown();
             //                $ionicHistory.goBack();
             //            } else {
             //                $scope.stopCountDown();
             //                $scope.resetCount();
             //                console.log(data.msg);
             //                //提示
             //                alert(data.msg);

             //            }
             //        },
             //      function (data) {
             //          console.log("未知错误");
             //          //提示
             //      }
             //      )
             //    }
             //}
         }]);