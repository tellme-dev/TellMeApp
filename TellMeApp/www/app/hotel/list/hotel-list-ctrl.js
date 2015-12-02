angular.module('tellme')
    .controller('hotelListControll', ['$scope', '$window', 'hotelSer', function ($scope, $window, hotelSer) {
        var _MENU_SELECTED_ITEM = null;

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
            $scope.getHotelList(1,id);
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
                                if (i == 0) {
                                    setSelectStyle(item, obj.itemTagId);
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
                        $scope.menus = data.rows;
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        //获取酒店列表
        $scope.getHotelList = function (page, itemTagId) {
            var promise = hotelSer.getHotelList(page, itemTagId);
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

        //用户收藏酒店
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
    }]);