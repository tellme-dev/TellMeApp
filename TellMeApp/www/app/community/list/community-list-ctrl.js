angular.module('tellme')
    .controller('communityControll', ['$scope', '$window', '$state', '$ionicHistory', 'communitySer',
        function ($scope, $window, $state, $ionicHistory, communitySer) {
            /*返回前一个界面*/
            $scope.$window = $window;
            $scope.goBack = function () {
               // $ionicHistory.goback();
                $window.history.back();
            };
            //跳转到单个乱弹详情
            $scope.toBbsDeail = function () {
                $state.go('bbs');
            }
            var selectedTag = 0;//选中分类标签索引
            //获取社区分类
            var promise = communitySer.getCommunityType();
            promise.then(
                function (data) {
                    if (data.isSuccess) {
                        $scope.typs = data.rows;
                    } else {
                        console.log(data.msg);
                    }
                },
                function (data) {
                    console.log('其他');
                }
                )

















            //跳转到首页
            $scope.goHome = function () {
                $state.go('home');
            }
            /*（点击底部菜单）跳转“发现”*/
            $scope.goDiscover = function () {
                $state.go('discoverList');
            }
            /*（点击底部菜单）跳转“入住”*/
            $scope.goCheckinto = function () {
                // $state.go('communityList');
                console.log("跳转到入住");
            }
        }
    ]);