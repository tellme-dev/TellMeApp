angular.module('tellme')
    .service('checkinSer', ['$http', '$q', '$state', 'appConfig', function ($http, $q,$state, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        var websocket = null;
        //根据酒店id获取酒店的广告
        this.getAds = function (hotelId) {
            var url = baseUrl + 'app/ad/loadAdListByHotelId.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {
                    adParam: JSON.stringify({
                        hotelId: hotelId
                    })
                }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        //查看用户是否有入住信息
        this.getCheckinInfo = function (customerId, regionId) {
            var url = baseUrl + 'app/occupancy/loadHotelByOccupancyInfo.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {
                    param: JSON.stringify({
                        customerId: customerId,
                        regionId: regionId
                    })
                }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        this.getRcusInfo = function (roomId) {
            var url = baseUrl + 'app/rcu/getRoomRCUs.do';
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: {
                    roomInfo: JSON.stringify({
                        roomId: roomId
                    })
                }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        //设置消息返回对象
        var deferred = null;
        //发送操作设别的指令
        this.sendOrder = function (order) {
            //var url = baseUrl + 'app/rcu/sendACOrder.do';
            //var deferred = $q.defer();
            //$http({
            //    method: 'post',
            //    url: url,
            //    data: {
            //        lampOrder: JSON.stringify(order)
            //    }
            //}).success(
            //    function (data, status, headers, config) {
            //        deferred.resolve(data);
            //    }).error(
            //    function (data, status, headers, config) {
            //        deferred.reject(data);
            //    });
            //return deferred.promise;
            if (deferred == null) {
                deferred = $q.defer();
            }
            sendMsg(JSON.stringify(order));
            return deferred.promise;
        }
        //消息返回回调
        function onWsResponse(data) {
            //alert(data);
            if (deferred != null) {
                deferred.resolve(data);
            }
        }

        //创建web socket
        function linkSocket(onlineMsg) {
            if ('WebSocket' in window) {
                var customerId = 0;
                if (typeof (window.localStorage['userTel']) != 'undefined') {
                    customerId = window.localStorage['userId'];
                }
                if (customerId < 1) {
                    $state.go('login', {});
                    return;
                }
                websocket = new WebSocket("ws://112.74.209.133:8080/tellme/appWs/"+customerId);
                websocket.onerror = function (e) {
                    console.log(e);
                };
                websocket.onopen = function (event) {
                    if (typeof (onlineMsg) != "undefined") {
                        websocket.send(onlineMsg);
                    }
                }

                websocket.onmessage = function (event) {
                    console.log(event);
                    var msg = event.data;
                    if (msg != null) {
                        onWsResponse(msg);
                    }
                }

                websocket.onclose = function () {

                }
            }
            else {

            }
            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function () {
                if (websocket != null) {
                    websocket.close();
                }
            }
        }
        //var onlineMsg = "{\"src\": \"app\",\"dst\": \"rcu\",\"type\": \"ctst\",\"serialId\": \"123\",\"sid\": \"sc+cd+hlt+zj\",\"usid\": 11,\"a9\": 100,\"a10\": 100,\"a11\": 100,\"a12\": 100,\"a13\": 100,\"a22\": 100,\"a23\": 100}";
        //初始化WS
        linkSocket();
        //socket消息发送
        this.sendMsg =function(msg) {
            if (websocket != null) {
                websocket.send(msg);
            }
        }
    }]);