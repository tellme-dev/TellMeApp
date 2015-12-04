angular.module('tellme')
    .controller('addBbsControll', ['$scope', '$window', 'cameraSvr', 'fileTransferSvr', function ($scope,$window, cameraSvr, fileTransferSvr) {
        $scope.add = function () {
            //var html = "";
            //html = '<img href="#" ng-src="images/zt1.jpg" style="width:100%" />';
            var doc = document.getElementById("image");
            //$("#image").append("<img href='#' ng-src='images/zt1.jpg' style='width:100%' />");
            var ele = document.createElement("img");
            ele.src = "images/zt1.jpg";
            doc.appendChild(ele);
        }
        /*拍照上传*/
        $scope.takePhoto = function () {
            cameraSvr.takePhoto(30, cSuccess, cFail);
            function cSuccess(imgURI) {
                var customerId = window.localStorage['userId'];
                var now = new Date();
                var year = now.getFullYear();
                var year = (now.getMonth() + 1).toString();
                var day = (now.getDate()).toString();
                //var html = "";
                //html = "<img href='#' ng-src='images/zt1.jpg' style='width:100%' />";
                var doc = document.getElementById("image");
                var ele = document.createElement("img");
                ele.src = imgURI;
                doc.appendChild(ele);
                
                //employeeOrderSvr.setSelectedOrder($scope.order);
                /*上传图片到服务器*/
                //fileTransferSvr.uploadWashPhoto(imgURI, params, No, tSuccess, tFail, tProgress)
            }
            function cFail(message) {
                function cFail(message) {
                    console.log(message);
                }
            }
        }
        //从手机相册选择
        $scope.getPhoto = function (No) {

            function cSuccess(imgURI) {
                var params = $scope.order;
                var image = document.getElementById("img" + No);
                image.src = imgURI;
                /*拍照后将imgURL临时保存到order中*/
                switch (No) {
                    case 1:
                        $scope.order.photoUrl1 = imgURI;
                        break;
                    case 2:
                        $scope.order.photoUrl2 = imgURI;
                        break;
                    case 3:
                        $scope.order.photoUrl3 = imgURI;
                        break;
                }
                //employeeOrderSvr.setSelectedOrder($scope.order);
                /*上传图片到服务器*/
                //fileTransferSvr.uploadPhoto(imgURI, params, No, tSuccess, tFail, tProgress)

            }
            cameraSvr.getPhoto(30, cSuccess, cFail);
        }
    }]);