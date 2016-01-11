angular.module('tellme')
	.service('tellmeActionSheet', ['$ionicActionSheet', '$timeout', 'QQSer', 'WechatShareSer', 'WeiboSer', 'popUpSer', '$ionicFtActionSheet', function ($ionicActionSheet, $timeout, QQSer, WechatShareSer, WeiboSer, popUpSer, $ionicFtActionSheet) {
	    var _args = {};
	    this.show = function (args) {
            //0表示分享未成功；1表示分享成功；
	        var shareResult = 0;
	        _args = args;
	        // Show the action sheet
	        var hideSheet = $ionicActionSheet.show({
	            buttons: [
					{
					    text: template("QQ分享", "images/share/qq.png")
					},
					//{
					//    text: template("QQ空间", "images/share/space.png")
					//},
                    {
                        text: template("微信好友", "images/share/wechat.png")
                    },
                    {
                        text: template("朋友圈", "images/share/circle.png")
                    },
                    {
                        text: template("微博", "images/share/weibo.png")
                    }

	            ],
	            titleText: '分享至',
	            cancelText: "取消",
	            buttonClicked: function (index, args) {
	                switch (index) {
	                    case 0://QQ分享
	                        shareResult = QQSer.share(_args);
	                        break;
	                    //case 1://QQ空间
	                    //    shareResult = QQSer.shareToQZone(_args);
	                    //    break;
	                    case 1://微信好友
	                        var shareId = typeof (_args.imageUrl) === 'undefined' ? 'send-text' : 'send-photo-local';
	                        shareResult = WechatShareSer.weChatShare(0, shareId, _args);
	                        break;
	                    case 2://朋友圈
	                        var shareId = typeof (_args.imageUrl) === 'undefined' ? 'send-text' : 'send-photo-local';
	                        shareResult = WechatShareSer.weChatShare(1, shareId, _args);
	                        break;
	                    case 3://新浪微博
	                        shareResult = WeiboSer.shareToWeibo(_args);
	                        break;
	                    default://退出
	                        hideSheet();
	                        break;
	                }
	                return true;
	            }
	        });
	        return shareResult;
	    }
	    var template = function (shareToName,ShareToImgUrl) {
	        var template = '<div class="item item-avatar"><img src="' + ShareToImgUrl + '"><h2>' + shareToName + '</h2></div>';
	        return template;

	    }

	}])
