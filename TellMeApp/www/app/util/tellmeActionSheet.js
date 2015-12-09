angular.module('tellme')
	.service('tellmeActionSheet', ['$ionicActionSheet', '$timeout', 'QQSer', 'WechatShareSer', 'WeiboSer', 'popUpSer', function ($ionicActionSheet, $timeout, QQSer, WechatShareSer, WeiboSer, popUpSer) {
	    var _args = {};
	    this.show = function (args) {
	        _args = args;
	        // Show the action sheet
	        var hideSheet = $ionicActionSheet.show({
	            buttons: [
					{
					    text: '<b>QQ好友</b>',
					    type: 'inline-block button-dark'
					},
					{
					    text: 'QQ空间',
					    type: 'button button-dark'
					},
                    {
                        text: '微信好友',
                        type: 'button button-dark'
                    },
                    {
                        text: '朋友圈',
                        type: 'button button-dark'
                    },
                    {
                        text: '新浪微博',
                        type: 'button button-dark'
                    },
                    {
                        text: '取消',
                        type: 'button button-dark'
                    },
	            ],
	            titleText: '分享至',
	            buttonClicked: function (index, args) {
	                switch (index) {
	                    case 0://QQ好友
	                        if (QQSer.checkClientInstalled()) {
	                            QQSer.share(_args);
	                        } else {
	                            popUpSer.showAlert('未安装QQ');
	                            console.log('未安装QQ');
	                        }
	                        break;
	                    case 1://QQ空间
	                        if (QQSer.checkClientInstalled()) {
	                            QQSer.shareToQZone(_args);
	                        } else {
	                            popUpSer.showAlert('未安装QQ');
	                            console.log('未安装QQ');
	                        }
	                        break;
	                    case 2://微信好友
	                        if (WechatShareSer.weChatShare(0, 'check-installed', _args)) {
	                            WechatShareSer.weChatShare(0, 'send-photo-local', _args);
	                        } else {
	                            popUpSer.showAlert('未安装微信');
	                            console.log('未安装微信');
	                        }
	                        break;
	                    case 3://朋友圈
	                        if (WechatShareSer) {
	                            WechatShareSer.weChatShare(1, 'send-photo-local', _args);
	                        } else {
	                            popUpSer.showAlert('未安装微信');
	                            console.log('未安装微信');
	                        }
	                        break;
	                    case 4://新浪微博
	                        if (WeiboSer.checkClientInstalled()) {
	                            WeiboSer.shareToWeibo(_args);
	                        } else {
	                            popUpSer.showAlert('未安装微博');
	                            console.log('未安装微博');
	                        }
	                        break;
	                    default://退出
	                        hideSheet();
	                        break;
	                }
	                return true;
	            }
	        });

	        // For example's sake, hide the sheet after two seconds
	        //$timeout(function () {
	        //    hideSheet();
	        //}, 4000);
	    }

	}])
