angular.module('tellme')
	.service('tellmeActionSheet', ['$ionicActionSheet', '$timeout', 'QQSer', 'WechatShareSer', 'WeiboSer', 'popUpSer', '$ionicFtActionSheet', function ($ionicActionSheet, $timeout, QQSer, WechatShareSer, WeiboSer, popUpSer, $ionicFtActionSheet) {
	    var _args = {};
	    this.show = function (args) {
	        _args = args;
	        // Show the action sheet
	        var hideSheet = $ionicFtActionSheet.show({
	            buttons: [
					{
					    text: 'QQ好友',
					    img: "images/share/qq.png"
					},
					{
					    text: 'QQ空间',
					    img: "images/share/space.png"
					},
                    {
                        text: '微信好友',
                        img: "images/share/wechat.png"
                    },
                    {
                        text: '朋友圈子 ',
                        img: "images/share/circle.png"
                    },
                    {
                        text: '新浪微博',
                        img: "images/share/weibo.png"
                    }
	            ],
	            titleText: '分享至',
	            cancelText: "取消",
	            buttonClicked: function (index, args) {
	                switch (index) {
	                    case 0://QQ好友
	                        QQSer.share(_args);
	                        break;
	                    case 1://QQ空间
	                        QQSer.shareToQZone(_args);
	                        break;
	                    case 2://微信好友
	                        var shareId = typeof (_args.imageUrl) === 'undefined' ? 'send-text' : 'send-photo-local';
	                        WechatShareSer.weChatShare(0, shareId, _args);
	                        break;
	                    case 3://朋友圈
	                        var shareId = typeof (_args.imageUrl) === 'undefined' ? 'send-text' : 'send-photo-local';
	                        WechatShareSer.weChatShare(1, shareId, _args);
	                        break;
	                    case 4://新浪微博
	                        WeiboSer.shareToWeibo(_args);
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
