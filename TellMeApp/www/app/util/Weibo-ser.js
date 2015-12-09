angular.module('tellme')
	.service('WeiboSer', ['popUpSer', function (popUpSer) {
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
		this.shareToWeibo = function (args) {
			//var args = {};
			//args.url = _args.url;
			//args.title = "Baidu";
			//args.description = "This is Baidu";
			//args.imageUrl = "https://www.baidu.com/img/bdlogo.png"; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
			//args.defaultText = "";
			YCWeibo.shareToWeibo(function () {
				alert("share success");
			}, function (failReason) {
			    popUpSer.showAlert(failReason);
			}, args);
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
