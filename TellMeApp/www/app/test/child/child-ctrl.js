angular.module('tellme')
.controller('childController', ['$scope', '$stateParams', function ($scope) {
    $scope.name = $stateParams.name;
}])