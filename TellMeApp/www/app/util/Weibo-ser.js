angular.module('tellme')
	.service('WeiboSer', [function () {
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
		this.shareToWeibo = function () {
			var args = {};
			args.url = "http://www.baidu.com";
			args.title = "Baidu";
			args.description = "This is Baidu";
			args.imageUrl = "https://www.baidu.com/img/bdlogo.png"; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
			args.defaultText = "";
			YCWeibo.shareToWeibo(function () {
				alert("share success");
			}, function (failReason) {
				alert(failReason);
			}, args);
		}

		//CheckClientInstalled
		this.checkClientInstalled = function () {
			YCWeibo.checkClientInstalled(function () {
				console.log('client is installed');
			}, function () {
				console.log('client is not installed');
			});
		}
  }])
