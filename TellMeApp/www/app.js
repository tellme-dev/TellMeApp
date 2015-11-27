angular.module('tellme', ['ionic'])
    .run(['$ionicPlatform', '$rootScope', 'commonSer', function ($ionicPlatform, $rootScope, commonSer) {
        $ionicPlatform.ready(function () {
        })



    }])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider ) {
        $stateProvider
            //首次启动页面
            .state('start', { url: '/start', templateUrl: 'app/start/start.html', controller: 'startControll' })
            //首页
            .state('home', {  url: '/home', templateUrl: 'app/home/home.html', controller: 'homeControll' })
            //个人中心
            .state('customer', { url: '/center', templateUrl: 'app/customer/center/center.html', controller: 'customerCenterControll' })
            .state('login', { url: '/login', templateUrl: 'app/customer/login/login.html', controller: 'loginControll' })
            .state('register', { url: '/register', templateUrl: 'app/customer/register/register.html', controller: 'registerControll' })

            //定位
            .state('location', { url: '/location', templateUrl: 'app/map/location/cities.html', controller: '' })//mapLocationControll
            .state('map', { url: '/map', templateUrl: 'app/map/map/map.html', controller: 'mapControll' })

            //论坛
            .state('bbsHome', { url: '/bbsHome', templateUrl: 'app/bbs/main/main.html', controller: 'bbsMainControll' })
            .state('bbsList', { url: '/bbsList', templateUrl: 'app/bbs/list/bbs-list.html', controller: 'bbsListControll' })
            .state('bbs', { url: '/bbs', templateUrl: 'app/bbs/single/bbs.html', controller: 'bbsControll' })

            //酒店
             .state('hotelList', { url: '/hotelList', templateUrl: 'app/hotel/list/list.html', controller: 'hotelListControll' })
            .state('hotel', {url: '/hotel', templateUrl: 'app/hotel/single/hotel.html', controller: 'hotelControll' })
            //广告
            .state('hotelAd', { url: '/hotelAd', templateUrl: 'app/ad/hotel/hotelAd.html', controller: 'adHotelControll' })
            .state('themeCardAd', { url: '/themeCardAd', templateUrl: 'app/ad/theme/card/themeList.html', controller: 'adThemeListControll' })
            .state('themeAd', { url: '/themeAd', templateUrl: 'app/ad/theme/single/themeAd.html', controller: 'adThemeControll' })
            //发现 
            .state('discoverList', { url: '/discoverList', templateUrl: 'app/discover/list/discover-list.html', controller: 'discoverControll' })
           // 社区
           .state('communityList', { url: '/communityList', templateUrl: 'app/community/list/community-list.html', controller: 'communityControll' })
        ;
        if (typeof (window.localStorage['isFirstStart']) == 'undefined' || window.localStorage['isFirstStart'] == true) {
            window.localStorage['isFirstStart'] = false;
            navigator.splashscreen.hide();
            $urlRouterProvider.otherwise('/start');
        } else {
            $urlRouterProvider.otherwise('/home');
        }
        /*修改put 和 post 的数据传递方式*/
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /*修改默认的transformRequest 否则后台收不到值 */
        $httpProvider.defaults.transformRequest = [function (data) {

            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                                   + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }]);