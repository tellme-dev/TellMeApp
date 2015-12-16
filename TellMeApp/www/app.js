angular.module('tellme', ['ionic', 'FtActionSheet'])
    .run(['$ionicPlatform', '$rootScope', 'commonSer', function ($ionicPlatform, $rootScope, commonSer) {
        $ionicPlatform.ready(function () {

        })
        var onDeviceReady = function () {
            //判断是否用户登录
            var userId = window.localStorage.getItem('userId');
            if (!userId) {
                //没有，则设置为游客，id为0
                window.localStorage.getItem('userId') = 0;
            }
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
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','$ionicConfigProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('bottom');

            $stateProvider
            //test
            .state('test', { url: '/test', templateUrl: 'app/test/test.html', controller: 'testControll', abstract: true })
            //首次启动页面
            .state('start', { url: '/start', templateUrl: 'app/start/start.html', controller: 'startControll' })
            //menu
            .state('menu', { url: '/menu', templateUrl: 'app/menu.html', controller: 'menuControll' })
                //首页
                //.state('menu.home', { url: '/home', templateUrl: 'app/home/home.html', controller: 'homeControll' })
                .state('menu.home', { url: '/home', views: { 'home-tab': { templateUrl: 'app/home/home.html', controller: 'homeControll' } } })
                
                  //.state('menu.home.banner',{url:'/banner',views:{'home-banner':{templateUrl:'app/home/banner/banner.html',controller:'bannerControll'}}})
                  //.state('menu.home.swiper',{url:'/swiper',views:{'home-swiper':{templateUrl:'app/home/swiper/swiper.html',controller:'swiperControll'}}})
                  //.state('menu.home.topic',{url:'/topic',views:{'home-topic':{templateUrl:'app/home/topic/topic.html',controller:'topicControll'}}})
                //发现
               // .state('menu.discoverList', { cache: false, url: '/discoverList', templateUrl: 'app/discover/list/discover-list.html', controller: 'discoverListControll' })
                 .state('menu.discoverList', { cache: false, url: '/discoverList', views: { 'discovery-tab': { templateUrl: 'app/discover/list/discover-list.html', controller: 'discoverListControll' } } })
                // 社区
                //.state('menu.communityList', { cache: false, url: '/communityList', templateUrl: 'app/community/list/community-list.html', controller: 'communityControll' })
                .state('menu.communityList', { cache: false, url: '/communityList', views: { 'community-tab': { templateUrl: 'app/community/list/community-list.html', controller: 'communityControll' } } })
                //入住
                .state('menu.rcu', { url: '/rcu', views: { 'rcu-tab': { templateUrl: 'app/rcu/rcu.html', controller: 'rcuControll' } } })

            //个人中心
            .state('customer', { url: '/center', templateUrl: 'app/customer/center/center.html', controller: 'customerCenterControll' })
            .state('login', { url: '/login?pageName', templateUrl: 'app/customer/login/login.html', controller: 'loginControll' })
            .state('register', { url: '/register', templateUrl: 'app/customer/register/register.html', controller: 'registerControll' })
          //个人中心 设置
            .state('system', { url: '/system', templateUrl: 'app/customer/system/system.html', controller: 'systemControll' })
            .state('feedback', { url: '/feedback', templateUrl: 'app/customer/feedback/feedback.html', controller: 'feedbackControll' })
            .state('data', { cache: false, url: '/data', templateUrl: 'app/customer/data/data.html', controller: 'dataControll' })
            .state('editMobile', { url: '/editMobile', templateUrl: 'app/customer/data/edit-mobile.html', controller: 'registerControll' })
            .state('discuss', { url: '/discuss', templateUrl: 'app/customer/center/discuss/discuss.html', controller: 'discussControll' })
            .state('agree', { url: '/agree', templateUrl: 'app/customer/center/agree/agree.html', controller: 'agreeControll' })
            //定位
            .state('location', { cache: false, url: '/location', templateUrl: 'app/map/location/cities.html', controller: 'mapLocationControll' })//mapLocationControll
            .state('map', { url: '/map', templateUrl: 'app/map/map/map.html', controller: 'mapControll' })

            //论坛
            .state('bbsHome', { url: '/bbsHome', templateUrl: 'app/bbs/main/main.html', controller: 'bbsMainControll' })
            .state('bbsList', { url: '/bbsList', templateUrl: 'app/bbs/list/bbs-list.html', controller: 'bbsListControll' })
            .state('bbs', { cache: false, url: '/bbs?bbsId', templateUrl: 'app/bbs/single/bbs.html', controller: 'bbsControll' })
            .state('addBbs', { cache: false, url: '/addBbs', templateUrl: 'app/bbs/addbbs/addbbs.html', controller: 'addBbsControll' })
            .state('imageBrowse', { cache: false, url: '/imageBrowse?bbsId', templateUrl: 'app/bbs/image/imageBrowse.html', controller: 'imageBrowseControll' })

            //酒店
             .state('hotelList', { url: '/hotelList', templateUrl: 'app/hotel/list/list.html', controller: 'hotelListControll' })
             .state('hotel', { url: '/hotel?hotelId', templateUrl: 'app/hotel/single/hotel.html', controller: 'hotelControll' })
             .state('hotelItem', { url: '/hotelItem?itemId', templateUrl: 'app/hotel/hotel-item/hotel-item.html', controller: 'hotelItemControll' })
            //广告
            .state('adList', { url: '/adList?adInfo', templateUrl: 'app/ad/list/ad-list.html', controller: 'adListControll' })

            //搜索
            .state('willSearch', { url: '/willSearch', templateUrl: 'app/search/will/willSearch.html', controller: 'willSearchControll'})
            .state('doneSearch', { url: '/doneSearch', templateUrl: 'app/search/done/doneSearch.html', controller: 'doneSearchControll'})

            ;
            var appLaunchCount = window.localStorage.getItem('launchCount');
            //需要进行页面测试，则修改下面的路由即可
            if (appLaunchCount) {
                $urlRouterProvider.otherwise('/menu');
            } else {
                $urlRouterProvider.otherwise('/start');
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
