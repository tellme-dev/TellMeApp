angular.module('tellme')
	.service('tellmeActionSheet', ['$ionicActionSheet', '$timeout', 'QQSer', 'WechatShareSer', 'WeiboSer', function ($ionicActionSheet, $timeout, QQSer, WechatShareSer, WeiboSer) {
	    var _args = {};
	    this.show = function (args) {
	        _args = args;
	        // Show the action sheet
	        var hideSheet = $ionicActionSheet.show({
	            buttons: [
					{
					    text: 'QQ好友'
					},
					{
					    text: 'QQ空间'
					},
                    {
                        text: '微信好友'
                    },
                    {
                        text: '朋友圈'
                    },
                    {
                        text: '新浪微博'
                    },
                    {
                        text: '取消'
                    },
	            ],
	            titleText: '分享至',
	            buttonClicked: function (index, args) {
	                switch (index) {
	                    case 0://QQ好友
	                        if (QQSer.checkClientInstalled()) {
	                            QQSer.share(_args);
	                        } else {
	                            console.log('未安装QQ');
	                        }
	                        break;
	                    case 1://QQ空间
	                        if (QQSer.checkClientInstalled()) {
	                            QQSer.shareToQZone(_args);
	                        } else {
	                            console.log('未安装QQ');
	                        }
	                        break;
	                    case 2://微信好友
	                        if (WechatShareSer.weChatShare(0, 'check-installed', _args)) {
	                            WechatShareSer.weChatShare(0, 'send-photo-local', _args);
	                        } else {
	                            console.log('未安装微信');
	                        }
	                        break;
	                    case 3://朋友圈
	                        if (WechatShareSer) {
	                            WechatShareSer.weChatShare(1, 'send-photo-local', _args);
	                        } else {
	                            console.log('未安装微信');
	                        }
	                        break;
	                    case 4://新浪微博
	                        if (WeiboSer.checkClientInstalled()) {
	                            WeiboSer.shareToWeibo(_args);
	                        } else {
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
