angular.module('tellme')
    .controller('addBbsControll', ['$scope', '$window', 'appConfig', 'cameraSvr', 'fileTransferSvr', 'LoadingSvr', 'bbsSer',
        function ($scope, $window, appConfig, cameraSvr, fileTransferSvr, LoadingSvr, bbsSer) {
        var baseUrl = appConfig.server.getUrl();
        $scope.bbsInfo = {};
        var now = new Date();
        //var year = now.getFullYear();
        //var month = (now.getMonth() + 1).toString();
        //var day = (now.getDate()).toString();
        var mill = now.getTime();//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
        
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
                    return true;
                }
            });
        };
        /*发帖*/
        $scope.addBbs = function () {
            bbsSer.addBbs(bbsInfo).then(
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
        }
        /*拍照上传*/
        $scope.takePhoto = function () {
            cameraSvr.takePhoto(30, cSuccess, cFail);

            function cSuccess(imgURI) {
                LoadingSvr.show();
                /*上传图片*/
                var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000)+'.jpg';
                uploadPhoto(imgURI, fileName);
                
                var customerId = window.localStorage['userId'];
                var doc = document.getElementById("image");//父节点
                var node = document.getElementById("addNode");
                var ele = document.createElement("img");
                ele.src = baseUrl+"app/bbs/temp/"+fileName;//ele.src = imgURI;
                doc.insertBefore(ele,addNode);
            }
            function cFail(message) {
                console.log(message);
            }
        }
        //从手机相册选择
        $scope.getPhoto = function () {
            cameraSvr.getPhoto(30, cSuccess, cFail);
            function cSuccess(imgURI) {
                var customerId = window.localStorage['userId'];
                var doc = document.getElementById("image");
                var ele = document.createElement("img");
                ele.src = imgURI;
                doc.appendChild(ele);
                /*上传图片*/
                uploadPhoto(imgURI, fileName);
            }
            function cFail(message) {
                console.log(message);
            }
        }
        //上传图片
        $scope.uploadPhoto = function (imgURI, fileName) {
            fileTransferSvr.uploadPhoto(imgURI, fileName, tSuccess, tFail, tProgress);
            /*
               传输成功
            */
            function tSuccess(result) {
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
        }
        $scope.deletePhoto = function () {
            bbsSer.deletePhoto().then(
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
        }
    }]);