angular.module('tellme')
	.service('tellmeActionSheet', ['$ionicActionSheet', '$timeout', 'QQSer', function ($ionicActionSheet, $timeout, QQSer) {
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
				titleText: '与君分享',
				cancel: function () {
					// add cancel code..
				},
				buttonClicked: function (index, args) {
				    switch (index) {
				        case 0:
				            QQSer.share(_args);
				            break;
				        case 1:
				            break;
				        case 2:
				            break;
				        case 3:
				            break;
				        case 4:
				            break;
				        default:
				            break;
				    }
					return true;
				}
			});

			// For example's sake, hide the sheet after two seconds
			$timeout(function () {
				hideSheet();
			}, 4000);
		}

  }])
