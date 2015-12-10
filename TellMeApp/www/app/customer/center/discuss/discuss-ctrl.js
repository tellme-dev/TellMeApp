angular.module('tellme')
    .controller('discussControll', ['$scope', '$ionicHistory', '$ionicActionSheet', 'customerSer',
        function ($scope, $ionicHistory, $ionicActionSheet, customerSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
            $(".zxx_text_overflow_3").wordLimit(15);
            $(".pl-text-s").click(function () {
            $(".zxx_text_overflow_3").wordLimit(100);
            })
        }]);