angular.module('tellme')
    .controller('willSearchControll', ['$scope', '$ionicHistory', '$timeout', '$state', 'LoadingSvr', 'searchSer', 'appConfig', 'popUpSer', function ($scope, $ionicHistory,$timeout, $state, LoadingSvr, searchSer, appConfig, popUpSer) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.cancelBtnText = '取消';
        //是否进行搜索，进行页面的转换
        $timeout(function () {
            $scope.autoFocus = true;
        }, 500);
        $scope.hasSearch = false;
        $scope.hasResult = false;
        $scope.hasResultOfHotel = false;
        $scope.hasResultOfBbs = false;
        $scope.textMaxLength = 10;
        $scope.func = {};
        $scope.func.filterBbsText = function (textStr) {
            if (textStr.length > $scope.textMaxLength) {
                return true;
            } else {
                return false;
            }
        }
        //对搜索输入内容进行监视，用于切换按钮的显示内容
        $scope.$watch('searchText', function (newValue, oldValue) {
            if (typeof (newValue) == 'undefined' || angular.equals(newValue, '')) {
                $scope.cancelBtnText = '取消';
            } else {
                $scope.cancelBtnText = '搜索';
            }
        });
        LoadingSvr.show();
        var promise = searchSer.getRecommandHotels();
        promise.then(
            function (data) {
                if (typeof (data.rows) != 'undefined') {
                    LoadingSvr.hide();
                    $scope.recommandHotels = data.rows;
                } else {
                    console.log(data.msg);
                }
            },
            function (data) {
                popUpSer.showAlert("未知错误");
                console.log('异常');
            });

        var isString = function (value) { return typeof value == 'string'; };

        var trim = function (value) {
            if (!isString(value)) return value;

            if (!String.prototype.trim) return value.replace(/^\s*/, '').replace(/\s*$/, '');

            return String.prototype.trim.apply(value);
        };
        //点击"取消"或者"搜索"按钮
        $scope.cancelOrsearch = function () {

            if (angular.equals($scope.cancelBtnText, '取消')) {
                $ionicHistory.goBack();
            } else {
                var search = $scope.searchText.replace(/\s+/g, "");
                $scope.hasSearch = true;
                LoadingSvr.show();
                //调用接口进行查询

                var promise1 = searchSer.fullTextSearchOfHotel(search);
                promise1.then(
                    function (data) {
                        $scope.searchHotels = data.rows;
                        if (typeof ($scope.searchHotels) == 'undefined' || $scope.searchHotels.length == 0) {
                            $scope.hasResultOfHotel = false;
                        } else {
                            $scope.hasResultOfHotel = true;
                        }
                        LoadingSvr.hide();
                    },
                    function (data) {
                        $scope.hasResultOfHotel = false;
                    });
                var promise2 = searchSer.fullTextSearchOfBbs(search);
                promise2.then(
                    function (data) {
                        $scope.searchBbss = data.rows;
                        if (typeof ($scope.searchBbss) == 'undefined' || $scope.searchBbss.length == 0) {
                            $scope.hasResultOfBbs = false;
                        } else {
                            $scope.hasResultOfBbs = true;
                        }
                        LoadingSvr.hide();
                    },
                    function (data) {
                        $scope.hasResultOfBbs = false;
                    });

            }
        }

        $scope.goToHotelInfo = function (hotelId) {
            $state.go('hotel', { hotelId: hotelId, rootTagId: 1 });
        }
        $scope.goToBbsInfo = function (bbsId) {
            $state.go('bbs', { bbsId: bbsId });
        }
    }])
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });