angular.module('tellme')
    .controller('checkinCenterControll', ['$scope', '$state','checkinSer', 'appConfig', 'popUpSer', 'LoadingSvr', function ($scope, $state, checkinSer, appConfig, popUpSer, LoadingSvr) {
        $scope.baseUrl = appConfig.server.getUrl();
        //调用入住接口判断是否有入住信息
        $scope.hasCheckIn = false;
        
        LoadingSvr.show();
        var promise1 = checkinSer.getCheckinInfo(window.localStorage['userId'], window.localStorage['regionCode']);//6
        promise1.then(
            function (data) {
                if (data.isSuccess) {
                    if (typeof (data.data) === 'undefined' && typeof (data.rows) !== 'undefined' && data.rows.length > 0) {//没有，则获得一个酒店列表
                        
                    } else if (typeof (data.data) !== 'undefined' && typeof (data.rows) === 'undefined') {//有，则获取入住的相关内容
                        $scope.checkinHotel = data.data;
                        var promise2 = checkinSer.getAds($scope.checkinHotel.id);
                        promise2.then(
                            function (data) {
                                if (typeof (data.rows) === 'undefined') {
                                    console.log('酒店没有广告');
                                    $scope.adData = undefined;
                                } else {
                                    $scope.adData = data.rows;
                                    LoadingSvr.hide();
                                }
                            },
                            function (data) {
                                $scope.adData = undefined;
                            });
                    } else {
                        $scope.hasCheckIn = false;
                    }
                    
                } else {
                    popUpSer.showAlert('查询入住信息异常');
                    $scope.hasCheckIn = false;
                }
            },
            function (data) {
                popUpSer.showAlert('查询入住信息异常');
            }
            );

        
        $scope.goToAd = function (adId) {
            //param 根据target_type等于1（酒店）、2（服务项目）、3（社区）判断，传入参数target_id
            $state.go('adList', { 'adId': adId });
        }
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
        $scope.goToRCU = function () {
            //判断该房间是否有房控信息
            var promise = checkinSer.getRcusInfo($scope.checkinHotel.roomId);
            promise.then(
                function (data) {
                    if (data.isSuccess && data.rows && data.rows.length > 0) {
                        $state.go('rcu', { roomId: $scope.checkinHotel.roomId });
                        //$state.go('rcu', { roomId: 11 });
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                },
                function (data) {
                    popUpSer.showAlert("获取房间的控制信息出现异常");
                }
                );
        }
        $scope.goToChoose = function () {
            for (var index = 0; index < $scope.checkinHotel.itemVMs.length; index++) {
                if ($scope.checkinHotel.itemVMs[index].itemTags && $scope.checkinHotel.itemVMs[index].itemTags.length > 0 && $scope.checkinHotel.itemVMs[index].itemTags[0].name === '挑') {
                    $state.go('choose', { item: JSON.stringify($scope.checkinHotel.itemVMs[index]) });
                    return false;
                } else if (index == $scope.checkinHotel.itemVMs.length - 1) {
                    //提示
                    popUpSer.showAlert('服务暂未开放');
                }
            }
        }
        $scope.goToItemInfo = function (hotelItemId) {
            $state.go('hotelItem', { itemId:hotelItemId});
        }
        $scope.goToESuperMarket = function () {
            for (var i = 0; i < $scope.checkinHotel.itemVMs.length; i++) {
                if ($scope.checkinHotel.itemVMs[i].itemTags && $scope.checkinHotel.itemVMs[i].itemTags.length > 0 && $scope.checkinHotel.itemVMs[i].itemTags[0].name == 'E房超市') {
                    $state.go('ESuperMarket', { item: JSON.stringify($scope.checkinHotel.itemVMs[i]) });
                    break;
                } else if (i == $scope.checkinHotel.itemVMs.length - 1) {
                    popUpSer.showAlert('服务暂未开放');
                }
            }
        }
        $scope.goToTraffic = function () {
            for (var i = 0; i < $scope.checkinHotel.itemVMs.length; i++) {
                if ($scope.checkinHotel.itemVMs[i].itemTags && $scope.checkinHotel.itemVMs[i].itemTags.length > 0 && $scope.checkinHotel.itemVMs[i].itemTags[0].name == '交通') {
                    $state.go('hotelItem', { itemId: $scope.checkinHotel.itemVMs[i].id });
                    //$state.go('traffic');
                    break;
                } else if (i == $scope.checkinHotel.itemVMs.length - 1) {
                    popUpSer.showAlert('暂无酒店交通信息');
                }
            }
        }
        $scope.goToTV = function () {
            $state.go('tv');
            //for (var i = 0; i < $scope.checkinHotel.itemVMs.length; i++) {
            //    if ($scope.checkinHotel.itemVMs[i].itemTags && $scope.checkinHotel.itemVMs[i].itemTags.length > 0 && $scope.checkinHotel.itemVMs[i].itemTags[0].name == '互动电视') {
            //        $state.go('tv');
            //        break;
            //    } else if (i == $scope.checkinHotel.itemVMs.length - 1) {
            //        popUpSer.showAlert('服务暂未开放');
            //    }
            //}
        }
        $scope.goToNear = function () {
            for (var i = 0; i < $scope.checkinHotel.itemVMs.length; i++) {
                if ($scope.checkinHotel.itemVMs[i].itemTags && $scope.checkinHotel.itemVMs[i].itemTags.length > 0 && $scope.checkinHotel.itemVMs[i].itemTags[0].name == '周边') {
                    $state.go('hotelItem', { itemId: $scope.checkinHotel.itemVMs[i].id });
                    //$state.go('near');
                    break;
                } else if (i == $scope.checkinHotel.itemVMs.length - 1) {
                    popUpSer.showAlert('暂无周边信息');
                }
            }
        }
    }])
