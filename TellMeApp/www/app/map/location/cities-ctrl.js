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
            name: '广州',
            id: 4
        }, {
            name: '成都',
            id: 5
        }, {
            name: '深圳',
            id: 6
        }];
        $scope.historicCities = $scope.hotSearchCities;

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
            window.localStorage['currentcity'] = name;
            $scope.currentCity = window.localStorage['currentcity'];
        }
    }])