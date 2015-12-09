angular.module('tellme')
    .controller('agreeControll', ['$scope', '$ionicHistory', '$ionicActionSheet', 'customerSer',
        function ($scope, $ionicHistory, $ionicActionSheet, customerSer) {
            $scope.goBack = function () {
                $ionicHistory.goBack();
            };
           // document.getElementsByClassName('zxx_text_overflow_3')
            $(".zxx_text_overflow_3").wordLimit(20);
        }]);