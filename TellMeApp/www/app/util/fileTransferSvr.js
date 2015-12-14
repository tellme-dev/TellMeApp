/*提供照相服务*/
angular.module('tellme')
    .service('fileTransferSvr', ['$http', '$q', 'appConfig', function ($http, $q, appConfig) {
        /*
        上传照片
        imgURI,文件路径 来自于getPicture返回的imgURI
        url：服务器接口地址
        */
        this.uploadPhoto = function (imgURI,fileKey,url,fileName, successCallBack, failCallBack, progressCallBack) {

            var svrURI = encodeURI(url);

            var opts = new FileUploadOptions();

            opts.fileKey = fileKey;//后台接收的名称
            //opts.fileName = imgURI.substr(imgURI.lastIndexOf('/') + 1);
            opts.fileName = fileName;
            opts.mimeType = "image/jpeg";   
            var ft = new FileTransfer();

            ft.upload(imgURI, svrURI, successCallBack, failCallBack, opts);
            ft.onprogress = progressCallBack;


        }

    }])