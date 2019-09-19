import React from 'react';
import { Flex, ImagePicker,WingBlank,Button,Toast,NavBar,Icon,InputItem} from 'antd-mobile';
import '../common.css';
import { Player } from 'video-react';
import "./video-react.css";
import axios from "axios";
import Upload from 'antd-mobile-upload';
import moment from 'moment'
import {createHashHistory} from 'history'  //返回上一页这段代码
const history = createHashHistory();//返回上一页这段代码


function save(_this) {

    /*保存之前先调用获取当前地址*/

    const d = _this.state.time;
    const newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    const image = _this.state.image;
    //将图片拼接成字符串，并用逗号隔开
    var attPic = "";
    image.map((item, index)=>(attPic+=item.data+","))
    if (attPic.length > 0) {
        attPic = attPic.substr(0, attPic.length - 1);
    }

    axios.post('/api/public/moblie-printeryProcess/add?userId='+sessionStorage.userId,{
        'orderNo':_this.state.orderNo,
        'time':newDate,
        'attPic': attPic,
        'attVideo':_this.state.video,
        'remark':_this.state.remark,
        'produceStatus':_this.state.produceStatus,
    }).then(function(response){
        if(response.data.success){
            history.goBack();
        }else{
            Toast.info(response.data.message);
        }
    })



}


function upload(before,image,type,index,_this) {

    if(type == 'add'){
        const len = image.length;
        let formData = new FormData();
        const file = image[len - 1].file;
        const url = image[len - 1].url;//文件对应的前端生成的url 用来前端展示 因为后台返回的只有文件名称
        formData.append("file", file);
        axios({
            method: 'post',
            url: '/api/public/mobile-upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
                res => {
                    console.log('上传成功！')
                    let newImage = {
                        url:url,
                        data:res.data
                    }
                    _this.setState({
                        image :before.concat(newImage)
                    })
                }
            ).catch(
                err => {
                    Toast.info('该图片上传失败!!!', 1);
                }
            )
    }else if(type == 'remove'){
        _this.setState({
            image:image
        })
        console.log(image)

    }

}


export default class PrinteryProcessEnclosureAdd extends React.Component{
    state = {
        image: [],
        time: new Date(),
        video:'',
        remark:'',
        produceStatus:this.props.location.state.item.produceStatus,//生产状态
        orderNo:this.props.location.state.item.orderNo,//印单号
        //获取地址所用的值
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
    onChange = (image, type, index) => {
        console.log(image, type, index);
        const before = this.state.image;
        upload(before,image,type,index,this);
    };

    //视频文件保存成功后
    videoSave=(value)=>{
        this.setState({
            video: value
            }
        )
    }
    //返回按钮
    comeback=()=>{
        history.goBack();  //返回上一页这段代码
    }

    //备注输入change事件
    remarkOnchang=(value)=>{
        this.setState({
                remark: value
            }
        )
    }

    render() {


        const { image,time } = this.state;
        const _this = this;
        return (
            <div className="backgroundWhite line3" style={{height:"-webkit-fill-available"}}>
                <div>
                <NavBar mode="light" icon={<Icon type="left" />}
                        onLeftClick={this.comeback}>
                </NavBar>
                <Flex className="margin-left">
                    <div className="colorBlack flex1">日期</div>
                    <div className="colorBlack flex3 text_left">{moment(time).format('YYYY-MM-DD')}</div>
                </Flex>
                <div className="margin-left">附件图片</div>
                <ImagePicker
                    files={image}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={image.length < 5}
                    multiple={true}
                    // onAddImageClick={upload}
                    // capture={"camera"}
                />
                <div className="margin-left">附件视频</div>

                <Upload multiple action={'/api/public/mobile-upload'}
                        limit={2} getSuccessFileUrl ={this.videoSave} />

                <div className="margin-left">备注说明</div>
                    <InputItem
                        type="digit"
                        id="receiveMenge"
                        clear
                        autoAdjustHeight={true}
                        style={{borderColor: '#404040'}}
                        default={this.state.remark}
                        onChange={this.remarkOnchang}
                    ></InputItem>
                </div>

                <div style={{position: 'absolute', bottom: 0,width:'100%' }}>
                    <WingBlank size="md">
                        <Button  type="ghost" onClick={()=>save(_this)}   style={{color: '#108ee9', 'backgroundColor': 'white', 'borderRadius': '5px', border: '1px solid #108ee9'}}  size="small">保存</Button>
                    </WingBlank>
                </div>



            </div>
        );
    }

}