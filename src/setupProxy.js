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
    target: 'http://localhost:8089/',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/api": "/api"
    },
   }));
  //app.use(proxy('/apc', { target: 'http://172.19.5.34:9531' }));

};