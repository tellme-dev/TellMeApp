/*提供照相服务*/
angular.module('tellme')
    .service('fileTransferSvr', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        $scope.baseUrl = appConfig.server.getUrl();
        /*
        上传洗车照片
        imgURI,文件路径 来自于getPicture返回的imgURI
        params:参数，一般要包括orderId

        */
        this.uploadWashPhoto = function (imgURI,params,No, successCallBack, failCallBack, progressCallBack) {

            var svrURI = encodeURI(appConfig.server.getUrl() + "app/bbs/uploadPhoto.do");

            var opts = new FileUploadOptions();

            opts.fileKey = "bbsPhoto";
            //opts.fileName = imgURI.substr(imgURI.lastIndexOf('/') + 1);
            opts.fileName = params.orderNo + '_' + No;
            opts.mimeType = "image/jpeg";
            opts.params = params;   
            var ft = new FileTransfer();

            ft.upload(imgURI, svrURI, successCallBack, failCallBack, opts);
            ft.onprogress = progressCallBack;


        }

    }])