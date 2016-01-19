angular.module('tellme')
    .service('customerSer', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        var baseUrl = appConfig.server.getUrl();
        this.host = baseUrl;
        //登录
        this.login = function (loginData) {
            var url = baseUrl + 'app/customer/login.do';
            var loginDataJSON = JSON.stringify({
                mobile: loginData.username,
                psd: loginData.password
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { loginData: loginDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });            
            return deferred.promise;
        }
        // 判断一个用户是否已经存在(通过电话号码)
        this.verifyTel = function (mobile) {
            var url = baseUrl + 'app/customer/isExistByMobile.do';
            var verifyData = JSON.stringify({
                mobile: mobile
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { mobile: verifyData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        // 用户注册接口
        this.register = function (registerData) {
            var url = baseUrl + 'app/customer/register.do';
            var registerDataJSON = JSON.stringify({
                mobile: registerData.mobile,
                psd: registerData.psd,
                verifyCode:registerData.verifyCode
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { registerData: registerDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        // 用户修改电话号码
        this.editMobile = function (registerData) {
            var url = baseUrl + 'app/customer/editMobile.do';
            var jsonData = JSON.stringify({
                id: registerData.customerId,
                mobile: registerData.mobile,
                psd: registerData.psd,
                verifyCode: registerData.verifyCode
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { registerData: jsonData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
        // 保存个人信息
        this.saveCustomerInfo = function (customerInfo) {
            var url = baseUrl + 'app/customer/saveCustomer.do';
            var jsonData = JSON.stringify({
                id: customerInfo.customerId,
                //mobile: customerInfo.mobile,
                name: customerInfo.name,
                photoUrl:customerInfo.photoUrl,
                birthday: customerInfo.birthday,
                sex: customerInfo.sex
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { customerInfo: jsonData }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        //获取用户信息
        this.getCustomerInfo = function (customerId) {
            var url = baseUrl + 'app/customer/getCustomerInfo.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取用户常住酒店信息
        this.getCustomerAlways = function (customerId, pageNumber, pageSize) {
            var url = baseUrl + 'app/customer/getCustomerAlways.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取用户最近浏览
        this.nearBrowse = function (customerId,pageNumber,pageSize) {
            var url = baseUrl + 'app/customer/getCustomerBrowse.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取用户收藏
        this.customerSave = function (customerId, pageNumber, pageSize) {
            var url = baseUrl + 'app/customer/getCustomerCollection.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取用户话题
        this.customerTopic = function (customerId, pageNumber, pageSize) {
            var url = baseUrl + 'app/customer/getCustomerTopic.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取个人中心动态点赞数据列表
        this.customerDynamicCount = function (customerId) {
            var url = baseUrl + 'app/customer/getCustomerNewDynamicCount.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
      
        //获取个人中心动态评论数据
        this.customerDynamicComments = function (customerId, pageNumber, pageSize) {
            var url = baseUrl + 'app/customer/getCustomerDynamicComments.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //获取个人中心动态点赞数据
        this.customerDynamicPraise = function (customerId, pageNumber, pageSize) {
            var url = baseUrl + 'app/customer/getCustomerDynamicPraise.do';
            var getDataJSON = JSON.stringify({
                customerId: customerId,
                pageNumber: pageNumber,
                pageSize: pageSize
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: getDataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //删除个人话题
        this.deleteCustomerTopic = function (topicId, customerId) {
            var url = baseUrl + 'app/customer/deleteCustomerTopic.do';
            var dataJSON = JSON.stringify({
                customerId: customerId,
                bbsId: topicId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: dataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //删除浏览记录
        this.deleteBrowsData = function (browseId) {
            var url = baseUrl + 'app/customer/deleteCustomerBrowse.do';
            var dataJSON = JSON.stringify({
                browseId: browseId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: dataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
        //删除收藏数据
        this.deleteCollectionData = function (collectionId) {
            var url = baseUrl + 'app/customer/deleteCustomerCollection.do';
            var dataJSON = JSON.stringify({
                collectionId: collectionId
            });
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: url,
                data: { json: dataJSON }
            }).success(
                function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(
                function (data, status, headers, config) {
                    deferred.reject(5);
                });
            return deferred.promise;
        }
    }]);