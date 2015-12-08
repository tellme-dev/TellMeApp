angular.module('tellme')
	.service('QQSer', [function () {
		//QQ SSO Login
		this.ssoLogin = function (args) {
			var checkClientIsInstalled = 1; //default is 0,only for iOS

			YCQQ.ssoLogin(function (args) {
				alert(args.access_token);
				alert(args.userid);
			}, function (failReason) {
				console.log(failReason);
			}, checkClientIsInstalled);
		}

		//QQ Logout
		this.logout = function () {
			YCQQ.logout(function () {
				console.log('logout success');
			}, function (failReason) {
				console.log(failReason);
			});
		}

		//QQ Share
		this.share = function (args) {
			//var args = {};
			//args.url = "";
			//args.title = "";
			//args.description = "";
			//args.imageUrl = "";
			//args.appName = "";

			YCQQ.shareToQQ(function () {
				console.log("share success");
			}, function (failReason) {
				console.log(failReason);
			}, args);
		}

		//QZone Share
		this.shareToQZone = function (args) {
 //   		var args = {};
 //   		args.url = "http://www.baidu.com";
 //   		args.title = "This is cordova QZone share ";
 //   		args.description = "This is cordova QZone share ";
 //   		var imgs = ['https://www.baidu.com/img/bdlogo.png',
 //'https://www.baidu.com/img/bdlogo.png',
 //'https://www.baidu.com/img/bdlogo.png'];
 //   		args.imageUrl = imgs;
			YCQQ.shareToQzone(function () {
				alert("share success");
			}, function (failReason) {
				alert(failReason);
			}, args);
		}

		//QQ Favorites
		this.addToQQFavorites = function () {
			var args = {};
			args.url = "http://www.baidu.com";
			args.title = "这个是cordova QQ 收藏测试";
			args.description = "这个是cordova QQ 收藏测试";
			args.imageUrl = "https://www.baidu.com/img/bdlogo.png";
			args.appName = "cordova—QQ";
			YCQQ.addToQQFavorites(function () {
				alert("share success");
			}, function (failReason) {
				alert(failReason);
			}, args);
		}

		//CheckClientInstalled
		this.checkClientInstalled = function () {
			YCQQ.checkClientInstalled(function () {
				console.log('client is installed');
			}, function () {
				// if installed QQ Client version is not supported sso,also will get this error
				console.log('client is not installed');
			});
		}
  }])
