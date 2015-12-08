angular.module('tellme')
    .controller('addBbsControll', ['$scope','$state', '$window','$ionicHistory', 'appConfig', '$ionicActionSheet','$timeout', 'cameraSvr', 'fileTransferSvr', 'LoadingSvr', 'bbsSer',
        function ($scope,$state, $window,$ionicHistory, appConfig,$ionicActionSheet,$timeout, cameraSvr, fileTransferSvr, LoadingSvr, bbsSer) {
        var baseUrl = appConfig.server.getUrl();
        $scope.bbsInfo = {};
        var now = new Date();
        $scope.bbsImages = [];
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
        }
        /*拍照上传*/
        $scope.takePhoto = function () {
            cameraSvr.takePhoto(30, cSuccess, cFail);

            function cSuccess(imgURI) {
                //LoadingSvr.show();
                var customerId = window.localStorage['userId'];
                /*上传图片*/
                var fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000) + '.jpg';
                //$scope.uploadPhoto(imgURI, fileName);

                $scope.bbsImages.push("app/bbs/temp/" + fileName);

                
                //var doc = document.getElementById("image");//父标签
                //var node = document.getElementById("add");//在此标签之前添加
                
                //var ele = document.createElement("li");//新增的标签
                //var ele_node_1 = document.createElement("img");//新增的标签的子标签
                //ele_node_1.className = "fl fab-li";
                //ele_node_1.src = baseUrl + "app/bbs/temp/" + fileName;//ele.src = imgURI;
                //var ele_node_2 = document.createElement("input");//新增的标签的子标签
                //ele_node_2.type = "button";
                //ele_node_2.value = "x";
                //ele.appendChild(ele_node_1);
                //ele.appendChild(ele_node_2);
                //doc.insertBefore(ele,node);
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
                $scope.uploadPhoto(imgURI, fileName);
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