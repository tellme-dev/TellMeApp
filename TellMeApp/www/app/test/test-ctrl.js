angular.module('tellme')
    .controller('testControll', ['$scope', function ($scope) {
        console.log("动态加载Controll");
        //$scope.shareMessage = function () {
        //    window.plugins.socialsharing.share('Message only')
        //}
        $scope.sportImages = [
        {url:'images/a.png'},{url:'images/a.png'},{url:'images/a.png'}
        ];
    }])
