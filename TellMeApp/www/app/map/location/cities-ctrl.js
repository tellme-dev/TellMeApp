angular.module('tellme')
    .controller('mapLocationControll', ['$scope', '$ionicHistory', 'tellMeMapSvr', function ($scope, $ionicHistory, tellMeMapSvr) {
        //$('.dw-row-sr button').children().click(function () {
        //    $(this).parent().remove()
        //})
        $scope.cancelBtnText = '取消';
        $scope.hasInputSearchText = false;
        $scope.currentCity = window.localStorage['currentcity'];
        $scope.hotSearchCities = [{
            name: '广州',
            id: 1
        }, {
            name: '成都',
            id: 2
        }, {
            name: '深圳',
            id: 3
        }, {
            name: '南昌',
            id: 4
        }, {
            name: '武汉',
            id: 5
        }, {
            name: '长沙',
            id: 6
        }];
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

        $scope.hotArray = $scope.getRowArray($scope.hotSearchCities);

        $scope.historicCities = $scope.hotSearchCities;
        $scope.historicArray = $scope.getRowArray($scope.historicCities);

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
        $scope.regionlist = [
            {
                id: 1,
                name: '鞍山',
                pingyin: 'anshan',
                firstChar: 'A'
            }, {
                id: 2,
                name: '安阳',
                pingyin: 'anyang',
                firstChar: 'A'
            },{
                id: 3,
                name: '亳州',
                pingyin: 'bozhou',
                firstChar: 'B'
            }, {
                id: 4,
                name: '南康',
                pingyin: 'nankang',
                firstChar: 'N'
            }, {
                id: 5,
                name: '南充',
                pingyin: 'nanchong',
                firstChar: 'N'
            }
        ];
        $scope.orderRegionList = $scope.orderByAlpha($scope.regionlist);
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        //GPS
        $scope.updateCity = function () {
            tellMeMapSvr.updateCurrentcity();
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

        $scope.changeRegion = function (region) {
            window.localStorage['currentcity'] = region.name;
            $scope.currentCity = region.name;
            $scope.searchText = '';
        }
        $scope.deleteHistoricItem = function (item) {
            //删除元素
            $scope.historicCities = $scope.remove($scope.historicCities, item);
            $scope.historicArray = $scope.getRowArray($scope.historicCities);
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
    }])