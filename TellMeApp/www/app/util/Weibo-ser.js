angular.module('tellme')
	.service('WeiboSer', ['popUpSer', 'LoadingSvr', function (popUpSer, LoadingSvr) {
		//Weibo SSO Login
		this.ssoLogin = function () {
			YCWeibo.ssoLogin(function (args) {
				alert(args.access_token);
				alert(args.userid);
			}, function (failReason) {
				console.log(failReason);
			});
		}

		//Weibo Logout
		this.logout = function () {
			YCWeibo.logout(function () {
				console.log('logout success');
			}, function (failReason) {
				console.log(failReason);
			});
		}

		//Weibo Webpage Share
		this.shareToWeibo = function (argss) {
			//var args = {};
			//args.url = (typeof (argss.url) === 'undefined' ? "https://api.weibo.com/oauth2/default.html" : argss.url);
			//args.title = (typeof (argss.title) === 'undefined' ? "来自挑米科技 应用分享" : argss.title);
			//args.description = (typeof (argss.description) === 'undefined' ? "描述" : argss.description);
			//args.imageUrl = (typeof (argss.imageUrl) === 'undefined' ? "" : argss.imageUrl[0]);; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
			//args.defaultText = "挑米科技";
			var args = {};
			args.url = "http://www.baidu.com";
			args.title = "Baidu";
			args.description = "This is Baidu";
			args.imageUrl = "https://www.baidu.com/img/bdlogo.png";//if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
			args.defaultText = "";
			LoadingSvr.goShare();
			YCWeibo.shareToWeibo(function () {
			    popUpSer.showAlert('分享成功');
			}, function (failReason,param) {
			    if (failReason == 'sharefail') {
			        popUpSer.showAlert('分享');
			    } else {
			        popUpSer.showAlert(failReason);
			    }
			    
			}, args);
			LoadingSvr.hide();
		}

		//CheckClientInstalled
		this.checkClientInstalled = function () {
		    YCWeibo.checkClientInstalled(function () {
			    console.log('client is installed');
			    return true;
			}, function () {
			    console.log('client is not installed');
			    return false;
			});
		}
  }])
