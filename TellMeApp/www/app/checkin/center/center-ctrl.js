angular.module('tellme')
    .controller('checkinCenterControll', ['$scope', '$state', 'checkinSer', 'appConfig', function ($scope, $state, checkinSer, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();
        //调用入住接口判断是否有入住信息

        //有，则获取入住的相关内容
        //没有，则获得一个酒店列表
        $scope.hasCheckIn = true;

        $scope.hotel = {
            name: "成都环球中心天堂洲际大饭店",
            id:2
        };
        var promise = checkinSer.getAds($scope.hotel.id);
        promise.then(
            function (data) {
                if (typeof (data.rows) === 'undefined') {
                    console.log('酒店没有广告');
                    $scope.adData = undefined;
                } else {
                    $scope.adData = data.rows;
                }
            },
            function (data) {
                $scope.adData = undefined;
                alert('获取酒店广告失败');
            });

        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
        $scope.goToRCU = function () {
            $state.go('rcu');
        }
        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            $state.go('location');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            if (typeof (window.localStorage['userTel']) == 'undefined' || window.localStorage['userTel'] == "") {//如果用户未登录跳转到登录页面
                $state.go('login', { pageName: 'customer' });
            } else {
                $state.go('customer');
            }

        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('willSearch');
        }
    }])
