angular.module('tellme')
    .controller('addBbsControll', ['$scope', '$window', 'cameraSvr', 'fileTransferSvr', function ($scope,$window, cameraSvr, fileTransferSvr) {
        $scope.bbsInfo = {};
        var bbsPhotos;
        /*发帖*/
        $scope.addBbs = function () {
            adSer.addBbs(bbsInfo).then(
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
                var customerId = window.localStorage['userId'];
                var doc = document.getElementById("image");
                var ele = document.createElement("img");
                ele.src = imgURI;
                doc.appendChild(ele);
                /*上传图片*/
                uploadPhoto(imgURI,customerId);
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
                uploadPhoto(imgURI,customerId);
            }
            function cFail(message) {
                console.log(message);
            }
        }
        //上传图片
        $scope.uploadPhoto = function (imgURI, customerId) {
            fileTransferSvr.uploadPhoto(imgURI, customerId, tSuccess, tFail, tProgress)
            /*
               传输成功
            */
            function tSuccess(result) {
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
    }]);