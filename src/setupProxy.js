const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(proxy('/weixin', { 
    target: 'https://qyapi.weixin.qq.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/weixin": "/"
    },
   }));
   app.use(proxy('/api', { 
    // target: 'http://10.100.5.148:8080/',
    target: 'http://localhost:8080/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/api": "/api"
    },
   }));
    app.use(proxy('/images', {
        // target: 'http://10.100.5.148:8080/',
        target: 'http://localhost:8080/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/images": "/images"
        },
    }));

    app.use(proxy('/gaode', {
        target: 'https://restapi.amap.com/v3/geocode/regeo',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/gaode": "/"
        },
    }));


  //app.use(proxy('/apc', { target: 'http://172.19.5.34:9531' }));

};