angular.module('tellme')
    .controller('menuControll', ['$scope', '$state', function ($scope, $state) {
        $scope.home = function () {
            $state.go('menu.home');
        }
        $scope.discovery = function () {
            $state.go('menu.discoverList');
        }
        $scope.community = function () {
            $state.go('menu.communityList');
        }
        $scope.rcu = function () {
            $state.go('menu.rcu');
        }
    }])