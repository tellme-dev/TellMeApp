angular.module('tellme')
    .controller('hotelControll', ['$scope', '$stateParams', '$ionicHistory', '$state', 'hotelSer', 'LoadingSvr', 'popUpSer', 'tellmeActionSheet', function ($scope, $stateParams, $ionicHistory, $state, hotelSer, LoadingSvr, popUpSer, tellmeActionSheet) {
        $scope.hotelId = $stateParams.hotelId;
        $scope.rootTagId = $stateParams.rootTagId;
        $scope.itemId = $stateParams.itemId;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        $scope.itemData = {};
        var itemDatas = null;
        //服务器地址
        $scope.host = hotelSer.hostUrl;
        $scope.rootMenuWidth = "auto";

        //第一次加载是否执行
        //评论数据会在获取数据前执行N次loadMore
        //设置该字段主要是为了在真正获取数据时才去获取数据，而不让其自动调用N次loadMore
        var _comment_data_first_load = false;

        var _MENU_SELECTED_ITEM = null;
        var _CHILD_MENU_SELECTED_ITEM = null;
        //设置1级菜单选择事件
        function setSelectStyle(obj, id, isInit) {
            if (_MENU_SELECTED_ITEM != null) {
                _MENU_SELECTED_ITEM.className = "";
            }
            obj.className = "li-but";
            _MENU_SELECTED_ITEM = obj;
            $scope.getChildMenu(id, isInit);
        }
        function setChildSelectStyle(obj, id) {
            if (_CHILD_MENU_SELECTED_ITEM != null) {
                _CHILD_MENU_SELECTED_ITEM.className = "swiper-container3-sws";
            }
            obj.className = "swiper-container3-sws swiper-container3-border";
            _CHILD_MENU_SELECTED_ITEM = obj;
            setItemData(id);
        }

        //设置数据
        function setItemData(id) {
            if (itemDatas != null && itemDatas.length > 0) {
                for (var i = 0; i < itemDatas.length; i++) {
                    if (itemDatas[i].item.id == id) {
                        $scope.itemData = itemDatas[i];
                        cvm.itemId = $scope.itemData.item.id;
                        cvm.isInit = true;
                        cvm.pageNo = 0;
                        if (!_comment_data_first_load) {
                            _comment_data_first_load = true;
                        }
                        cvm.loadMore();
                        break;
                    }
                }
            }
        }

        //用户收藏项目
        $scope.saveCollection = function (targetId) {
            var customerId = 0;
            if (typeof (window.localStorage['userTel']) != 'undefined') {
                customerId = window.localStorage['userId'];
            }
            if (customerId < 1) {
                $state.go('login', {});
                return;
            }
            var promise = hotelSer.saveCollection(customerId, targetId);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        popUpSer.showAlert("收藏成功");
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        // 分享
        $scope.share = function (title, text, imgUrl) {
            var args = {};
            //args.url = "";
            args.title = title;
            args.description = "";
            args.text = text;
            var imgs = [$scope.host + imgUrl];
            args.imageUrl = imgs;
            args.appName = "挑米科技";
            args.defaultText = "来自挑米科技";
            var shareResult = tellmeActionSheet.show(args);
            if (shareResult == 0) {
            } else if (shareResult == 1) {
                commonSer.saveShare(detail.id);
            } else {
                popUpSer.showAlert('分享出现其他错误');
            }
        }

        //用户点赞项目
        $scope.savePraise = function (targetId) {
            var customerId = 0;
            if (typeof (window.localStorage['userTel']) != 'undefined') {
                customerId = window.localStorage['userId'];
            }
            if (customerId < 1) {
                $state.go('login', {});
                return;
            }
            var promise = hotelSer.savePraise(customerId, targetId);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        popUpSer.showAlert("点赞成功");
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        $scope.commentIds = new Array();
        $scope.comments = new Array();
        $scope.comment = new Array();
        $scope.showComment = function (id) {
            collectionSelected = true;

            /*
             var customerId = 0;
             if (typeof (window.localStorage['userTel']) != 'undefined') {
                 customerId = window.localStorage['userId'];
             }
             if (customerId < 1) {
                 $state.go('login', {});
                 return;
             }
             */

            if ($scope.commentIds[id]) {
                $scope.commentIds[id] = false;
            } else {
                $scope.commentIds[id] = true;
            }
        }

        //用户评论项目
        $scope.saveComment = function (index, targetId) {
            collectionSelected = true;
            var customerId = 0;
            if (typeof (window.localStorage['userTel']) != 'undefined') {
                customerId = window.localStorage['userId'];
            }
            if (customerId < 1) {
                $state.go('login', {});
                return;
            }

            var content = $scope.comments[index];
            if (typeof (content) == "undefined") {
                popUpSer.showAlert("请输入评价内容");
                return;
            }
            if (content.trim() == "") {
                popUpSer.showAlert("请输入评价内容");
                return;
            }
            var promise = hotelSer.saveComment(customerId, targetId, content);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        //popUpSer.showAlert("评论成功");
                        cvm.isInit = true;
                        cvm.pageNo = 0;
                        cvm.loadMore();
                    } else {
                        popUpSer.showAlert(data.msg);
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        $scope.cancelTurn = function () {
            collectionSelected = true;
        }

        //获取1级标题
        $scope.getRootMenu = function () {
            var promise = hotelSer.getRootItemTagByHotelId($scope.hotelId);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        var view = document.getElementById("list");
                        view.innerHTML = "";
                        var menus = data.rows;
                        $scope.rootMenuWidth = (menus.length * 50) + "px";
                        if (menus != null && menus.length > 0) {
                            for (var i = 0; i < menus.length; i++) {
                                var obj = menus[i];
                                var item = document.createElement("li");
                                item.innerHTML = obj.name;
                                view.appendChild(item);
                                new MenuItem(item, obj.id);
                                //初始化选中
                                if ($scope.rootTagId > 0) {
                                    if ($scope.rootTagId == obj.id) {
                                        setSelectStyle(item, obj.id, true);
                                    }
                                } else {
                                    if (i == 0) {
                                        setSelectStyle(item, obj.id, true);
                                    }
                                }
                            }
                        }
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        //获取二级菜单
        $scope.getChildMenu = function (itemTagId, isInit) {
            vm.itemTagId = itemTagId;
            vm.isInit = isInit;
            vm.loadMore();
            
        }
        //设置1级标题
        $scope.getRootMenu();
        //Object
        var MenuItem = function (object, id) {
            //1级标题切换事件
            object.onclick = function () {
                setSelectStyle(object, id, false);
            }
        }

        var ChildMenuItem = function (object, id) {
            //2级标题切换事件
            object.onclick = function () {
                setChildSelectStyle(object, id);
            }
        }

        var vm = $scope.vm = {
            itemTagId: 0,
            isInit: false,
            moredata: false,
            typeDetail: [],
            pageNo: 0,
            pageSize: 5,
            loadMore: function () {
                LoadingSvr.show();
                var promise = hotelSer.itemListByTagRootAndHotel($scope.hotelId, vm.itemTagId);
                promise.then(
                    function (data) {
                        if (data.isSuccess) {
                            if (data.rows.length > 0) {
                                var view = document.getElementById("child_menu_view");
                                view.style.width = (data.rows.length * 82) + "px";
                                view.innerHTML = "";
                                itemDatas = data.rows;
                                for (var i = 0; i < data.rows.length; i++) {
                                    var item = data.rows[i];
                                    var a = document.createElement("a");
                                    a.className = "swiper-container3-sws";
                                    a.innerHTML = "<img src=\"" + $scope.host + item.itemDetail.imageUrl + "\" /><i>" + item.item.name + "</i>";
                                    view.appendChild(a);
                                    new ChildMenuItem(a, item.item.id);
                                    if ($scope.itemId > 0 && vm.isInit) {
                                        if ($scope.itemId == item.item.id) {
                                            setChildSelectStyle(a, item.item.id);
                                        }
                                    } else {
                                        if (i == 0) {
                                            setChildSelectStyle(a, item.item.id);
                                        }
                                    }
                                }
                            } else {
                                document.getElementById("child_menu_view").style.width = "82px";
                            }
                        }
                        LoadingSvr.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },
                    function (data) {
                        console.log('其他');
                    }
                    );
            }
        };

        var cvm = $scope.cvm = {
            itemId: 0,
            isInit: false,
            moredata: false,
            typeDetail: [],
            pageNo: 0,
            pageSize: 10,
            loadMore: function () {
                if (!_comment_data_first_load) {
                    return;
                }
                LoadingSvr.show();
                cvm.pageNo++;
                var promise = hotelSer.commentListByHotelItem(cvm.itemId, cvm.pageNo, cvm.pageSize);
                promise.then(
                    function (data) {
                        LoadingSvr.hide();
                        if (data.isSuccess) {
                            if (cvm.isInit) {
                                $scope.comment = data.rows;
                                cvm.isInit = false;
                            } else {
                                for (var i = 0, len = data.rows.length; i < len; i++) {
                                    $scope.comment.push(data.rows[i]);
                                }
                            }
                            var len = data.total;
                            if (len > cvm.pageNo) {
                                cvm.moredata = false;
                            } else {
                                cvm.moredata = true;
                            }
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.initMap();
                    },
                    function (data) {
                        console.log('其他');
                    }
                    );
            }
        };

        var _map_init = false
        var map;
        $scope.initMap = function () {
            if (!_map_init) {
                if (document.getElementById("positionMap") != null) {
                    map = new AMap.Map("positionMap", {
                        resizeEnable: true,
                        zoom: 13
                    });
                }
            }
            if ($scope.itemData.tagTransport) {
                map.clearMap();
                var lng = $scope.itemData.hotel.longitude;
                var lat = $scope.itemData.hotel.latitude;
                var lna = new AMap.LngLat(lng, lat);
                var marker = new AMap.Marker({ map: map, position: lna, title: $scope.itemData.hotel.name });
                //marker.setAnimation("AMAP_ANIMATION_BOUNCE");
                //var px = new AMap.Pixel(0,-24);
                //marker.setLabel({ content: $scope.itemData.hotel.name, offset: px });
                //new AMap.Marker({ map: map, position: lna, content: $scope.itemData.hotel.name });
                map.panTo(lna);

            }
        }
    }]);