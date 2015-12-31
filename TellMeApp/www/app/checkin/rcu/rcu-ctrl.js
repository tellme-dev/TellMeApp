angular.module('tellme')
    .controller('rcuControll', ['$rootScope', "$scope", '$ionicHistory', "$stateParams", "$q", "$location", "$window", '$timeout', 'checkinSer', 'popUpSer', function ($rootScope, $scope, $ionicHistory, $stateParams, $q, $location, $window, $timeout, checkinSer, popUpSer) {
        //初始化"主卧","客卧","客厅"按钮的背景图片
        $scope.initRoomcfgImage = function (index, roomcfg) {
            if (index == 0) {
                if (roomcfg.name =='主卧') {
                    roomcfg.imageurl = 'hostroom.jpg';
                } else if (roomcfg.name == '客厅') {
                    roomcfg.imageurl = 'livingroom.jpg';
                } else if (roomcfg.name == '客卧') {
                    roomcfg.imageurl = 'guardroom.jpg';
                } else {
                    roomcfg.imageurl = 'hostroom.jpg';
                }
            } else {
                if (roomcfg.name == '主卧') {
                    roomcfg.imageurl = 'hostroom_1.png';
                } else if (roomcfg.name == '客厅') {
                    roomcfg.imageurl = 'livingroom_1.png';
                } else if (roomcfg.name == '客卧') {
                    roomcfg.imageurl = 'guardroom_1.png';
                } else {
                    roomcfg.imageurl = 'hostroom_1.png';
                }
            }
            
        }
        //点击"主卧","客卧","客厅"的响应事件
        $scope.changeRoomcfg = function (index,roomcfg) {
            $scope.room = roomcfg;
            $scope.initRoomTab($scope.room);
            for (var i = 0; i < $scope.roomcfgs.length; i++) {
                if (index == i) {
                    if ($scope.roomcfgs[i].name == '主卧') {
                        $scope.roomcfgs[i].imageurl = 'hostroom.jpg';
                    } else if ($scope.roomcfgs[i].name == '客厅') {
                        $scope.roomcfgs[i].imageurl = 'livingroom.jpg';
                    } else if ($scope.roomcfgs[i].name == '客卧') {
                        $scope.roomcfgs[i].imageurl = 'guardroom.jpg';
                    } else {
                        $scope.roomcfgs[i].imageurl = 'hostroom.jpg';
                    }
                } else {
                    if ($scope.roomcfgs[i].name == '主卧') {
                        $scope.roomcfgs[i].imageurl = 'hostroom_1.png';
                    } else if ($scope.roomcfgs[i].name == '客厅') {
                        $scope.roomcfgs[i].imageurl = 'livingroom_1.png';
                    } else if ($scope.roomcfgs[i].name == '客卧') {
                        $scope.roomcfgs[i].imageurl = 'guardroom_1.png';
                    } else {
                        $scope.roomcfgs[i].imageurl = 'hostroom_1.png';
                    }
                }
            }
        }
        //当room改变时，重新初始化其内部的tabs
        $scope.initRoomTab = function (room) {
            room.tabs = {};
            angular.forEach(room.rcuCfgItems, function (item, index) {
                var name = '';        
                switch(item.dtype){
                    case 'LT':
                        name = '灯控';
                        break;
                    case 'AC':
                        name = '空调';
                        break;
                    case 'CT':
                        name = '窗帘';
                        break;
                    case 'SV':
                        name = '服务';
                        break;
                    case 'RH':
                        name = '地暖';
                        break;
                    case 'TV':
                        name = '电视';
                        break;
                    default:
                        name = '其他';
                        break;
                }
                room.tabs[item.dtype] = {
                    tabName: name,
                    dtype: item.dtype
                };
            });
        }

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
                    $scope.roomcfgWidth = Math.round(100 / data.rows.length).toString() + '%';

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

                    $scope.room = $scope.roomcfgs[0];
                    $scope.initRoomTab($scope.room);

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
        //$scope.tabs = [
        //    { "text": "灯控" },
        //    { "text": "空调" },
        //    { "text": "窗帘" },
        //    { "text": "服务" },
        //];
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

        //改变空调温度
        $scope.changeACTemplature = function (direction, cfgItem) {
            if (direction == 1) {
                cfgItem.templature += 1;
            } else {
                cfgItem.templature -= 1;
            }
            //调用RCU指令改变空调温度的模式
        }

        $scope.switch = function (oper, tag) {
            var order = '#@{src:"app",dst:"rcu",type:"csts",sid:"' + $scope.room.serialId + '",uid:"' + window.localStorage['userId'] + '",' + $scope.room.sn + ':{' + tag+':'+oper.value + '}}@#';
        }
    }])
