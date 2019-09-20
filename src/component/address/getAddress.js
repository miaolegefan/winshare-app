import React from 'react';
import axios from 'axios';
import { NavBar, Icon, WingBlank, Button} from 'antd-mobile';
import Address from './address'

function getAddress(_this) {
    return (<address/>)
    //Address.state.address;
    //_this.props.history.push('/address')
}
export default class GetAddress extends React.Component{


    constructor(props){
        super(props);
        this.state={
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wwb67a7fe3bcd6865f', // 必填，企业微信的corpID
            agentid: 'VT0qg6Jdjqp-8EKCMXOlmTjSzqcGHtcpQ_PedCYHyW0', // 必填，企业微信的应用id
            timestamp: '', // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: [
                'getLocation'
            ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        }
    }

    render() {
        const _this = this;
        return(<div><Address/></div>);
    }
}