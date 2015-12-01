angular.module('tellme')
    .controller('hotelListControll', ['$scope', '$window', 'hotelSer', function ($scope, $window, hotelSer) {
        var _MENU_SELECTED_ITEM = null;

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
                        var view = document.getElementById("child_menu_item_view");
                        var menus = data.rows;
                        var views = "";
                        if (menus != null && menus.length > 0) {
                            for (var i = 0; i < menus.length; i++) {
                                var obj = menus[i];
                                //加入样式后无法正常显示图片
                                //views += "<div class=\"swiper-slide\"><a href=\"#\"><img src=\"" + hotelSer.hostUrl + obj.name + "\" /></a></div>";
                                views += "<div><a href=\"#\"><img src=\"" + hotelSer.hostUrl + obj.name + "\" /></a></div>";
                            }
                        }
                        view.innerHTML = views;
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
                        var view = document.getElementById("hotel_list_view");
                        var hotels = data.rows;
                        var views = "";
                        if (hotels != null && hotels.length > 0) {
                            for (var i = 0; i < hotels.length; i++) {
                                var obj = hotels[i];
                                var projects = "";
                                var pros = obj.projects;
                                if (pros != null && pros.length > 0) {
                                    for (var j = 0; j < pros.length; j++) {
                                        projects += "<li><a href=\"#\">" + pros[j].name + "</a></li>";
                                    }
                                }
                                views += "<div class=\"list card item-mb\">"
                                + "<div class=\"item item-avatar\">"
                                + "<img src=\"http://www.runoob.com/try/demo_source/mcfly.jpg\" />"
                                + "<h2 style=\"\">" + obj.name + "</h2>"
                                + "<button class=\"bu-er\" ng-click=\"saveCollection(" + obj.id + ");\">"
                                + "关 注"
                                + "</button>"
                                + "</div>"
                                + "<div class=\"item item-body item-body-top\">"
                                + "<img class=\"full-image\" src=\"" + hotelSer.hostUrl + obj.imgUrl + "\">"
                                + "<div class=\"pad-cont\">"
                                + "<ul class=\"ul-float-li\">"
                                + "<li><i class=\"ion ion-ios-pricetag\"></i></li>"
                                + "<li><a href=\"#\" class=\"back\">" + obj.city + "</a></li>"
                                + projects
                                + "</ul>"
                                + "<div class=\"clear\"></div>"
                                + "<p class=\"p-te\">"
                                + "<span>" + obj.name + "</span>"
                                + "</p>"
                                + "<p>入住舒适度：" + obj.score + "分</p>"
                                + "<p>" + obj.address + "</p>"
                                + "<p>房间数：[暂无相关数据]</p>"
                                + "</div>"
                                + "</div>"
                                + "<div class=\"item tabs tabs-secondary tabs-icon-left\">"
                                + "<a class=\"tab-item\" href=\"#\">"
                                + "<i class=\"icon ion-chatbox\"></i>"
                                + "</a>"
                                + "<a class=\"tab-item\" href=\"#\">"
                                + "<i class=\"icon ion-share\"></i>"
                                + "</a>"
                                + "<a class=\"tab-item\" href=\"#\">"
                                + "<i class=\"icon ion-thumbsup\"></i>"
                                + "</a>"
                                + "<a class=\"tab-item\" href=\"#\" ng-click=\"saveCollection(" + obj.id + ");\">"
                                + "<i class=\"icon ion-android-favorite\"></i>"
                                + "</a>"
                                + "</div>"
                                + "</div>";
                            }
                        } else {
                            views += "<div align=\"center\"><p>暂无相关数据</p></div>";
                        }
                        view.innerHTML = views;
                    }
                },
                function (data) {
                    console.log('其他');
                }
                );
        }

        //用户收藏酒店
        $scope.saveCollection = function (targetId) {
            alert(targetId);
            var customerId = 1;
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