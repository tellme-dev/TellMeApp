﻿angular.module('tellme', ['ionic'])
    .run(['$ionicPlatform', '$rootScope', 'commonSer', function ($ionicPlatform, $rootScope, commonSer) {
        $ionicPlatform.ready(function () {

        })
        var onDeviceReady = function () {
            var appLaunchCount = window.localStorage.getItem('launchCount');
            if (appLaunchCount) {
                
            } else {
                window.localStorage.setItem('launchCount', 1);
            }
            setTimeout(function () {
                navigator.splashscreen.hide();
            }, 4000);
        }
        document.addEventListener("deviceready", onDeviceReady, false);


    }])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider ) {
            $stateProvider
               //test
                .state('test', { url: '/test', templateUrl: 'app/test/test.html', controller: 'testControll' })
            //首次启动页面
            .state('start', { url: '/start', templateUrl: 'app/start/start.html', controller: 'startControll' })
            //首页
            .state('home', {  url: '/home', templateUrl: 'app/home/home.html', controller: 'homeControll' })
            //个人中心
            .state('customer', { url: '/center', templateUrl: 'app/customer/center/center.html', controller: 'customerCenterControll' })
            .state('login', { url: '/login/?pageName', templateUrl: 'app/customer/login/login.html', controller: 'loginControll' })
            .state('register', { url: '/register', templateUrl: 'app/customer/register/register.html', controller: 'registerControll' })

            //定位
            .state('location', { url: '/location', templateUrl: 'app/map/location/cities.html', controller: '' })//mapLocationControll
            .state('map', { url: '/map', templateUrl: 'app/map/map/map.html', controller: 'mapControll' })

            //论坛
            .state('bbsHome', { url: '/bbsHome', templateUrl: 'app/bbs/main/main.html', controller: 'bbsMainControll' })
            .state('bbsList', { url: '/bbsList', templateUrl: 'app/bbs/list/bbs-list.html', controller: 'bbsListControll' })
            .state('bbs', { cache: false, url: '/bbs/?bbsId', templateUrl: 'app/bbs/single/bbs.html', controller: 'bbsControll' })
            .state('addBbs', { url: '/addBbs', templateUrl: 'app/bbs/addbbs/addbbs.html', controller: 'addBbsControll' })

            //酒店
             .state('hotelList', { url: '/hotelList', templateUrl: 'app/hotel/list/list.html', controller: 'hotelListControll' })
             .state('hotel', { url: '/hotel?hotelId', templateUrl: 'app/hotel/single/hotel.html', controller: 'hotelControll' })
             .state('hotelItem', { url: '/hotelItem?itemId', templateUrl: 'app/hotel/hotel-item/hotel-item.html', controller: 'hotelItemControll' })
            //广告
            .state('adList', { url: '/adList?adInfo', templateUrl: 'app/ad/list/ad-list.html', controller: 'adListControll' })
            //发现 
            .state('discoverList', { url: '/discoverList', templateUrl: 'app/discover/list/discover-list.html', controller: 'discoverControll' })
           // 社区
           .state('communityList', { url: '/communityList', templateUrl: 'app/community/list/community-list.html', controller: 'communityControll' })
            //搜索
            .state('willSearch', { url: '/willSearch', templateUrl: 'app/search/will/willSearch.html', controller: 'willSearchControll' })
            .state('doneSearch', { url: '/doneSearch', templateUrl: 'app/search/done/doneSearch.html', controller: 'doneSearchControll' })
            ;
            var appLaunchCount = window.localStorage.getItem('launchCount');
            if (appLaunchCount) {
                $urlRouterProvider.otherwise('/hotelItem');
            } else {
                $urlRouterProvider.otherwise('/communityList');
            }
        //}
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