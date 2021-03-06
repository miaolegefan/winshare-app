import React from 'react';
import axios from 'axios';
var cache = require('memory-cache'),
    sha1 = require('sha1'),
    config = require('./config/wechat.cfg');

// const QQMapWX = require('./libs/qqmap-wx-jssdk')

function post(_this) {


    const url = window.location.href.split('#')[0];
    var noncestr = config.noncestr,
        timestamp = Math.floor(Date.now()/1000), //精确到秒
        jsapi_ticket,appId;

    if(cache.get('ticket')){
        jsapi_ticket = cache.get('ticket');
        appId = cache.get('appId');
        console.log('1' + 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
        _this.setState({
            timestamp : timestamp,
            nonceStr:noncestr,
            appId:appId,
            signature:sha1('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
        });
        setTimeout(() => {
            window.wx.config(_this.state);

            // eslint-disable-next-line no-undef
            wx.ready(function(){
                // eslint-disable-next-line no-undef
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        // var speed = res.speed; // 速度，以米/每秒计
                        // var accuracy = res.accuracy; // 位置精度

                        getAddress(res.latitude,res.longitude,_this)
                    }
                });
            });
            // eslint-disable-next-line no-undef
            wx.error(function(res){
                console.log(res);
            });
        },2)
    }else{
        axios.post('/api/public/moblie-printeryProcess/signature').then(function(response){
            if(response.data.success){
                cache.put('ticket',response.data.rows[0].ticket,config.cache_duration);  //加入缓存
                cache.put('appId',response.data.rows[0].corpid,config.cache_duration);  //加入缓存
                console.log('jsapi_ticket=' + response.data.rows[0].ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
                _this.setState({
                    timestamp : timestamp,
                    nonceStr:noncestr,
                    appId:response.data.rows[0].corpid,
                    signature:sha1('jsapi_ticket=' + response.data.rows[0].ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
                });
                setTimeout(() => {
                    window.wx.config(_this.state);
                    // eslint-disable-next-line no-undef
                    wx.ready(function () {
                        // eslint-disable-next-line no-undef
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                // var speed = res.speed; // 速度，以米/每秒计
                                // var accuracy = res.accuracy; // 位置精度

                                getAddress(res.latitude, res.longitude, _this)
                            }
                        });
                    });
                    // eslint-disable-next-line no-undef
                    wx.error(function (res) {
                        console.log(res);
                    });
                },2)

            }
        })
    }

}



function getAddress(latitude,longitude,_this) {
    // axios.get('/gaode?key=11e37c585c344bc452157caba51bcb80&location='+longitude+','+latitude).then(function(response){
    //     if(response.status == '200'){
    //         console.log(response);
    //         _this.setState({
    //         address:response.data.regeocode.formatted_address,
    //     });
    //
    //     }
    // })
    axios.get('/api/public/geocode/address?longitude='+longitude+'&latitude='+latitude).then(function(response){
        if(response.status == '200'){
            console.log(response);
            _this.setState({
                address:response.data.message,
            });
            //如果有父级，则将地址返回给父级
            if(_this.props.getAddress){
                _this.props.getAddress(response.data.message)
            }else{
                console.log(_this.props.getAddress);
            }
        }
    })

}




export default class Address extends React.Component{


constructor(props){
    super(props);
    this.state={
        address:'',
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '',//'wwb52cb3a8e26eb2ca',//'wwb67a7fe3bcd6865f', // 必填，企业微信的corpID
            timestamp: '', // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: [
                'getLocation'
            ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    }
}
    componentWillMount() {
        post(this);
    }
    componentDidMount() {
       return this.state.address;
    }
    render() {
        const _this = this;
        return(<div > {_this.state.address}</div>);
    }
}
