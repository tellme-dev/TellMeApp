angular.module('tellme')
	.service('QQSer', ['popUpSer', 'LoadingSvr', function (popUpSer, LoadingSvr) {
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
		this.share = function (argss) {
			var args = {};
			args.url = (typeof (argss.url) === 'undefined' ? "http://connect.qq.com" : argss.url);
			args.title = (typeof (argss.title) === 'undefined' ? "来自挑米科技 应用分享" : argss.title);
			args.description = (typeof (argss.description) === 'undefined' ? "描述" : argss.description);
			args.imageUrl = (typeof (argss.imageUrl) === 'undefined' ? "" : argss.imageUrl[0]);
			args.appName = "挑米科技";
			LoadingSvr.goShare();
			YCQQ.shareToQQ(function () {
			    popUpSer.showAlert('分享成功');
			}, function (failReason) {
			    //popUpSer.showAlert(failReason);
			}, args);
			LoadingSvr.hide();
		}

		//QZone Share
		this.shareToQZone = function (argss) {
    		var args = {};
    		args.url = (typeof (argss.url) === 'undefined' ? "http://www.hotellmee.com" : argss.url);
    		args.title = (typeof (argss.title) === 'undefined' ? "来自挑米科技 应用分享" : argss.title);
    		args.description = (typeof (argss.description) === 'undefined' ? "描述" : argss.description);
    		args.imageUrl = argss.imageUrl;
    		LoadingSvr.goShare();
			YCQQ.shareToQzone(function () {
			    popUpSer.showAlert('分享成功');
			}, function (failReason) {
			    popUpSer.showAlert(failReason);
			}, args);
			LoadingSvr.hide();
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
		        return true;
			}, function () {
				// if installed QQ Client version is not supported sso,also will get this error
			    console.log('client is not installed');
			    return false;
			});
		}
  }])
