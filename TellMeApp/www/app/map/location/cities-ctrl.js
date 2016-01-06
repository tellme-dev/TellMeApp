angular.module('tellme')
    .controller('mapLocationControll', ['$scope', '$rootScope', '$ionicHistory', '$location', '$ionicScrollDelegate', 'tellMeMapSvr', 'commonSer', 'LoadingSvr', function ($scope, $rootScope, $ionicHistory, $location, $ionicScrollDelegate, tellMeMapSvr, commonSer, LoadingSvr) {
        $scope.getRowArray = function (items) {
            var array = [];
            var count = 0;
            var i = 0;
            var j = 0;
            while (count < items.length) {
                if (count == 0) {
                    array[i] = [];
                    array[i][j++] = items[count];
                } else if (count % 4 == 0) {
                    i++;
                    j = 0;
                    array[i] = [];
                    array[i][j++] = items[count];
                } else {
                    array[i][j++] = items[count];
                }
                count++;
            }
            return array;
        }
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        //GPS
        $scope.updateCity = function () {
            LoadingSvr.show();
            tellMeMapSvr.getDistrict();
            LoadingSvr.hide();
            $scope.currentCity = window.localStorage['currentcity'];
        }

        //对搜索输入内容进行监视，用于切换按钮的显示内容
        $scope.$watch('searchText', function (newValue, oldValue) {
            if (typeof (newValue) == 'undefined' || angular.equals(newValue, '')) {
                $scope.cancelBtnText = '取消';
                $scope.hasInputSearchText = false;
            } else {
                $scope.cancelBtnText = '搜索';
                $scope.hasInputSearchText = true;
            }
        });
        $scope.cancelOrsearch = function () {
            if (angular.equals($scope.cancelBtnText, '取消')) {
                $ionicHistory.goBack();
            } else {
                $scope.hasInputSearchText = true;
            }
        }
        $scope.changeRegion = function (region, idName) {
            //   alert("region：" + region + ",idName:" + idName);
            window.localStorage['currentcity'] = region.name;
            $scope.currentCity = region.name;
            $scope.searchText = '';
            $rootScope.setCity = region.name;
            $ionicScrollDelegate.scrollTop();
        }
        $scope.deleteHistoricItem = function (item) {
            //删除元素
            $scope.historicCities = $scope.remove($scope.historicCities, item);
            $scope.historicArray = $scope.getRowArray($scope.historicCities);
            //阻止事件上传
            return false;
        }
        $scope.remove = function (items, item) {
            if (item.name == window.localStorage['currentcity']) {
                tellMeMapSvr.updateCurrentcity();
                $scope.currentCity = window.localStorage['currentcity'];
            }
            var i = 0;
            for (i = 0; i < items.length; i++) {
                if (item.name == items[i].name) {
                    break;
                }
            }
            items.splice(i, i + 1);
            return items;
        }
        $scope.orderByAlpha = function (items) {
            var orders = [];
            var firstChar = items[0].firstChar;
            var count = 0;
            var i = 0;
            var j = 0;
            while (count < items.length) {
                if (items[count].firstChar !== firstChar) {
                    i++; j = 0;
                    orders[i] = [];
                    firstChar = items[count].firstChar;
                } else {
                    if (count == 0) {
                        orders[i] = [];
                    }
                }
                orders[i][j++] = items[count];
                count++;
            }
            return orders;
        }

        LoadingSvr.show();
        commonSer.updateRegionInfo().then(
            function (data) {
                $scope.hotSearchCities = (window.localStorage['hotSearchCities'] === "") ? undefined : angular.fromJson(window.localStorage['hotSearchCities']);
                $scope.historicCities = (window.localStorage['historicCities'] === "") ? undefined : angular.fromJson(window.localStorage['historicCities']);
                $scope.regionlist = (window.localStorage['regionlist'] === "") ? undefined : angular.fromJson(window.localStorage['regionlist']);
                $scope.hotArray = (typeof ($scope.hotSearchCities) === 'undefined') ? undefined : $scope.getRowArray($scope.hotSearchCities);
                $scope.historicArray = (typeof ($scope.historicCities) === 'undefined') ? undefined : $scope.getRowArray($scope.historicCities);

                $scope.orderRegionList = (typeof ($scope.regionlist) === 'undefined') ? undefined : $scope.orderByAlpha($scope.regionlist);
                LoadingSvr.hide();
            },
            function (data) {
                console.log('获取地域信息失败');
            }
            );

        $scope.cancelBtnText = '取消';
        $scope.hasInputSearchText = false;
        $scope.currentCity = window.localStorage['currentcity'];


    
    }])
 