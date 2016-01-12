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
        $scope.childMenuWidth = "auto";

        //第一次加载是否执行
        //评论数据会在获取数据前执行N次loadMore
        //设置该字段主要是为了在真正获取数据时才去获取数据，而不让其自动调用N次loadMore
        var _comment_data_first_load = false;

        //一级菜单数据
        var rootMenuSelectIndex = -1;
        $scope.rootMenuArray = new Array();
        //2级菜单数据
        var childMenuSelectIndex = -1;
        $scope.childMenuArray = new Array();
        
        //设置1级菜单选择事件
        $scope.rootMuneSelected = function (index) {
            if (rootMenuSelectIndex < 0) {
                return;
            }
            if (rootMenuSelectIndex == index) {
                return;
            }
            cloneRefresh(index);
            //$scope.rootMenuArray[rootMenuSelectIndex].cName = "";
            //$scope.rootMenuArray[index].cName = "li-but";
            rootMenuSelectIndex = index;
            $scope.getChildMenu($scope.rootMenuArray[index].data.id, false);
        }

        function cloneRefresh(index) {
            var temp = new Array();
            var len = $scope.rootMenuArray.length;
            for (var i = 0; i < len; i++) {
                var rmi = $scope.rootMenuArray[i];
                if (i == index) {
                    rmi = new RootMenuItem(i, $scope.rootMenuArray[i].data, "li-but");
                }
                if (i == rootMenuSelectIndex) {
                    rmi = new RootMenuItem(i, $scope.rootMenuArray[i].data, "");
                }
                //temp[i] = $scope.rootMenuArray[i];
                temp.push(rmi);
            }
            $scope.rootMenuArray = [];
            $scope.rootMenuArray = temp;
            temp = null;
        }

        $scope.childMuneSelected = function (index) {
            if (childMenuSelectIndex < 0) {
                return;
            }
            if (childMenuSelectIndex == index) {
                return;
            }
            $scope.childMenuArray[childMenuSelectIndex].cName = "swiper-container3-sws";
            $scope.childMenuArray[index].cName = "swiper-container3-sws swiper-container3-border";
            childMenuSelectIndex = index;
            setItemData($scope.childMenuArray[index].data.item.id);
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
                        $scope.saveBrowse(id);
                        break;
                    }
                }
            }
        }

        //用户浏览项目
        $scope.saveBrowse = function (targetId) {
            var customerId = 0;
            if (typeof (window.localStorage['userTel']) != 'undefined') {
                customerId = window.localStorage['userId'];
            }
            if (customerId < 1) {
                return;
            }
            var promise = hotelSer.saveBrowse(customerId, targetId);
            promise.then(
                function (data) {
                    //if (data.isSuccess) {
                    //    popUpSer.showAlert("浏览成功");
                    //} else {
                    //    popUpSer.showAlert(data.msg);
                    //}
                },
                function (data) {
                    console.log('其他');
                }
                );
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
                        $scope.comments[index] = "";
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
                        $scope.rootMenuArray = [];
                        var menus = data.rows;
                        $scope.rootMenuWidth = (menus.length * 50) + "px";
                        if (menus != null && menus.length > 0) {
                            for (var i = 0; i < menus.length; i++) {
                                var obj = menus[i];
                                var rmi = new RootMenuItem(i, obj, "");

                                //初始化选中
                                if ($scope.rootTagId > 0) {
                                    if ($scope.rootTagId == obj.id) {
                                        rmi.cName = "li-but";
                                        rootMenuSelectIndex = i;
                                        $scope.getChildMenu(obj.id, true);
                                    }
                                } else {
                                    if (i == 0) {
                                        rmi.cName = "li-but";
                                        rootMenuSelectIndex = 0;
                                        $scope.getChildMenu(obj.id, true);
                                    }
                                }
                                $scope.rootMenuArray.push(rmi);
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
                            $scope.childMenuArray = [];
                            if (data.rows.length > 0) {

                                $scope.childMenuWidth = (data.rows.length * 82) + "px";
                                itemDatas = data.rows;
                                for (var i = 0; i < data.rows.length; i++) {
                                    var item = data.rows[i];
                                    var rmi = new RootMenuItem(i, item, "swiper-container3-sws");
                                    if ($scope.itemId > 0 && vm.isInit) {
                                        if ($scope.itemId == item.item.id) {
                                            childMenuSelectIndex = i;
                                            rmi.cName = "swiper-container3-sws swiper-container3-border";
                                            setItemData(item.item.id);
                                        }
                                    } else {
                                        if (i == 0) {
                                            childMenuSelectIndex = 0;
                                            rmi.cName = "swiper-container3-sws swiper-container3-border";
                                            setItemData(item.item.id);
                                        }
                                    }
                                    $scope.childMenuArray.push(rmi);
                                }
                            } else {
                                $scope.childMenuWidth = "82px";
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
            moredata: true,
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

        var RootMenuItem = function (index, data, cName) {
            this.index = index;
            this.data = data;
            this.cName = cName;
        }
    }]);