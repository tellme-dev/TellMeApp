angular.module('tellme')
    .controller('rcuControll', ['$rootScope', "$scope", '$ionicHistory', "$stateParams", "$q", "$location", "$window", '$timeout', 'checkinSer', 'popUpSer', function ($rootScope, $scope, $ionicHistory, $stateParams, $q, $location, $window, $timeout, checkinSer, popUpSer) {
        $scope.roomId = $stateParams.roomId;
        //获取房间的控制信息
        var parseExpression = function (expression) {
            var tab = angular.fromJson(expression);
            return tab;
        }
        var promise = checkinSer.getRcusInfo($scope.roomId);
        promise.then(
            function (data) {
                if (data.isSuccess) {
                    $scope.roomcfgs = [];
                    var i = 0;
                    for (;i<data.rows.length;i++) {
                        $scope.roomcfgs[i] = {};
                        $scope.roomcfgs[i].index = i;
                        $scope.roomcfgs[i].name = data.rows[i].name;
                        $scope.roomcfgs[i].serialId = data.rows[i].serialId;
                        $scope.roomcfgs[i].rcuCfgItems = [];
                        var j = 0;
                        for (; j < data.rows[i].rcuCfgItems.length; j++) {
                            var ex = data.rows[i].rcuCfgItems[j].expression;
                            var obj = parseExpression(ex);
                            $scope.roomcfgs[i].rcuCfgItems[j] = obj;
                        } 
                    }
                } else {
                    popUpSer.showAlert(data.msg);
                }
            },
            function (data) {
                popUpSer.showAlert("获取房间的控制信息出现异常");
            }
            );
        $scope.chooseRoomCfg = 0;

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
.directive('tellmeac', function () {
    return {
        restrict: 'AE',
        //scope: {
        //    //configuration:'='
        //},
        template: '<div class="lamp-conter"><div class="kt-cont"><button class="kt-but-lef" ng-click="changeTemplature(0)"><img src="images/kongtiao2.png" style="width:100%;" /></button><div class="kt-cont-cot"><div class="kt-cont-cot-div"><span>{{templature}}</span><p>温度</p></div></div><button class="kt-but-rig"  ng-click="changeTemplature(1)"><img src="images/kongtiao-3.png" style="width:100%;" /></button></div><div class="range range-balanced" style="margin-top:1.5em;"><i class="icon fs-le"></i><input type="range" name="volume" min="0" max="100" value="50" class="input-ct"><i class="icon fs-ri"></i></div><div class="text-fs">风速</div><button class="kt-button-switch" ng-click="conSwitch()" style="background-image:{{conBackgroundimage}}"></button></div>',
        link(scope, element, attrs) {
            scope.templature = 24;
            scope.ConBackgroundimage = 'url(images/kongtiaor-to.png)';
            scope.isConSwitch = true;
            scope.changeTemplature = function (direction) {
                if (direction == 1) {
                    scope.templature += 1;
                } else {
                    scope.templature -= 1;
                }
                //调用RCU指令改变空调温度的模式
            }
            scope.conSwitch = function () {
                if (scope.isConSwitch) {
                    scope.conBackgroundimage = 'url(images/kongtiaor-on.png)';
                    scope.isConSwitch = false;
                } else {
                    scope.conBackgroundimage = 'url(images/kongtiaor-to.png)';
                    scope.isConSwitch = true;
                }
                //调用RCU指令改变空调开关的模式
            }
        }
    };
})
