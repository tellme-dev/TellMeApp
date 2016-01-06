angular.module('tellme')
    .controller('noCheckinControll', ['$scope', '$state', '$ionicHistory', 'checkinSer', 'popUpSer', function ($scope, $state, $ionicHistory, checkinSer, popUpSer) {
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('location');
        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('willSearch');
        }

        $scope.goToHotelgoToHotel = function (nearHotel) {
            if (typeof (nearHotel.itemVMs) == 'undefined' || nearHotel.itemVMs.length == 0) {
                popUpSer.showAlert('获取附件酒店异常');
            }
            var itemId = 0;
            for (var i = 0; i < nearHotel.itemVMs.length; i++) {
                if (typeof (nearHotel.itemVMs[i].itemTags == 'undefined') || nearHotel.itemVMs[i].itemTags.length == 0) {
                    popUpSer.showAlert('获取附件酒店异常');
                }
                for (var j = 0; j < nearHotel.itemVMs[i].itemTags; j++) {
                    if (nearHotel.itemVMs[i].itemTags[j].name =='介绍') {
                        itemId = nearHotel.itemVMs[i].id;
                        $state.go('hotel', { 'hotelId': nearHotel.id, 'rootTagId': 1, 'itemId': itemId });
                        return;
                    }
                }
            }
            popUpSer.showAlert('跳转异常');
        }

        var promise = checkinSer.getCheckinInfo(window.localStorage['userId'], window.localStorage['adcode']);//6
        promise.then(
            function (data) {
                if (data.isSuccess) {
                    if (typeof (data.data) === 'undefined' && typeof (data.rows) !== 'undefined' && data.rows.length > 0) {//没有，则获得一个酒店列表
                        $scope.nearHotel = data.rows;
                    }
                } else {
                    popUpSer.showAlert('查询入住信息异常');
                }
            },
            function (data) {
                popUpSer.showAlert('查询入住信息异常');
            }
            );
    }])