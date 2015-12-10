angular.module('tellme')
     //.run(function ($ionicPlatform) {
     //    $ionicPlatform.ready(function () {
     //        if (window.cordova && window.cordova.plugins.Keyboard) {
     //            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
     //        }
     //        if (window.StatusBar) {
     //            StatusBar.styleDefault();
     //        }
     //    });
     //})
    .controller('dataControll', ['$scope', '$state', '$window', '$ionicHistory','appConfig', '$ionicActionSheet', 'cameraSvr', 'fileTransferSvr', 'LoadingSvr', 'customerSer',
        function ($scope, $state, $window, $ionicHistory,appConfig, $ionicActionSheet, cameraSvr, fileTransferSvr, LoadingSvr, customerSer) {
            $scope.baseUrl = appConfig.server.getUrl();
            var now = new Date();
            var mill = now.getTime();//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。

            $scope.image = {};//存放头像
            //返回前页
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            $scope.show = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                      { text: '拍摄照片' },
                      { text: '选择手机上照片' }
                    ],
                    titleText: '照片上传',
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
                    cameraSvr.takePhoto(30, cSuccess, cFail);
                } else {
                    cameraSvr.getPhoto(30, cSuccess, cFail);
                }
                function cSuccess(imgURI) {
                    LoadingSvr.show();
                    var customerId = window.localStorage['userId'];
                    var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000)+'.jpg';
                    /*上传图片*/
                    $scope.uploadPhoto(imgURI, fileName);
                    //$scope.image.imageUrl = 'app/head/' + fileName;
                }
                function cFail(message) {
                    alert(message);
                    console.log(message);
                }
            };
            //上传图片
            $scope.uploadPhoto = function (imgURI, fileName) {
                fileTransferSvr.uploadPhoto(imgURI,'customerImg', fileName, tSuccess, tFail, tProgress);
                /*
                   传输成功
                */
                function tSuccess(result) {
                    $scope.image.imageUrl = "app/head/" + fileName;

                    LoadingSvr.hide();
                    console.log(result);
                }
                /*
                传输失败
                */
                function tFail(error) {
                    alert(error);
                    console.log(error);
                }
                /*
                    传输进度
                    */
                function tProgress(event) {

                }
            };
        }]);