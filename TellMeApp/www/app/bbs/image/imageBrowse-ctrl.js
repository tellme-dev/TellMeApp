angular.module('tellme')
    .controller('imageBrowseControll', ['$scope', '$stateParams', '$ionicHistory', '$ionicSlideBoxDelegate', '$ionicTabsDelegate', 'appConfig', 'bbsSer',
        function ($scope, $stateParams, $ionicHistory, $ionicSlideBoxDelegate, $ionicTabsDelegate, appConfig, bbsSer) {
            $scope.baseUrl = appConfig.server.getUrl();
            var bbsId = $stateParams.bbsId;
            /*返回前一个界面*/
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //获取图片
            bbsSer.loadImageByBbsId(bbsId).then(
                function (data) {
                    console.log(data.msg);
                    if (data.isSuccess) {
                        $scope.bbsImage = data.rows;
                        $ionicSlideBoxDelegate.$getByHandle('slideimgs').update();
                        $ionicTabsDelegate.select(2);
                    } else {

                    }
                });

            //$scope.repeatDone = function () {
            //    $ionicSlideBoxDelegate.update();
            //}
    }]);