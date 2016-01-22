
/*
app 配置信息
包括: 
后台服务器地址
*/
angular.module('tellme')
    .constant('appConfig',
    {
        /*
        后台服务配置
        */
        server: {
            address: 'http://112.74.209.133',
            //address: 'http://192.168.1.112',
            name: 'tellme',
            //name: 'TellMeMgr',
            port: '8080',
            getUrl: function () {
                return this.address + ':' + this.port + '/' + this.name + '/';
            }
        },

    });

/*




*/