import React from 'react';
import axios from 'axios';


window.wx.config({
    beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '${appId}', // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: parseInt("${timestamp}",10), // 必填，生成签名的时间戳
    nonceStr: '${noncestr}', // 必填，生成签名的随机串
    signature: '${signature}',// 必填，签名，见附录1
    jsApiList: ['getLocation','openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});


export default class Address extends React.Component{







}