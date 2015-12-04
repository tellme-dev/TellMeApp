/*提供照相服务*/
angular.module('tellme')
    .service('fileTransferSvr', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        //var baseUrl = appConfig.server.getUrl();
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
            opts.fileName = customerId + '_' + Math.floor(Math.random() * 9999 + 1000);
            opts.mimeType = "image/jpeg";
            opts.params = params;   
            var ft = new FileTransfer();

            ft.upload(imgURI, svrURI, successCallBack, failCallBack, opts);
            ft.onprogress = progressCallBack;


        }

    }])