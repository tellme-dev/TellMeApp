﻿angular.module('tellme')
    .service('popUpSer', ['$ionicPopup', '$timeout', '$q', function ($ionicPopup, $timeout, $q) {
        this.confirmExit = function (msg) {
            var deferred = $q.defer();
            var tabOn = 0;/*0对应取消，1对应确认*/
            var popUp = $ionicPopup.show(
                {
                    title: '提示',
                    template: '<p style="color:black;">' + msg + '</p>',
                    buttons: [
                        {
                            text:'取消',
                            type: 'button-dark',
                            onTap: function (e) {
                                tabOn = 0;
                            }
                        },
                        {
                            text: '确定',
                            type: 'button-sure',
                            onTap: function (e) {
                                tabOn = 1;
                            }
                        }
                    ]
                });
            popUp.then(function (res) {
                deferred.resolve(tabOn);
            });
            //$timeout(function () {
            //    popUp.close(); //close the popup after 3 seconds for some reason
            //}, 3000);
            
            return deferred.promise;
        }
        this.confirmRecharge = function (msg) {
            var deferred = $q.defer();
            var tabOn = 0;/*0对应取消，1对应确认*/
            var popUp = $ionicPopup.show(
                {
                    title: '提示',
                    template: '<p style="color:black;">' + msg + '</p>',
                    buttons: [
                        {
                            text: '取消',
                            type: 'button-dark',
                            onTap: function (e) {
                                tabOn = 0;
                            }
                        },
                        {
                            text: '充值',
                            type: 'button-sure',
                            onTap: function (e) {
                                tabOn = 1;
                            }
                        }
                    ]
                });
            popUp.then(function (res) {
                deferred.resolve(tabOn);
            });
            //$timeout(function () {
            //    popUp.close(); //close the popup after 3 seconds for some reason
            //}, 3000);

            return deferred.promise;
        }
        this.showAlert = function (msg) {
            var popUp = $ionicPopup.show(
                {
                    title: '提示',
                    template: '<p style="color:black;">' + msg + '</p>',
                    buttons: [
                        {
                            text: '确定',
                            type: 'button-sure',
                        }
                    ]
                });
            popUp.then(function (res) {

            });
            $timeout(function () {
                popUp.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        }
        this.showAlertOfLogin = function (msg) {
            var deferred = $q.defer();
            var tabOn = 0;
            var popUp = $ionicPopup.show(
                {
                    title: '提示',
                    template: '<p style="color:black;">' + msg + '</p>',
                    buttons: [
                        {
                            text: '确定',
                            type: 'button-sure',
                            onTap: function (e) {
                                tabOn = 1;
                            }
                        }
                    ]
                });
            popUp.then(function (res) {
                deferred.resolve(tabOn);
            });
            //$timeout(function () {
            //    popUp.close(); //close the popup after 3 seconds for some reason
            //}, 3000);
            return deferred.promise;
        }
    }])