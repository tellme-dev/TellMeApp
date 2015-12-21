angular.module('tellme')
    .controller('rcuControll', ['$rootScope', "$scope",'$ionicHistory', "$stateParams", "$q", "$location", "$window", '$timeout', function ($rootScope, $scope,$ionicHistory, $stateParams, $q, $location, $window, $timeout) {
        //LR :living room 客厅灯
        $scope.tabs = [
            { "text": "灯控" },
            { "text": "空调" },
            { "text": "窗帘" },
            { "text": "服务" },
        ];
        //客厅 灯
        $scope.lrLampBorder0 = '#00a99d';
        $scope.lrBackGround0 = '#00a99d';
        $scope.lrLampBorder1 = '#666';
        $scope.lrBackGround1 = '#666';
        $scope.lrLampBorder2 = '#666';
        $scope.lrBackGround2 = '#666';
        //卫生间 灯
        $scope.toiletLampBorder0 = '#00a99d';
        $scope.toiletBackGround0 = '#00a99d';
        $scope.toiletLampBorder1 = '#666';
        $scope.toiletBackGround1 = '#666';
        //客厅 开关
        $scope.lrBackgroundimage = 'url(images/kongtiaor-to.png)';
        $scope.isLrSwitch = true;
        //空调 开关
        $scope.ConBackgroundimage = 'url(images/kongtiaor-to.png)';
        $scope.isConSwitch = true;
        //窗帘 开关
        $scope.CurtainBackgroundimage = 'url(images/kongtiaor-to.png)';
        $scope.isCurtainSwitch = true;
        // 空调 温度
        $scope.templature = 25;

        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        var changeLRLampCss = function (index) {
            if (index == 0) {
                $scope.lrLampBorder0 = '#00a99d';
                $scope.lrBackGround0 = '#00a99d';
                $scope.lrLampBorder1 = '#666';
                $scope.lrBackGround1 = '#666';
                $scope.lrLampBorder2 = '#666';
                $scope.lrBackGround2 = '#666';
            } else if (index == 1) {
                $scope.lrLampBorder1 = '#00a99d';
                $scope.lrBackGround1 = '#00a99d';
                $scope.lrLampBorder0 = '#666';
                $scope.lrBackGround0 = '#666';
                $scope.lrLampBorder2 = '#666';
                $scope.lrBackGround2 = '#666';
            } else {
                $scope.lrLampBorder2 = '#00a99d';
                $scope.lrBackGround2 = '#00a99d';
                $scope.lrLampBorder1 = '#666';
                $scope.lrBackGround1 = '#666';
                $scope.lrLampBorder0 = '#666';
                $scope.lrBackGround0 = '#666';
            }
        }
        $scope.changeLRLamp = function (index) {
            changeLRLampCss(index);
            //调用RCU指令改变客厅灯的模式
        }
        var changeToiletLampCss = function (index) {
            if (index == 0) {
                $scope.toiletLampBorder0 = '#00a99d';
                $scope.toiletBackGround0 = '#00a99d';
                $scope.toiletLampBorder1 = '#666';
                $scope.toiletBackGround1 = '#666';
            } else {
                $scope.toiletLampBorder1 = '#00a99d';
                $scope.toiletBackGround1 = '#00a99d';
                $scope.toiletLampBorder0 = '#666';
                $scope.toiletBackGround0 = '#666';
            }
        }
        $scope.changeToiletLamp = function (index) {
            changeToiletLampCss(index);
            //调用RCU指令改变卫生间灯的模式
        }
        $scope.lrSwitch = function () {
            if ($scope.isLrSwitch) {
                $scope.lrBackgroundimage = 'url(images/kongtiaor-on.png)';
                $scope.isLrSwitch = false;
            } else {
                $scope.lrBackgroundimage = 'url(images/kongtiaor-to.png)';
                $scope.isLrSwitch = true;
            }
            //调用RCU指令改变客厅开关的模式
        }
        $scope.conSwitch = function () {
            if ($scope.isConSwitch) {
                $scope.conBackgroundimage = 'url(images/kongtiaor-on.png)';
                $scope.isConSwitch = false;
            } else {
                $scope.conBackgroundimage = 'url(images/kongtiaor-to.png)';
                $scope.isConSwitch = true;
            }
            //调用RCU指令改变空调开关的模式
        }
        $scope.curtainSwitch = function () {
            if ($scope.isCurtainSwitch) {
                $scope.curtainBackgroundimage = 'url(images/kongtiaor-on.png)';
                $scope.isCurtainSwitch = false;
            } else {
                $scope.curtainBackgroundimage = 'url(images/kongtiaor-to.png)';
                $scope.isCurtainSwitch = true;
            }
            //调用RCU指令改变窗帘开关的模式
        }
        $scope.changeTemplature = function (direction) {
            if (direction == 1) {
                $scope.templature += 1;
            } else {
                $scope.templature -= 1;
            }
            //调用RCU指令改变空调温度的模式
        }
    }])
