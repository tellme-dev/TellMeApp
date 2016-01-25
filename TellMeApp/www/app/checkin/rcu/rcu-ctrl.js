angular.module('tellme')
    .controller('rcuControll', ['$rootScope', "$scope", '$ionicHistory', "$stateParams", "$q", "$location", "$window", '$timeout', '$ionicSlideBoxDelegate', 'checkinSer', 'popUpSer', function ($rootScope, $scope, $ionicHistory, $stateParams, $q, $location, $window, $timeout,$ionicSlideBoxDelegate, checkinSer, popUpSer) {
        
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
        $scope.$watch('roomTabs', function (newValue, oldValue) {
            $scope.roomTabs = newValue;
            console.log('change');
        });
        $scope.changeRoomcfg = function (index, roomcfg) {
            $scope.roomIndex = index;
            $scope.roomTabs = roomcfg.tabs;
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
            var temp = room.rcuCfgItems[0];
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
                if (index == 0 || item.dtype == temp.dtype) {
                    room.tabs[item.dtype] = {
                        name: name,
                        dtype:item.dtype,
                        isActive: 'active'
                    };
                } else {
                    room.tabs[item.dtype] = {
                        name: name,
                        dtype: item.dtype,
                        isActive: ''
                    };
                }

            });
        }
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }

        $scope.changeLampColorMode = function (cfgItem, oper, labe) {
            var order = {
                src: 'app',
                dst: 'rcu',
                sid: $scope.roomcfgs[$scope.roomIndex].serialId,
                uid: window.localStorage['userId'],
            };
            var valueOn = 0;
            var valueOff = 1;
            if (cfgItem.isOn == '关') {
                for (var i = 0; i < cfgItem.opers.length; i++) {
                    if (cfgItem.opers[i].tag == 'S') {
                        for (var j = 0; j < cfgItem.opers[i].labels.length; j++) {
                            if (cfgItem.opers[i].labels[j].label == '开') {
                                valueOn = cfgItem.opers[i].labels[j].value;
                            } else {
                                valueOff = cfgItem.opers[i].labels[j].value;
                            }
                        }
                    }
                }
                order[cfgItem.name] = {
                    S: valueOn,
                    C: labe.value
                };
            } else if (cfgItem.isOn == labe.label) {
                order[cfgItem.name] = {
                    S: valueOff
                };
            } else {
                order[cfgItem.name] = {
                    S: valueOn,
                    C: labe.value
                };
            }
            //调用rcu服务改变灯的模式
            var promise = checkinSer.sendOrder(order);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        if (cfgItem.isOn == '关') {
                            cfgItem.isOn == labe.label;
                            labe.color = '#6dcda5';
                        } else if (cfgItem.isOn == labe.label) {
                            cfgItem.isOn == '关';
                            labe.color = '#6d6d6d';
                        } else {
                            cfgItem.isOn == labe.label;
                            for (var c = 0; c < oper.labels.length; c++) {
                                oper.labels[c].color = '#6d6d6d';
                            }
                            labe.color = '#6dcda5';
                        }
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                }, function (data) {
                    popUpSer.showAlert(data.msg);
                });
        }

        $scope.powerOnOrOffAllLT = function () {
            var order = {
                src: 'app',
                dst: 'rcu',
                sid: $scope.room.serialId,
                uid: window.localStorage['userId'],
            };
            var valueOff = 0;
            for (var i = 0; i < cfgItem.opers.length; i++) {
                if (cfgItem.opers[i].tag == 'S') {
                    for (var j = 0; j < cfgItem.opers[i].labels.length; j++) {
                        if (cfgItem.opers[i].labels[j].label == '开') {
                        } else {
                            valueOff = cfgItem.opers[i].labels[j].value;
                        }
                    }
                }
            }
            order[cfgItem.name] = {
                S: valueOff
            };
            //调用rcu服务改变灯的模式
            var promise = checkinSer.sendOrder(order);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        for (var i = 0; i < room.rcuCfgItems.length; i++) {
                            if (room.rcuCfgItems[i].dtype == 'LT') {
                                room.rcuCfgItems[i].isOn = '关';
                                for (var j = 0; j < room.rcuCfgItems[i].opers.length; j++) {
                                    if (room.rcuCfgItems[i].opers[j].tag == 'C') {
                                        for (var c = 0; room.rcuCfgItems[i].opers[j].labels.length; c++) {
                                            oom.rcuCfgItems[i].opers[j].labels[c].color = '#6d6d6d';
                                        }
                                    }
                                }
                            }
                        }

                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                }, function (data) {
                    popUpSer.showAlert(data.msg);
                });

        }
        //改变空调温度
        $scope.changeACTemplature = function (cfgItem, oper, direction) {
            var order = {
                src: 'app',
                dst: 'rcu',
                sid: $scope.room.serialId,
                uid: window.localStorage['userId'],
            };
            if (direction == 1) {
                order[cfgItem.name] = {
                    T: cfgItem.templature + oper.inv
                };
            } else {
                order[cfgItem.name] = {
                    T: cfgItem.templature - oper.inv
                };
            }
            //调用rcu服务改变空调温度
            var promise = checkinSer.sendOrder(order);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        if (direction == 1) {
                            cfgItem.templature += oper.inv;
                        } else {
                            cfgItem.templature -= oper.inv;
                        }
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                }, function (data) {
                    popUpSer.showAlert(data.msg);
                });
        }
        //开关空调
        $scope.powerOnOrOffAC = function (cfgItem, oper, tag) {
            var order = {
                src: 'app',
                dst: 'rcu',
                sid: $scope.room.serialId,
                uid: window.localStorage['userId'],
            };
            for (var i = 0; i < oper.labels.length; i++) {
                if (cfgItem.isOn != oper.labels[i].label) {
                    order[cfgItem.name] = {
                        S: oper.labels[i].value
                    };
                    break;
                }
            }
            //调用rcu服务开关空调
            var promise = checkinSer.sendOrder(order);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        if (cfgItem.isOn == '开') {
                            cfgItem.isOn == '关'
                        } else {
                            cfgItem.isOn == '开'
                        }
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                }, function (data) {
                    popUpSer.showAlert(data.msg);
                });
        }
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }

        //获取房间的控制信息
        var parseExpression = function (expression) {
            var tab = angular.fromJson(expression);
            //不同模式的灯需要为其添加一个拼音字段
            if (tab.dtype == 'LT') {
                for (var i = 0; i < tab.opers.length; i++) {
                    if (tab.opers[i].tag == 'C') {
                        for (var j = 0; j < tab.opers[i].labels.length; j++) {
                            if (tab.opers[i].labels[j].label == '明亮模式') {
                                tab.opers[i].labels[j].pinyin = 'mingliang';
                                tab.opers[i].labels[j].color = '#6d6d6d';
                            } else if (tab.opers[i].labels[j].label == '睡眠模式') {
                                tab.opers[i].labels[j].pinyin = 'shuimian';
                                tab.opers[i].labels[j].color = '#6d6d6d';
                            } else if (tab.opers[i].labels[j].label == '浪漫模式') {
                                tab.opers[i].labels[j].pinyin = 'langman';
                                tab.opers[i].labels[j].color = '#6d6d6d';
                            } else if (tab.opers[i].labels[j].label == '洗手模式') {
                                tab.opers[i].labels[j].pinyin = 'xishou';
                                tab.opers[i].labels[j].color = '#6d6d6d';
                            } else if (tab.opers[i].labels[j].label == '泡浴模式') {
                                tab.opers[i].labels[j].pinyin = 'paoyu';
                                tab.opers[i].labels[j].color = '#6d6d6d';
                            }
                        }
                    }
                }
                tab.isOn = '关';
            }
            return tab;
        }

        $scope.roomId = $stateParams.roomId;
        $scope.roomIndex = 0;

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
                    for (var c = 0; c < $scope.roomcfgs.length; c++) {
                        $scope.initRoomTab($scope.roomcfgs[c]);
                    }
                    $scope.roomTabs = $scope.roomcfgs[0].tabs;
                } else {
                    popUpSer.showAlert(data.msg);
                }
            },
            function (data) {
                popUpSer.showAlert("获取房间的控制信息出现异常");
            }
            );
        $scope.changeTabsColor = function(item,items){
            
            angular.forEach(items, function (i,index) {
                i.isActive = '';
            });
            item.isActive = 'active';

        }
        $scope.changeAnotherSlide = function (item, items) {
            $scope.changeTabsColor(item, items);
            var currentIndex = $ionicSlideBoxDelegate.currentIndex();
            var temp = 0;
            var count = 0;
            angular.forEach(items, function (value,key) {
                if (item.name == value.name) {
                    count = temp;
                }
                temp++;
            });
            if(currentIndex <count){
                for (var j = 0; j < count - currentIndex; j++) {
                    $ionicSlideBoxDelegate.next();
                }
            } else if (currentIndex > count) {
                for (var j = 0; j <currentIndex- count; j++) {
                    $ionicSlideBoxDelegate.previous();
                }
            }
            
        }
        $scope.slideHasChanged = function (index, room) {
            var temp = {};
            var count = 0;
            angular.forEach(room.tabs, function (item, mark) {
                if (index == count) {
                    temp = item;
                }
                count++;
            });
            $scope.changeTabsColor(temp, room.tabs);
        }
    }])
