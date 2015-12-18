angular.module('tellme')
    .controller('hotelListControll', ['$scope', '$window', '$stateParams', 'hotelSer', function ($scope, $window, $stateParams, hotelSer) {
        var param_tagId = $stateParams.itemTagId;

        var _MENU_SELECTED_ITEM = null;
        var _CHILD_MENU_SELECTED_ITEM = null;

        var pageSize = 5;

        //酒店列表数据
        $scope.list = null;
        //二级菜单图片数据
        $scope.menus = null;
        //服务器地址
        $scope.host = hotelSer.hostUrl;
        //后退
        $scope.$window = $window;
        $scope.go_back = function () {
            $window.history.back();
        };
        //设置1级菜单选择事件
        function setSelectStyle(obj, id) {
            if (_MENU_SELECTED_ITEM != null) {
                _MENU_SELECTED_ITEM.className = "";
            }
            obj.className = "li-but";
            _MENU_SELECTED_ITEM = obj;
            $scope.getChildMenu(id);
        }

        function setChildSelectStyle(obj, id) {
            if (_CHILD_MENU_SELECTED_ITEM != null) {
                _CHILD_MENU_SELECTED_ITEM.className = "swiper-container3-sws";
            }
            obj.className = "swiper-container3-sws swiper-container3-border";
            _CHILD_MENU_SELECTED_ITEM = obj;
            $scope.getItemList(1,id);
        }

        //获取1级标题
        $scope.getRootMenu = function () {
            var promise = hotelSer.getRootMenu();
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        var view = document.getElementById("list");
                        view.innerHTML = "";
                        var menus = data.rows;
                        if (menus != null && menus.length > 0) {
                            for (var i = 0; i < menus.length; i ++){
                                var obj = menus[i];
                                var item = document.createElement("li");
                                item.innerHTML = obj.name;
                                view.appendChild(item);
                                new MenuItem(item, obj.itemTagId);
                                //初始化选中
                                if (param_tagId > 0) {
                                    if (param_tagId == obj.itemTagId) {
                                        setSelectStyle(item, obj.itemTagId);
                                    }
                                } else {
                                    if (i == 0) {
                                        setSelectStyle(item, obj.itemTagId);
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
        $scope.getChildMenu = function (itemTagId) {
            var promise = hotelSer.getChildMenu(itemTagId);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        //$scope.menus = data.rows;
                        if (data.rows.length > 0) {
                            //alert(data.rows.length);
                            var view = document.getElementById("child_menu_view");
                            view.style.width = (data.rows.length * 82) + "px";

                            view.innerHTML = "";
                            for (var i = 0; i < data.rows.length; i ++){
                                var menu = data.rows[i];
                                var a = document.createElement("a");
                                a.className = "swiper-container3-sws";
                                a.innerHTML = "<img src=\"" + $scope.host + menu.defaultImageUrl + "\" /><i>" + menu.name + "</i>";
                                view.appendChild(a);
                                new ChildMenuItem(a, menu.itemTagId);
                                if (i == 0) {
                                    setChildSelectStyle(a, menu.itemTagId);
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

        //获取酒店列表
        $scope.getItemList = function (page, itemTagId) {
            var promise = hotelSer.getItemList(page, pageSize, itemTagId);
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.list = data.rows;
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        //用户收藏项目
        $scope.saveCollection = function (targetId) {
            var customerId = 0;
            if (typeof(window.localStorage['userId']) != 'undefined') {
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

        ////页面初始加载
        var myScroll;
        var length = document.getElementById("list").getElementsByTagName("li").length;		//导航li的数量，若从后台读取可不要本行
        var scroll_width = length * 80 + "px";
        document.getElementById("scroller").style.width = scroll_width;
        //此处，从后台读取时，先如上行重置scroller的宽度后，再把内容放到容器中，再执行下一行
        myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        var mySwiper1 = new Swiper('#header', {
            freeMode: true,
            slidesPerView: 'auto',
        });
      
        //设置1级标题
        $scope.getRootMenu();

        //Object
        var MenuItem = function (object, id) {
            //1级标题切换事件
            object.onclick = function () {
                setSelectStyle(object, id);
            }
        }

        var ChildMenuItem = function (object, id) {
            //2级标题切换事件
            object.onclick = function () {
                setChildSelectStyle(object, id);
            }
        }
    }]);