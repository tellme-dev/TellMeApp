
angular.module('tellme')
	.controller('communityControll', ['$scope', '$window', '$state', '$ionicHistory', '$ionicLoading', '$ionicModal', 'communitySer', 'commonSer', 'appConfig', 'LoadingSvr', 'tellmeActionSheet', 'popUpSer',
        function ($scope, $window, $state, $ionicHistory, $ionicLoading,$ionicModal, communitySer, commonSer, appConfig, LoadingSvr, tellmeActionSheet, popUpSer) {
            $scope.allImages = [
                { attachUrl: 'images/a.png' }, { attachUrl: 'images/a.png' }, { attachUrl: 'images/a.png' }
            ];
            $scope.baseUrl = appConfig.server.getUrl();
			/*返回前一个界面*/
			$scope.$window = $window;
			$scope.goBack = function () {
				$ionicHistory.goBack();
			};
			$scope.dataShow = false;
			$scope.msgShow = false;
			//跳转到单个论坛详情
			$scope.toBbsDetail = function (bbsId) {
					$state.go('bbs', {bbsId: bbsId});
				}
				//跳转到发帖页面
			$scope.toAddBbs = function () {
			    //判断是否登录
			    var isLogin = $scope.userIsLogin();
			    if (isLogin) {
				    $state.go('addBbs');
			    } else {
			        $state.go('login', {
			            pageName: 'menu.communityList'
			        });
			    }
			}

			$scope.showImages = function (index, images) {
			    //$scope.allImages = images;
			    $scope.activeSlide = 0;
			    $scope.showModal('image-popover.html');
			}

			$scope.showModal = function (templateUrl) {
			    $ionicModal.fromTemplateUrl(templateUrl, {
			        scope: $scope,
			        animation: 'newspaper'
			    }).then(function (modal) {
			        $scope.modal = modal;
			        $scope.modal.show();
			    });
			};

            // Close the modal
			$scope.closeModal = function () {
			    $scope.modal.hide();
			    $scope.modal.remove();
			};
            //跳转到图片浏览
			$scope.goToImageBrowse = function (bbsId) {
			    //判断是否登录
			    var isLogin = $scope.userIsLogin();
			    if (isLogin) {

			        $state.go('imageBrowse', {'bbsId':bbsId});
			    } else {
			        $state.go('login', {
			            pageName: 'menu.communityList'
			        });
			    }
			}
			$scope.globalVar = {};
			$scope.globalVar.SelectedTag = 1; //选中分类标签索引
			var initCategoryId = 1;

			//根据获取社区分类标签内容 categoryId分类标签ID
			$scope.gettypedetail = function (index, categoryid) {
				$scope.globalVar.SelectedTag = index;
				vm.categoryId = categoryid;
				vm.pageNo = 0;
				vm.moredata = false;
				vm.loadMore();
			}
			$scope.showAnswer = false;
			$scope.globalVar.answerText = ""; //回帖内容
			var bbsId = 0;
			var bbsTitle = "";
			$scope.showAnswerbbs = function (id, title) {
				bbsId = id;
				bbsTitle = title;
				if ($scope.showAnswer) {
					$scope.showAnswer = false;
				} else {
					$scope.showAnswer = true;
				}
			}

			//回帖
			$scope.answerbbs = function (index, id, title) {
			    var answerText = vm.typeDetail[index].anstext;
				//var el = document.getElementById('bbs-' + id);
				//var answerText = el.value;
				if (answerText == ""||answerText == undefined) {
					 popUpSer.showAlert("请输入内容");
					return;
				}
				var isLogin = $scope.userIsLogin();
				//var answerText = $scope.globalVar.answerText+'-'+id;
				if (isLogin) { //如果用户已经登录
					var jsonData = JSON.stringify({
						id: 0,
						customerId: window.localStorage['userId'],
						bbsType: 1,
						postType: 1,
						targetType: 0,
						parentId: id,
						title: title,
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
					    pageName: 'menu.communityList'
					});
				}
			}

            // 分享
			$scope.share = function (detail) {
			    var args = {};
                //args.url = "";
			    args.title = detail.title;
			    args.description = detail.text;
                args.text = detail.text;
                var imgs = typeof (detail.bbsAttachUrls) === 'undefined' ? undefined : [];
			    angular.forEach(detail.bbsAttachUrls, function (de, index) {
                    imgs[index] = $scope.baseUrl + de.attachUrl;
			    });
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

			//点赞
			$scope.agreeBbs = function (id, count) {
					var isLogin = $scope.userIsLogin();
					if (isLogin) { //如果用户已经登录
						var jsonData = JSON.stringify({
							targetId: id,
							praiseType: 0,
							customerId: window.localStorage['userId']
						});
						//   var promise = communitySer.agreeBbs(jsonData).then
						var promise = commonSer.saveAgree(jsonData)
							.then(
								function (data) {
									if (data.isSuccess) {
										vm.loadMore();
										console.log("点赞成功");
									} else {
									    popUpSer.showAlert(data.msg);
									}
								},
								function (data) {
									console.log('其他');
								}
							);
					} else {
						$state.go('login', {
						    pageName: 'menu.communityList'
						});
					}
				}
				//收藏
			$scope.collectBbs = function (id, count) {
				var isLogin = $scope.userIsLogin();
				if (isLogin) { //如果用户已经登录
					var jsonData = JSON.stringify({
						customerId: window.localStorage['userId'],
						collectionType: 3,
						targetId: id
					});
					// var promise = commonSer.collectionBbs(jsonData).then(
					var promise = commonSer.saveCollectionHistory(jsonData)
						.then(
							function (data) {
								if (data.isSuccess) {
									vm.loadMore();
									console.log('收藏成功');
								} else {
									 popUpSer.showAlert(data.msg);
								}
							},
							function (data) {
								console.log('其他');
							}
						);
				} else {
					$state.go('login', {
					    pageName: 'menu.communityList'
					});
				}
			}

			//跳转到首页
			$scope.goHome = function () {
			    $state.go('menu.home');
				}
				/*（点击底部菜单）跳转“发现”*/
			$scope.goDiscover = function () {
			    $state.go('menu.discoverList');
				}
				/*（点击底部菜单）跳转“入住”*/
			$scope.goCheckinto = function () {
					// $state.go('communityList');
					console.log("跳转到入住");
				}
				//判断用户是否登录
			$scope.userIsLogin = function () {
					var mobile = window.localStorage['userTel'];
					if (mobile == undefined || mobile == "") { //如果用户未登录跳转到登录页面
						return false;
					} else {
						return true;
					}
			}
			//上拉加载更多
			var vm = $scope.vm = {
				categoryId: 1,
				moredata: false,
				typeDetail: [],
				pageNo: 0,
				pageSize:10,
				loadMore: function () {
					LoadingSvr.show();
					vm.pageNo += 1;
					var promise = communitySer.getTypeDetail(vm.categoryId, vm.pageNo, vm.pageSize)
						.then(
							function (data) {
								if (data.isSuccess) {
									if (data.total != 0) {
										$scope.dataShow = true;
										$scope.msgShow = false;
									} else {
										$scope.dataShow = false;
										$scope.msgShow = true;
									}

									vm.typeDetail = data.rows;
									var total = data.total;
									if (vm.pageNo * vm.pageSize > total || vm.pageNo * vm.pageSize == total) {
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
        }
         
    ]);
