angular.module('tellme')
    .controller('testControll', ['$scope', function ($scope) {
        $scope.shareMessage = function () {
            window.plugins.socialsharing.share('Message only')
        }
    }])