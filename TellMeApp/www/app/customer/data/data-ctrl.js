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
    .controller('dataControll', ['$scope', '$ionicHistory', '$ionicActionSheet', 'customerSer',
        function ($scope, $ionicHistory,$ionicActionSheet, customerSer) {
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
                        return true;
                    }
                });
            };
        }]);