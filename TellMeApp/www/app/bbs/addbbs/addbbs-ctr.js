angular.module('tellme')
    .controller('addBbsControll', ['$scope', 'cameraSvr', 'fileTransferSvr', function ($scope, cameraSvr, fileTransferSvr) {
        /*拍照上传*/
        $scope.takePhoto = function (No) {

            function cSuccess(imgURI) {
                var params = $scope.order;
                var image = document.getElementById("img" + No);
                image.src = imgURI;
                /*拍照候将imgURI临时保存到order中*/
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
                employeeOrderSvr.setSelectedOrder($scope.order);
                /*上传图片到服务器*/
                fileTransferSvr.uploadWashPhoto(imgURI, params, No, tSuccess, tFail, tProgress)

            }
            cameraSvr.takePhoto(30, cSuccess, cFail);
        }
        //从手机相册选择
        $scope.getPhoto = function (No) {

            function cSuccess(imgURI) {
                var params = $scope.order;
                var image = document.getElementById("img" + No);
                image.src = imgURI;
                /*拍照后将imgURI临时保存到order中*/
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
                employeeOrderSvr.setSelectedOrder($scope.order);
                /*上传图片到服务器*/
                fileTransferSvr.uploadWashPhoto(imgURI, params, No, tSuccess, tFail, tProgress)

            }
            cameraSvr.getPhoto(30, cSuccess, cFail);
        }
    }]);