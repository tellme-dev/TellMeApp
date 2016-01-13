angular.module('tellme')
    .controller('addBbsControll', ['$scope','$state', '$window','$ionicHistory', 'appConfig', '$ionicActionSheet','popUpSer', 'cameraSvr', 'fileTransferSvr', 'LoadingSvr', 'bbsSer',
        function ($scope,$state, $window,$ionicHistory, appConfig,$ionicActionSheet, popUpSer, cameraSvr, fileTransferSvr, LoadingSvr, bbsSer) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.bbsInfo = {};
        $scope.bbsImages = [];
        $scope.param = {};//删除照片是使用的参数

        //返回
        $scope.goBack = function () {
            $ionicHistory.goBack();
            //删除上传了未发表的照片
            $scope.param.customerId = window.localStorage['userId'];
            bbsSer.deletePhoto($scope.param).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log(data.msg);
                    } else {
                        //alert('');
                        console.log(data.msg);
                    }
                },
                function (data) {
                    popUpSer.showAlert('未知错误');
                }
            )
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
        /*发帖*/
        $scope.saveBbs = function () {
            if ($scope.bbsInfo.title == undefined||$scope.bbsInfo.title == "") {
                popUpSer.showAlert("请输入标题");
                return;
            }
            if ($scope.bbsInfo.text == undefined || $scope.bbsInfo.text == "") {
                popUpSer.showAlert("请输入内容");
                return;
            }
            bbsSer.saveBbs($scope.bbsInfo).then(
                function (data) {
                    if (data.isSuccess) {
                        $state.go('menu.communityList');
                        console.log(data.msg);
                    } else {
                        //alert('');
                        console.log(data.msg);
                    }
                },
                function (data) {
                    popUpSer.showAlert("未知错误");
                }
            )
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
                var now = new Date();
                //var year = now.getFullYear();
                //var month = (now.getMonth() + 1).toString();
                //var day = (now.getDate()).toString();
                var mill = now.getTime();//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
                var customerId = window.localStorage['userId'];
                var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000) + '.jpg';
                /*上传图片*/
                $scope.uploadPhoto(imgURI, fileName);
            }
            function cFail(message) {
                console.log(message);
            }
        };
        //上传图片
        $scope.uploadPhoto = function (imgURI, fileName) {
            var url = $scope.baseUrl + "app/bbs/uploadPhoto.do";//服务器接口地址
            fileTransferSvr.uploadPhoto(imgURI,'bbsPhoto',url, fileName, tSuccess, tFail, tProgress);
            /*
               传输成功
            */
            function tSuccess(result) {
                //上传成功 将图片url放到对象中再放到数组中
                var image = {};
                var customerId = window.localStorage['userId'];
                image.imageUrl = "app/bbs/temp/" + customerId +"/"+ fileName;
                $scope.bbsImages.push(image);

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
        //删除图片
        $scope.deletePhoto = function (imageUrl) {
            for (var i = 0; i < $scope.bbsImages.length; i++) {
                if ($scope.bbsImages[i].imageUrl == imageUrl) {
                    $scope.bbsImages.splice(i,1);
                }
            }
            $scope.param.imageUrl = imageUrl;
            bbsSer.deletePhoto($scope.param).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log(data.msg);
                    } else {
                        //alert('');
                        console.log(data.msg);
                    }
                },
                function (data) {
                    popUpSer.showAlert('未知错误');
                }
            )
        };
    }]);
