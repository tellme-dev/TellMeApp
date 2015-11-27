angular.module('tellme')
    .controller('homeControll', ['$scope', '$state', '$ionicSlideBoxDelegate', 'homeSer', 'appConfig', 'commonSer', 'customerSer', function ($scope, $state, $ionicSlideBoxDelegate, homeSer, appConfig, commonSer, customerSer) {
        /*首页初始化*/
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: true,
            centeredSlides: true,
            slidesPerView: 1.3,
            watchActiveIndex: false
        });
        //获取URL
        $scope.baseUrl = appConfig.server.getUrl();
            // 获取当前位置
            //AMap.service(["AMap.CitySearch"], function () {
            //    //实例化城市查询类
            //    var citysearch = new AMap.CitySearch();
            //    citysearch.getLocalCity(function (status, result) {
            //        if (status === 'complete' && result.info === 'OK') {
            //            if (result && result.city && result.bounds) {
            //                var cityinfo = result.city;
            //                $scope.currentCity = cityinfo;
            //               // console.log('当前城市：' + cityinfo);
            //            }
            //        }
            //    });
            //});

        //广告（头部广告、底部专栏）动态加载
        //获取头部广告信息
            var promise = homeSer.getAdd();
            promise.then(
                   function (data) {
                       
                       if (data.isSuccess) {
                           if (data.rows.length == 0) {
                               console.log("未获取数据！")
                           } else {
                               $scope.adData = data.rows;
                           }
                         
                       } else {
                           console.log("获取数据失败！" + data.msg)
                       }
                      
                   },
                   function (data) {
                       console.log('其他');
                   }
                   );

        //菜单先查询本地是否有保存，没有，动态加载；有，在家本地数据；

        //加载用户头像


        /*跳转“定位页面”*/
        $scope.goToLocation = function () {
            //$state.go('location');
            commonSer.sendSMS('18780173759');
        }
        /*跳转“个人信息页面”*/
        $scope.goToCustomer = function () {
            //$state.go('customer');
            customerSer.register();
        }
        //跳转到搜索页面
        $scope.goToSearch = function () {
            $state.go('');
        }
        /*（点击菜单项）跳转“酒店列表”*/
        $scope.goToHotelList = function (param) {
        }
        /*（点击头部广告）跳转“具体广告”*/
        $scope.goToAd = function (param) {

        }
        /*（点击专题）跳转“具体专题”*/
        $scope.goToTheme = function (param) {

        }
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        }
        
    }]);