angular.module('tellme')
    .controller('willSearchControll', ['$scope', '$ionicHistory', '$state', 'LoadingSvr', 'searchSer', 'appConfig', 'popUpSer', function ($scope, $ionicHistory, $state, LoadingSvr, searchSer, appConfig, popUpSer) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.cancelBtnText = '取消';
        //是否进行搜索，进行页面的转换
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
            if (typeof (newValue) =='undefined' || angular.equals(newValue, '')) {
                $scope.cancelBtnText = '取消';
            } else {
                $scope.cancelBtnText = '搜索';
            }
        });
        LoadingSvr.show();
        var promise = searchSer.getRecommandHotels();
        promise.then(
            function (data) {
                if (typeof(data.rows)!='undefined') {
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
        //点击"取消"或者"搜索"按钮
        $scope.cancelOrsearch = function () {

            if (angular.equals($scope.cancelBtnText, '取消')) {
                $ionicHistory.goBack();
            } else {
                $scope.hasSearch = true;
                LoadingSvr.show();
                //调用接口进行查询
                var promise1 = searchSer.fullTextSearchOfHotel($scope.searchText);
                promise1.then(
                    function (data) {
                        $scope.hasResultOfHotel = true;
                        $scope.searchHotels = data.rows;
                        LoadingSvr.hide();
                    },
                    function (data) {
                        $scope.hasResultOfHotel = false;
                    });
                var promise2 = searchSer.fullTextSearchOfBbs($scope.searchText);
                promise2.then(
                    function (data) {
                        $scope.hasResultOfBbs = true;
                        $scope.searchBbss = data.rows;
                        LoadingSvr.hide();
                    },
                    function (data) {
                        $scope.hasResultOfBbs = false;
                    });
                
            }
        }

        $scope.goToHotelInfo = function (hotelId) {
            $state.go('hotel', { hotelId: hotelId, rootTagId:1 });
        }
        $scope.goToBbsInfo = function (bbsId) {
            $state.go('bbs', { bbsId: bbsId });
        }
    }]);