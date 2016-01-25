angular.module('tellme')
    .controller('dataControll', ['$scope', '$state','$q', '$window', '$ionicHistory','appConfig', '$ionicActionSheet','popUpSer', 'cameraSvr', 'fileTransferSvr', 'LoadingSvr', 'customerSer',
        function ($scope, $state,$q, $window, $ionicHistory,appConfig, $ionicActionSheet,popUpSer, cameraSvr, fileTransferSvr, LoadingSvr, customerSer) {
            $scope.baseUrl = appConfig.server.getUrl();
            
            $scope.customerInfo = {};//存放客户信息
            //返回前页
            $scope.goBack = function () {
                //var views = $ionicHistory.viewHistory();
                $ionicHistory.goBack();
            };
            //跳转到修改电话页面
            $scope.goToEditMobile = function () {
                $state.go('editMobile');
            }
            //加载个人信息
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {
                $state.go('login', { pageName: 'customer' });
            } else {
                customerSer.getCustomerInfo(window.localStorage['userId']).then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.customerInfo = data.data;
                        //日期格式转换
                        var birthday = new Date(data.data.birthday);
                        $scope.customerInfo.birthday = birthday.getFullYear() + "-" + (birthday.getMonth() + 1) + "-" + birthday.getDate();
                        console.log(data.msg);
                    } else {
                        console.log(data.msg);
                    }
                });
            }
            
            //保存修改
            $scope.saveData = function () {
                $scope.customerInfo.customerId = window.localStorage['userId'];
                customerSer.saveCustomerInfo($scope.customerInfo).then(
                    function (data) {
                        if (data.isSuccess) {
                            popUpSer.showAlert(data.msg);
                            console.log(data.msg);
                        } else {
                            console.log(data.msg);
                        }
                    });
            };

            //选择日期
            $scope.selectDate = function () {
                var options = {
                    date: new Date(),
                    mode: 'date'
                };

                function onSuccess(date) {
                    $scope.customerInfo.birthday = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    alert('Selected date: ' + $scope.customerInfo.birthday);
                    //alert(date.getYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
                    //alert(date.toString());
                    //alert(date.toLocaleString());
                }

                function onError(error) { // Android only
                    //alert('Error: ' + error);
                }
                datePicker.show(options, onSuccess, onError);
            }

            $scope.show = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                      { text: '拍摄照片' },
                      { text: '选择手机上照片' }
                    ],
                    titleText: '选择头像',
                    cancelText: '取消',
                    cancel: function () {
                    },
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0:
                                $scope.takePhoto(0); break;
                            case 1:
                                $scope.takePhoto(1); break;
                            default:
                                break;
                        }
                        return true;
                    }
                });
            };
            /*调用相机：type=0 ，相册中选择：type=1*/
            $scope.takePhoto = function (type) {
                if (type == 0) {
                    cameraSvr.takePhoto(15, cSuccess, cFail);
                } else {
                    cameraSvr.getPhoto(15, cSuccess, cFail);
                }
                function cSuccess(imgURI) {
                    LoadingSvr.load();
                    var now = new Date();
                    var mill = now.getTime();//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
                    var customerId = window.localStorage['userId'];
                    var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000)+'.jpg';
                    /*上传图片*/
                    $scope.uploadPhoto(imgURI, fileName);
                    //$scope.image.imageUrl = '/picture/app/head/' + fileName;
                }
                function cFail(message) {
                    console.log(message);
                }
            };
            //上传图片
            $scope.uploadPhoto = function (imgURI, fileName) {
                var url = $scope.baseUrl + "app/customer/uploadHeadImg.do";//服务器接口地址
                fileTransferSvr.uploadPhoto(imgURI,'customerImg',url, fileName, tSuccess, tFail, tProgress);
                /*
                   传输成功
                */
                function tSuccess(result) {
                    $scope.customerInfo.photoUrl = "/picture/app/head/" + fileName;

                    LoadingSvr.hide();
                    console.log(result);
                }
                /*
                传输失败
                */
                function tFail(error) {
                    console.log(error);
                }
                /*
                    传输进度
                    */
                function tProgress(event) {

                }
            };
        }]);