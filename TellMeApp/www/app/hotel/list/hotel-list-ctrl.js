angular.module('tellme')
    .controller('hotelListControll', ['$scope', '$window', '$stateParams', '$state','$ionicHistory', 'hotelSer', 'LoadingSvr', 'popUpSer', 'tellmeActionSheet', function ($scope, $window, $stateParams, $state,$ionicHistory, hotelSer, LoadingSvr, popUpSer, tellmeActionSheet) {
        var param_tagId = $stateParams.itemTagRootId;
        var param_tagChildId = $stateParams.itemTagChildId;
        var param_itemId = $stateParams.itemId;

        var pageSize = 5;
        var rootTagId = 0;

        var selectId = 0;

        //酒店列表数据
        $scope.list = null;
        //二级菜单图片数据
        $scope.menus = null;
        $scope.itemListEmpty = false;
        var needLoadItemData = false;
        $scope.loadListerrMsg = "";
        //服务器地址
        $scope.host = hotelSer.hostUrl;
        //后退
        $scope.$window = $window;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        }
        $scope.rootMenuWidth = "auto";
        $scope.childMenuWidth = "auto";
        var collectionSelected = false;
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
            rootTagId = $scope.rootMenuArray[index].data.itemTagId;
            $scope.getChildMenu(rootTagId);
        }

        function cloneRefresh(index){
            var temp = new Array();
            var len = $scope.rootMenuArray.length;
            for (var i = 0; i < len; i++) {
                var rmi = $scope.rootMenuArray[i];
                if (i == index) {
                    rmi = new RootMenuItem(i, $scope.rootMenuArray[i].data, "ctive");
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

        $scope.childMuneSelected = function(index) {
            if (childMenuSelectIndex < 0) {
                return;
            }
            if (childMenuSelectIndex == index) {
                return;
            }
            $scope.childMenuArray[childMenuSelectIndex].cName = "pa-0";
            $scope.childMenuArray[index].cName = "pa-0 button-activ";
            childMenuSelectIndex = index;
            setChildDataLoad($scope.childMenuArray[index].data.itemTagId);
        }

        function setChildDataLoad(id) {
            if (!needLoadItemData) {
                needLoadItemData = true;
            }
            selectId = id;
            vm.pageNo = 0;
            vm.isInit = true;
            $scope.itemListEmpty = false;
            $scope.loadListerrMsg = "";
            vm.loadMore();
        }

        //跳转至详情页面
        $scope.toDetailPage = function (hotelId, itemId) {
            if (collectionSelected) {
                collectionSelected = false;
                return;
            }
            $state.go('hotel', { 'hotelId': hotelId, 'rootTagId': rootTagId, 'itemId': itemId });
        }

        //获取1级标题
        $scope.getRootMenu = function () {
            var promise = hotelSer.getRootMenu();
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
                                if (typeof (param_tagId) != 'undefined' && param_tagId > 0) {
                                    if (param_tagId == obj.itemTagId) {
                                        rmi.cName = "ctive";
                                        rootTagId = obj.itemTagId;
                                        rootMenuSelectIndex = i;
                                    }
                                } else {
                                    if (i == 0) {
                                        rmi.cName = "ctive";
                                        rootTagId = obj.itemTagId;
                                        rootMenuSelectIndex = 0;
                                    }
                                }
                                $scope.rootMenuArray.push(rmi);
                            }
                            $scope.getChildMenu(rootTagId);
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
                        $scope.childMenuArray = [];
                        if (data.rows.length > 0) {
                            $scope.childMenuWidth = (data.rows.length * 82) + "px";
                            for (var i = 0; i < data.rows.length; i++) {
                                var menu = data.rows[i];
                                var rmi = new RootMenuItem(i, menu, "pa-0");
                                //初始化选中
                                if (typeof (param_tagChildId) != 'undefined' && param_tagChildId > 0) {
                                    if (param_tagChildId == menu.itemTagId) {
                                        rmi.cName = "pa-0 button-activ";
                                        childMenuSelectIndex = i;
                                        setChildDataLoad(menu.itemTagId);
                                    }
                                } else {
                                    if (i == 0) {
                                        rmi.cName = "pa-0 button-activ";
                                        childMenuSelectIndex = 0;
                                        setChildDataLoad(menu.itemTagId);
                                    }
                                }
                                $scope.childMenuArray.push(rmi);
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

        // 分享
        $scope.share = function (title, text, imgUrl) {
            collectionSelected = true;
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

        //用户收藏项目
        $scope.saveCollection = function (targetId) {
            collectionSelected = true;
            var customerId = 0;
            if (typeof(window.localStorage['userTel']) != 'undefined') {
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

        //用户点赞项目
        $scope.savePraise = function (targetId) {
            collectionSelected = true;
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
                        $scope.comments[index] = "";
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

        ////页面初始加载
        /*
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
        });*/
      
        //设置1级标题
        $scope.getRootMenu();

        var vm = $scope.vm = {
            isInit: false,
            moredata: false,
            typeDetail: [],
            pageNo: 0,
            pageSize: 5,
            loadMore: function () {
                if (!needLoadItemData) {
                    return;
                }
                LoadingSvr.show();
                vm.pageNo += 1;
                var promise = hotelSer.getItemList(vm.pageNo, vm.pageSize, selectId)
                    .then(
                        function (data) {
                            LoadingSvr.hide();
                            if (data.isSuccess) {
                                if (vm.isInit) {
                                    var tempData = data.rows;
                                    if (typeof (param_itemId) == 'undefined' || param_itemId < 1) {
                                        //克隆数据
                                        var arr = new Array();
                                        for (var bf = 0; bf < tempData.length; bf++) {
                                            arr.push(tempData[bf]);
                                        }
                                        //游标缓存对象
                                        var temp_index = {};
                                        //内存置换缓存对象
                                        var temp = {};
                                        for (var i = 0; i < arr.length; i++) {
                                            if (i == 0) {
                                                if (arr[i].id == param_itemId) {
                                                    break;
                                                } else {
                                                    temp_index = arr[i];
                                                }
                                            } else {
                                                if (arr[i].id == param_itemId) {
                                                    arr[0] = arr[i];
                                                    arr[i] = temp_index;
                                                    break;
                                                } else {
                                                    //没有找到指定数据需要还原数据
                                                    if (i == arr.length - 1) {
                                                        arr = tempData;
                                                    } else {
                                                        temp = arr[i];
                                                        arr[i] = temp_index;
                                                        temp_index = temp;
                                                    }
                                                }
                                            }
                                        }
                                        tempData = arr;
                                    }

                                    $scope.list = tempData;
                                    if ($scope.list.length < 1) {
                                        $scope.itemListEmpty = true;
                                        $scope.loadListerrMsg = "没有找到相关数据";
                                    }
                                    vm.isInit = false;
                                } else {
                                    for (var i = 0; i < data.rows.length; i++) {
                                        $scope.list.push(data.rows[i]);
                                    }
                                }

                                var total = data.total;
                                if (total > vm.pageNo) {
                                    vm.moredata = false;
                                } else {
                                    vm.moredata = true;
                                }
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            } else {
                                if (vm.isInit) {
                                    $scope.itemListEmpty = true;
                                    $scope.loadListerrMsg = "服务器查询错误";
                                }
                            }
                        }

                    );

            }
        };

        //Object

        var RootMenuItem = function (index, data, cName) {
            this.index = index;
            this.data = data;
            this.cName = cName;
        }
    }]);