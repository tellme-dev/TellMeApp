
/*
app 配置信息
包括: 
后台服务器地址
*/
angular.module('tellme')
    .constant('app-config',
    {
        /*
        后台服务配置
        */
        server: {
            address: 'http://www.udianqu.com',
            //address: 'http://192.168.1.100',
            name: 'udqweb',
            port: '8080',
            getUrl: function () {
                return this.address + ':' + this.port + '/' + this.name + '/';

            }
        },

    });

/*




*/