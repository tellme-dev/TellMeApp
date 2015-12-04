/*提供照相服务*/
angular.module('tellme')
    .service('fileTransferSvr', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        //var baseUrl = appConfig.server.getUrl();
        var now = new Date();
        //var year = now.getFullYear();
        //var month = (now.getMonth() + 1).toString();
        //var day = (now.getDate()).toString();
        var mill = now.getTime();//getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
        /*
        上传洗车照片
        imgURI,文件路径 来自于getPicture返回的imgURI
        params:参数，一般要包括orderId

        */
        this.uploadPhoto = function (imgURI,customerId, successCallBack, failCallBack, progressCallBack) {

            var svrURI = encodeURI(appConfig.server.getUrl() + "app/bbs/uploadPhoto.do");

            var opts = new FileUploadOptions();

            opts.fileKey = "bbsPhoto";
            //opts.fileName = imgURI.substr(imgURI.lastIndexOf('/') + 1);
            opts.fileName = customerId + '_' + mill + Math.floor(Math.random() * 9999 + 1000);
            opts.mimeType = "image/jpeg";   
            var ft = new FileTransfer();

            ft.upload(imgURI, svrURI, successCallBack, failCallBack, opts);
            ft.onprogress = progressCallBack;


        }

    }])