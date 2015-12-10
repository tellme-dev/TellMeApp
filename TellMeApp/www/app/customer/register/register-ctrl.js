angular.module('tellme')
    .controller('registerControll',
     ['$scope', '$interval', '$ionicNavBarDelegate', '$ionicHistory', '$window', '$state', 'customerSer', 'commonSer',
         function ($scope,$interval, $ionicNavBarDelegate, $ionicHistory, $window, $state,customerSer, commonSer) {
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
                 $scope.verifyDisabled = true;
                 count = $interval(function () {
                     if ($scope.countInterval > 0) {
                         $scope.countInterval -= 1;
                         $scope.verifyTips = '还剩:  ' + $scope.countInterval + 's';
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
                 $scope.verifyDisabled = false;
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
                 var re = /^1\d{10}$/;
                 if (re.test(mobile)) {
                     return true;
                 } else {
                     return false;
                 }
             }
             $scope.$watch('registerData.mobile', function (newValue, oldValue) {
                 if (checkMobile(newValue)) {
                     $scope.verifyDisabled = true;
                 } else {
                     $scope.verifyDisabled = false;
                 }
             });
        /*返回前一个界面*/
        $scope.$window = $window;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        };
        $scope.goLogin = function () {
            //  $state.go('login');
            $ionicHistory.goBack();
        };
        var isSumit = true;//是否允许提交
        ////判断账号是否存在
        $scope.verifyTel = function () {
            var mobile = $scope.registerData.mobile;
            if (!checkMobile(mobile)) {
                alert("请输入正确的电话号码！"); return;
            }
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
            if ($scope.registerData.psd == "" || typeof ($scope.registerData.psd) == "undefined") {
                alert("请输入密码！"); return;
            }
            if ($scope.registerData.verifyCode == "" || typeof ($scope.registerData.verifyCode) == "undefined") {
                alert("请输入验证码！"); return;
            }
            if (isSumit) {
                customerSer.register($scope.registerData).then(
                function (data) {
                  if (data.isSuccess) {
                      console.log('注册：注册成功');
                      $scope.stopCountDown();
                      $ionicHistory.goBack();
                  } else {
                      $scope.stopCountDown();
                      $scope.resetCount();
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
            if (isSumit && mobile != "" && typeof (mobile) != "undefined" && checkMobile(mobile)) {
                $scope.msg = "";
                commonSer.sendSMS(mobile).then(
               function (data) {
                   if (data.isSuccess) {
                       console.log('验证码发送成功');
                       $scope.countDown();
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
                alert('请填写正确的电话号码');  
            }
        }
    }]);