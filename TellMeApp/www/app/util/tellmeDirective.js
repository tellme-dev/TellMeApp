angular.module('tellme')
    .directive('hot', function () {
        return {
            restrict: 'AE',
            link: function (scope, element, attrs) {
                var html = '';
                var hotSearchRegions = scope[attrs.ngModel];

                angular.forEach(hotSearchRegions, function (region, index) {
                    if (index % 4 === 0) {
                        html += '<div ng-if="" class="row dw-row" style="margin-top:10px;"><button class="col col-20" ng-click="changeRegion(' + region.name + ')">' + region.name + '</button>';

                    } else if (index % 4 === 3 || index === hotSearchRegions.length) {
                        html += '<button class="col col-20" ng-click="changeRegion(' + region.name + ')">' + region.name + '</button></div>';
                    } else {
                        html += '<button class="col col-20" ng-click="changeRegion(' + region.name + ')">' + region.name + '</button>';
                    }
                }
                    );
                element.replaceWith(html);
            }
        };
    })
 .directive('historic', function () {
     return {
         restrict: 'AE',
         link: function (scope, element, attrs) {
             var html = '';
             var historicRegions = scope[attrs.ngModel];

             angular.forEach(historicRegions, function (region, index) {
                 if (index % 4 === 0) {
                     html += '<div ng-if="" class="row dw-row-sr" style="margin-top:10px;"><button class="col col-20" ng-click="changeRegion(' + region.name + ')">' + region.name + '<i style="float:right;width:1.125em; height:1.125em;border-radius:50%; background:#686161;text-align:top;line-height:1.125em;color:#fff;display:inline-block;left:40px; top:15px;">×</i></button>';

                 } else if (index % 4 === 3 || index === historicRegions.length) {
                     html += '<button class="col col-20" ng-click="changeRegion(' + region.name + ')">' + region.name + '<i style="float:right;width:1.125em; height:1.125em;border-radius:50%; background:#686161;text-align:top;line-height:1.125em;color:#fff;display:inline-block;left:40px; top:15px;">×</i></button></div>';
                 } else {
                     html += '<button class="col col-20" ng-click="changeRegion(' + region.name + ')">' + region.name + '<i style="float:right;width:1.125em; height:1.125em;border-radius:50%; background:#686161;text-align:top;line-height:1.125em;color:#fff;display:inline-block;left:40px; top:15px;">×</i></button>';
                 }
             }
                 );
             element.replaceWith(html);
         }
     };
 })
.directive('regionls', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            var html = '';
            var regionList = scope[attrs.ngModel];
            var firstChar = angular.uppercase(regionList[0].firstChar);
            angular.forEach(regionList, function (region, index) {
                var tempChar = angular.uppercase(region.firstChar);
                if (index == 0) {
                    html += '<div class="list dw-list"><div class="item item-divider">' + firstChar + '</div>';
                }
                if (tempChar != firstChar) {
                    firstChar = tempChar;
                    html+='<div class="item item-divider">' + firstChar + '</div>';
                }
                html += '<a class="item" href="#">' + region.name + '</a>';
                if (index == regionList.length - 1) {
                    html += '</div>';
                }
            }
                );
            element.replaceWith(html);
        }
    };
})