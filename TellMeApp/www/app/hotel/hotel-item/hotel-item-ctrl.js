angular.module('tellme')
    .controller('hotelItemControll', ['$scope', '$ionicHistory', '$stateParams', '$ionicHistory', 'hotelSer', 'commonSer', 'tellmeActionSheet', 'appConfig', 'LoadingSvr', 'communitySer',
        function ($scope, $ionicHistory, $stateParams, $ionicHistory, hotelSer, commonSer, tellmeActionSheet, appConfig, LoadingSvr, communitySer) {
            var itemId = $stateParams.itemId;
            $scope.baseUrl = appConfig.server.getUrl();
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            //获取ItemName//data.data.name
            hotelSer.getItemInfo(itemId).then(
				function (data) {
					if (data.isSuccess) {
						$scope.itemName = data.data.name;
						$scope.itemText = data.data.text;
					} else {
						console.log(data.msg);
					}
				},
				function (data) {
							    console.log('其他');
							}
			);
            $scope.dataShow = false;
            $scope.msgShow = false;
            //发表评论
            $scope.answerHotel = function (hotelId,hotelName) {
                var el = document.getElementById('hotel-' + hotelId);
                var answerText = el.value;
                if (answerText == "") {
                    alert("请输入内容");
                    return;
                }
                var isLogin = $scope.userIsLogin();
                if (isLogin) { //如果用户已经登录
                    var jsonData = JSON.stringify({
                        id: 0,
                        customerId: window.localStorage['userId'],
                        bbsType: 1,
                        postType: 1,
                        targetType: 1,
                        parentId: hotelId,
                        title: hotelName,
                        text: answerText
                    });
                    var promise = communitySer.answerBbs(jsonData)
						.then(
							function (data) {
							    if (data.isSuccess) {
							        vm.loadMore();
							        el.value = "";
							        console.log('回帖成功');
							    } else {
							        console.log(data.msg);
							    }
							},
							function (data) {
							    console.log('其他');
							}
						);
                } else {
                    $state.go('login', {
                        pageName: 'communityList'
                    });
                }
            }
            //点赞
            $scope.toSaveAgree = function (id) {
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        targetId: id, praiseType: 0, customerId: window.localStorage['userId']
                    });
                    //   var promise = communitySer.agreeBbs(jsonData).then
                    var promise = commonSer.saveAgree(jsonData).then(
                      function (data) {
                          if (data.isSuccess) {
                             // vm.loadMore();
                              console.log("点赞成功");
                          } else {
                              console.log(data.msg);
                          }
                      },
                      function (data) {
                          console.log('其他');
                      }
                      );
                } else {
                    $state.go('login', { pageName: 'hotelItem' });
                }
            }
            //收藏
            $scope.toSaveCollection = function (id) {
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var jsonData = JSON.stringify({
                        customerId: window.localStorage['userId'], collectionType: 3, targetId: id
                    });
                    var promise = commonSer.saveCollectionHistory(jsonData).then(
                  function (data) {
                      if (data.isSuccess) {
                          vm.loadMore();
                          console.log('收藏成功');
                      } else {
                          alert(data.msg);
                          console.log(data.msg);
                      }
                  },
                  function (data) {
                      console.log('其他');
                  }
                  );
                } else {
                    $state.go('login', { pageName: 'hotelItem' });
                }
            }
            // 分享
            $scope.share = function (bbsDetail) {
                var isLogin = $scope.userIsLogin();
                if (isLogin) {//如果用户已经登录
                    var args = {};
                    args.url = "";
                    args.title = bbsDetail.title;
                    args.description = bbsDetail.text;
                    var imgs = [];
                    angular.forEach(bbsDetail.bbsAttachUrls, function (de, index) {
                        imgs[index] = $scope.baseUrl + de.attachUrl;
                    });
                    args.imageUrl = imgs;
                    args.appName = "挑米科技";
                    args.defaultText = "来自挑米科技";
                    tellmeActionSheet.show(args);
                } else {
                    $state.go('login', { pageName: 'communityList' });
                }
            }
            //下拉加载更多 根据标签获取酒店列表
            var vm = $scope.vm = {
                moredata: false,
                pageNo: 0,
                listData: [],
                pageSize: 10,
                loadMore: function () {
                    LoadingSvr.show();
                    vm.pageNo += 1;
                    var promise = hotelSer.getHotelListByItem(itemId, vm.pageNo,vm.pageSize).then(
                  function (data) {
                      if (data.isSuccess) {
                          if (data.total != 0) {
                              $scope.dataShow = true;
                              $scope.msgShow = false;
                          } else {
                              $scope.dataShow = false;
                              $scope.msgShow = true;
                          }
                          vm.listData = data.rows;
                          var total = data.total;//总的页数
                          if (vm.pageNo>= total) {
                              vm.moredata = true;
                              vm.pageNo = 0;
                          }
                          LoadingSvr.hide();
                          $scope.$broadcast('scroll.infiniteScrollComplete');
                      } else {
                          $scope.dataShow = false;
                          $scope.msgShow = true;
                      }
                   }
                  );
                }
            }
            vm.loadMore();
            //判断用户是否登录
            $scope.userIsLogin = function () {
                var mobile = window.localStorage['userTel'];
                if (mobile == undefined || mobile == "") {//如果用户未登录跳转到登录页面
                    return false;
                } else {
                    return true;
                }
            }
        }]);