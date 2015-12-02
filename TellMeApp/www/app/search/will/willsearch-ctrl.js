angular.module('tellme')
    .controller('willSearchControll', ['$scope', '$ionicHistory', 'LoadingSvr', 'searchSer', 'appConfig', function ($scope, $ionicHistory, LoadingSvr, searchSer, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();
        $scope.cancelBtnText = '取消';
        //是否进行搜索，进行页面的转换
        $scope.hasSearch = false;
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
                if (data.isSuccess == true) {
                    LoadingSvr.hide();
                    $scope.recommandHotels = data.rows;
                } else {
                    console.log(data.msg);
                }
            },
            function (data) {
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
                var promise = searchSer.fullTextSearch($scope.searchText);
                promise.then(
                    function (data) {
                        
                        LoadingSvr.hide();
                    },
                    function (data) {
                        $scope.hasSearch = false;
                    });
                
            }
        }

    }]);