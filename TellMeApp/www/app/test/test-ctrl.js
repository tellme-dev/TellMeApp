angular.module('tellme')
    .controller('testControll', ['$scope', function ($scope) {
        console.log("动态加载Controll");
        //$scope.shareMessage = function () {
        //    window.plugins.socialsharing.share('Message only')
        //}
    }])
.directive('hello', function () {
    console.log("动态加载");
    return {
        restrict: 'AE',
        template: '<span>Hi there</span>',
        replace: true
    };
});
