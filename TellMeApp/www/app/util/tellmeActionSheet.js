angular.module('tellme')
	.service('tellmeActionSheet', ['$ionicActionSheet', '$timeout',function ( $ionicActionSheet, $timeout) {
		this.show = function (args) {
			// Show the action sheet
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					{
						text: '<div><b>Share</b> This<div>'
					},
					{
						text: '<b>Share</b> This'
					}
     ],
				titleText: '与君分享',
				cancelText: '取消',
				cancel: function () {
					// add cancel code..
				},
				buttonClicked: function (index) {
					return true;
				}
			});

			// For example's sake, hide the sheet after two seconds
			$timeout(function () {
				hideSheet();
			}, 4000);
		}

  }])
