angular.module('tellme')
    .controller('addBbsControll', ['$scope','$state', '$window','$ionicHistory', 'appConfig', '$ionicActionSheet','$timeout', 'cameraSvr', 'fileTransferSvr', 'LoadingSvr', 'bbsSer',
        function ($scope,$state, $window,$ionicHistory, appConfig,$ionicActionSheet,$timeout, cameraSvr, fileTransferSvr, LoadingSvr, bbsSer) {
        var baseUrl = appConfig.server.getUrl();
        $scope.bbsInfo = {};
        var now = new Date();
        $scope.bbsImages = [
            //{
            //    imageUrl:"/"
            //},
            //{
            //    imageUrl: "/"
            //}
        ];
        //var year = now.getFullYear();
        //var month = (now.getMonth() + 1).toString();
        //var day = (now.getDate()).toString();
        var mill = now.getTime();//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。

        //$('.sh-cont li').find('input').click(function () {
        //    $(this).parent().hide();
            //})
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
                            $scope.takePhoto(); break;
                        case 1:
                            $scope.getPhoto(); break;
                    }
                }
            });
        };
        /*发帖*/
        $scope.saveBbs = function () {
            bbsSer.saveBbs($scope.bbsInfo).then(
                function (data) {
                    if (data.isSuccess) {
                        $state.go('communityList');
                        console.log(data.msg);
                    } else {
                        //alert('');
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log("未知错误");
                }
            )
        };
        /*拍照上传*/
        $scope.takePhoto = function () {
            cameraSvr.takePhoto(30, cSuccess, cFail);

            function cSuccess(imgURI) {
                LoadingSvr.show();
                var customerId = window.localStorage['userId'];
                var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000);
                /*上传图片*/
                $scope.uploadPhoto(imgURI, fileName);
                //上传成功 将图片url放到对象中再放到数组中
                //var image = {};
                //image.imageUrl = "app/bbs/temp/" + fileName;
                //$scope.bbsImages.push(image);
            }
            function cFail(message) {
                alert(message);
                console.log(message);
            }
        };
        //从手机相册选择
        $scope.getPhoto = function () {
            cameraSvr.getPhoto(30, cSuccess, cFail);
            function cSuccess(imgURI) {
                LoadingSvr.show();
                var customerId = window.localStorage['userId'];
                var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000);
                /*上传图片*/
                $scope.uploadPhoto(imgURI, fileName);
            }
            function cFail(message) {
                alert(message);
                console.log(message);
            }
        };
        //上传图片
        $scope.uploadPhoto = function (imgURI, fileName) {
            fileTransferSvr.uploadPhoto(imgURI, fileName, tSuccess, tFail, tProgress);
            /*
               传输成功
            */
            function tSuccess(result) {
                //上传成功 将图片url放到对象中再放到数组中
                var image = {};
                alert(result);
                image.imageUrl = "app/bbs/temp/" + fileName + ".jpg";
                $scope.bbsImages.push(image);

                LoadingSvr.hide();
                console.log(result);
            }
            /*
            传输失败
            */
            function tFail(error) {
                alert(error);
                console.log(error);
                alert(error);
            }
            /*
                传输进度
                */
            function tProgress(event) {

            }
        };
        $scope.deletePhoto = function (imageUrl) {
            for (var i = 0; i < $scope.bbsImages.length; i++) {
                if ($scope.bbsImages[i].imageUrl == imageUrl) {
                    $scope.bbsImages.splice(i,1);
                    var a = 1;
                }
            }
            bbsSer.deletePhoto(imageUrl).then(
                function (data) {
                    if (data.isSuccess) {
                        console.log(data.msg);
                    } else {
                        //alert('');
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log("未知错误");
                }
            )
        };
    }]);
