angular.module('tellme')
    .controller('hotelControll', ['$scope', '$stateParams', '$ionicHistory', 'hotelSer', function ($scope, $stateParams, $ionicHistory, hotelSer) {
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
                        break;
                    }
                }
            }
        }

        //用户收藏项目
        $scope.saveCollection = function (targetId) {
            var customerId = 0;
            if (typeof (window.localStorage['userId']) != 'undefined') {
                customerId = window.localStorage['userId'];
            }
            if (customerId < 1) {
                alert("请先登录");
                return;
            }
            var promise = hotelSer.saveCollection(customerId, targetId);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        alert("收藏/关注成功");
                    } else {
                        alert(data.msg);
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
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
            var promise = hotelSer.itemListByTagRootAndHotel($scope.hotelId, itemTagId);
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
                                if ($scope.itemId > 0 && isInit) {
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
                },
                function (data) {
                    console.log('其他');
                }
                );
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
    }]);